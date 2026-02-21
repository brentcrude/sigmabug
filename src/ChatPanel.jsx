import React, { useState } from 'react';

export default function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput('');
  };

  return (
    <div style={{ width: '250px', background: 'green', padding: '10px', display: 'flex', flexDirection: 'column' }}>
      <h3>Chat</h3>
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '5px' }}>
        {messages.map((m, i) => <div key={i}>{m}</div>)}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type..."
        style={{ width: '100%' }}
      />
      <button onClick={sendMessage} style={{ marginTop: '5px' }}>Send</button>
    </div>
  );
}