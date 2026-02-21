import React from 'react';
import WorldCanvas from './WorldCanvas';
import ChatPanel from './ChatPanel';
import RichObjectEditor from './RichObjectEditor';

export default function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* WorldCanvas fills remaining space */}
      <WorldCanvas />

      {/* Right-side panels */}
      <div style={{
        display: 'flex',
        width: '500px',        // total width of right-side stack
      }}>
        <ChatPanel />
        <RichObjectEditor />
      </div>
    </div>
  );
}