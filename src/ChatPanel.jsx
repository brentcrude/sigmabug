import { useState } from "react";

export default function ChatPanel({ socket }) {
  const [message, setMessage] = useState("");

  function send() {
    socket.send(JSON.stringify({
      action: "chat",
      channel: "general",
      message
    }));
    setMessage("");
  }

  return (
    <div className="chat">
      <input value={message}
             onChange={e => setMessage(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}