import React, { useState } from "react";
import { FiSend, FiUser, FiCpu } from "react-icons/fi";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I'm MindCare Assistant. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");

  // Handle sending message
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);

    // Mock bot reply (replace this with AI API later)
    setTimeout(() => {
      let reply = "I see. Can you tell me more?";
      if (input.toLowerCase().includes("stress")) {
        reply = "I'm sorry to hear that 💙. Try some deep breathing exercises. Would you like me to guide you?";
      } else if (input.toLowerCase().includes("sad")) {
        reply = "It’s okay to feel sad sometimes. Talking to a counselor might help. Do you want me to book a session?";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 800);

    setInput("");
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg">
        <h1 className="text-xl font-bold">MindCare Chat Assistant</h1>
        <p className="text-sm opacity-90">Confidential AI-guided first aid support 💬</p>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <div className="w-8 h-8 bg-purple-500 text-white flex items-center justify-center rounded-full">
                <FiCpu />
              </div>
            )}
            <div
              className={`px-4 py-2 rounded-2xl max-w-sm shadow ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && (
              <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
                <FiUser />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
