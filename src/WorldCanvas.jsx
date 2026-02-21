import React, { useState, useEffect, useRef } from 'react';

export default function WorldCanvas() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  // move avatar with arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const maxX = container.clientWidth - 30; // 30 = avatar size
      const maxY = container.clientHeight - 30;

      setPos((prev) => {
        switch (e.key) {
          case 'ArrowUp':
            return { ...prev, y: Math.max(prev.y - 5, 0) };
          case 'ArrowDown':
            return { ...prev, y: Math.min(prev.y + 5, maxY) };
          case 'ArrowLeft':
            return { ...prev, x: Math.max(prev.x - 5, 0) };
          case 'ArrowRight':
            return { ...prev, x: Math.min(prev.x + 5, maxX) };
          default:
            return prev;
        }
      });
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        background: '#a73232',
        position: 'relative',
        minWidth: 200,
        minHeight: 300,
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          background: 'yellow',
          borderRadius: '50%',
          position: 'absolute',
          left: pos.x,
          top: pos.y,
        }}
      />
    </div>
  );
}