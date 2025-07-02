import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:5000"); // adjust URL as needed
// const socket = io("http://localhost:5000", { path: "/custom-socket" });

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"], // Ensure proper transport
});

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to Socket.io Server:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });
    // Listen for admin messages
    socket.on("admin_message", (data) => {
      console.log("📩 Message received:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => socket.off("admin_message");
  }, []);

  const sendMessage = () => {
    const messageData = {
      senderId: "currentAdminId", // you can get this from your auth context
      message: input,
      timestamp: new Date(),
    };
    socket.emit("admin_message", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setInput("");
  };

  return (
    <div className="admin-chat bg-white mt-4 shadow pl-4">
      <h2 className="text-bold">Admin Chat</h2>
      <div className="chat-window ">
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-message">
            <strong>{msg.senderId}: </strong>
            <span className="bg-green-900 text-white rounded p-1">
              {msg.message}{" "}
            </span>
            <span className="timestamp bg-red-800 ml-3 text-white rounded p-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <div className="chat-input my-4 py-4 divide-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="b-3 bg-green-500 px-2 text-white ml-2 hover:bg-green-900 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AdminChat;
