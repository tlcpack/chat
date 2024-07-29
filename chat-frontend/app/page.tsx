"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Message = {
  clientId: number;
  message: string;
};

export default function Home() {
  const router = useRouter();
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const goToProfile = () => {
    router.push(`/profile/${clientId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Chat</h1>
      <h2 className="text-lg mb-4">Your client id: {clientId}</h2>
      <Button variant="outline" onClick={goToProfile} className="mb-4">
        Go to Profile
      </Button>
      {messages.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          {messages.map((value, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-50 rounded-md">
              <p className="text-sm font-semibold">
                Client ID: {value.clientId}
              </p>
              <p className="text-md">{value.message}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Chat message ..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <Button variant="outline" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}
