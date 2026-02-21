import React from 'react';
import './App.css';
import WorldCanvas from './WorldCanvas';
import ChatPanel from './ChatPanel';
import RichObjectEditor from './RichObjectEditor';

function App() {
  return (
    <div className="app-container">
      <WorldCanvas />
      <ChatPanel />
      <RichObjectEditor />
    </div>
  );
}

export default App;