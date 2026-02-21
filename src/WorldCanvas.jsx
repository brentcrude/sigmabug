// !ChatGPT - WorldCanvas.jsx
// Renders 2D world and handles movement

import React, { useEffect, useRef } from "react";

export default function WorldCanvas({ socket }) {
  const canvasRef = useRef();
  const players = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "player_update") {
        players.current[data.user_id] = {
          x: data.x,
          y: data.y
        };
      }
    };

    function draw() {
      ctx.clearRect(0, 0, 800, 600);

      for (let id in players.current) {
        const p = players.current[id];
        ctx.fillStyle = "cyan";
        ctx.fillRect(p.x, p.y, 30, 30);
      }

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  useEffect(() => {
    function handleKey(e) {
      let dx = 0, dy = 0;
      if (e.key === "ArrowLeft") dx = -5;
      if (e.key === "ArrowRight") dx = 5;
      if (e.key === "ArrowUp") dy = -5;
      if (e.key === "ArrowDown") dy = 5;

      socket.send(JSON.stringify({
        action: "move",
        dx, dy
      }));
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
}