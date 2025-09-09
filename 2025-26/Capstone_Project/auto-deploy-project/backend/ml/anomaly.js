/**
 * Simple anomaly detection stub.
 * In a real implementation this could read metrics from Prometheus and apply ML models.
 * Here we provide a basic moving-average threshold detector for demo and future extension.
 */

const fs = require('fs');

function detectAnomalies(series, windowSize = 5, threshold = 3.0) {
  const anomalies = [];
  for (let i = windowSize; i < series.length; i++) {
    const window = series.slice(i - windowSize, i);
    const avg = window.reduce((a, b) => a + b, 0) / window.length;
    const deviation = Math.abs(series[i] - avg);
    if (deviation > threshold) anomalies.push({ index: i, value: series[i], avg, deviation });
  }
  return anomalies;
}

// Example usage with dummy data
if (require.main === module) {
  const sample = [1,1,2,1,2,30,2,1,1,40,2,1];
  const anomalies = detectAnomalies(sample, 3, 10);
  console.log('Detected anomalies:', anomalies);
}

module.exports = { detectAnomalies };
