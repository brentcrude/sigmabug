import React, { useState } from 'react';

export default function RichObjectEditor() {
  const [content, setContent] = useState('Edit objects here...');

  const handleSave = () => {
    alert('Saved: ' + content);
  };

  return (
    <div style={{ width: '300px', background: '#ccc', padding: '10px', display: 'flex', flexDirection: 'column' }}>
      <h3>Rich Editor</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ flex: 1, marginBottom: '5px' }}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}