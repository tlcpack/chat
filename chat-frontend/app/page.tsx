"use client";

import { useEffect, useState } from "react";

type Message = {
  clientId: number;
  message: string;
};

export default function Home() {
  const [clientId] = useState(Math.floor(new Date().getTime() / 1000));
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isOnline, setIsOnline] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [websckt, setWebsckt] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const url = "ws://127.0.0.1:8000/ws/" + clientId;
    const ws: WebSocket = new WebSocket(url);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setIsOnline(true);
    };

    ws.onmessage = (e) => {
      const newMessage: Message = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    ws.onclose = () => {
      setIsOnline(false);
    };

    setWebsckt(ws);

    return () => {
      ws.close();
    };
  }, [clientId]);

  const sendMessage = () => {
    if (websckt && message) {
      websckt.send(JSON.stringify({ clientId, message }));
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <h2>Your client id: {clientId}</h2>
      <div>
        <div>
          {messages.map((value, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <div>
                <p>client id: {value.clientId}</p>
                <p>{value.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Chat message ..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
