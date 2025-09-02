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
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">MindCare Chat Assistant</h1>
          <p className="text-blue-100 mt-1">Confidential AI-guided first aid support 💬</p>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-full">
                  <FiCpu />
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl max-w-md shadow-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full">
                  <FiUser />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-white py-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
