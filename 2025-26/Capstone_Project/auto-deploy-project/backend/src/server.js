require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@postgres:5432/postgres'
});

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/items', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, name FROM items LIMIT 100');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});
app.post('/items', async (req, res) => {
  const { name } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO items (name) VALUES ($1) RETURNING id, name', [name]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
});

const port = process.env.PORT || 4000;
// Prometheus metrics
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500, 1000]
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// wrap requests to measure duration
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.path, code: res.statusCode });
  });
  next();
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Backend listening on ${port}`));
}

module.exports = app;
