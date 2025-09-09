import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get('/api/items').then(r => setItems(r.data)).catch(()=>{});
  }, []);

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Auto Deploy App</h1>
      <p>This demo app showcases automated deployment and integrated testing pipelines.</p>
      <ul>
        {items.map(i => <li key={i.id}>{i.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
