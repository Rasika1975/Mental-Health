import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiBot, FiUser, FiRefreshCw } from 'react-icons/fi';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI mental health support assistant. I'm here to listen and provide coping strategies. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedResponses = [
    "I'm feeling anxious about exams",
    "I'm having trouble sleeping",
    "I feel overwhelmed with coursework",
    "I'm feeling lonely",
    "I need help managing stress"
  ];

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return {
        text: "I understand you're feeling anxious. Here are some immediate techniques that can help:\n\n✓ Try the 4-7-8 breathing technique: Inhale for 4, hold for 7, exhale for 8\n✓ Ground yourself using the 5-4-3-2-1 method: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n✓ Remember: anxiety is temporary and you have the strength to get through this\n\nWould you like me to guide you through a breathing exercise, or would you prefer to talk about what's making you anxious?",
        severity: 'moderate'
      };
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
      return {
        text: "Sleep issues can really affect your mental health. Here are some strategies:\n\n✓ Create a consistent bedtime routine\n✓ Avoid screens 1 hour before bed\n✓ Try progressive muscle relaxation\n✓ Keep your room cool and dark\n\nIf sleep problems persist for more than 2 weeks, I'd recommend speaking with a counselor. Would you like me to help you book an appointment?",
        severity: 'mild'
      };
    }
    
    if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('stress')) {
      return {
        text: "Feeling overwhelmed is completely normal, especially during college. Let's break this down:\n\n✓ List your tasks and prioritize them\n✓ Take breaks every 45-60 minutes\n✓ Practice saying 'no' to additional commitments\n✓ Remember: you don't have to be perfect\n\nWhat's the biggest source of stress for you right now? Sometimes talking through it helps.",
        severity: 'moderate'
      };
    }
    
    if (lowerMessage.includes('lonely') || lowerMessage.includes('isolated')) {
      return {
        text: "Loneliness is tough, but you're not alone in feeling this way. Many students experience this:\n\n✓ Consider joining our peer support forum\n✓ Look into campus clubs or activities\n✓ Try reaching out to one person today, even briefly\n✓ Remember: quality connections matter more than quantity\n\nWould you like me to help you find ways to connect with others on campus?",
        severity: 'moderate'
      };
    }

    if (lowerMessage.includes('suicidal') || lowerMessage.includes('hurt myself') || lowerMessage.includes('end it all')) {
      return {
        text: "I'm very concerned about you right now. These feelings are serious, but help is available:\n\n🚨 IMMEDIATE RESOURCES:\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• Campus Emergency: Contact campus security immediately\n\nPlease reach out to someone right now. You matter, and there are people who want to help you through this difficult time.",
        severity: 'crisis'
      };
    }
    
    return {
      text: "Thank you for sharing that with me. It takes courage to reach out. I'm here to support you through whatever you're experiencing.\n\nCan you tell me more about what's been on your mind lately? The more you share, the better I can help you find coping strategies and resources.",
      severity: 'mild'
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        severity: botResponse.severity
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedResponse = (suggestion) => {
    setInputMessage(suggestion);
  };

  const resetChat = () => {
    setMessages([{
      id: 1,
      text: "Hello! I'm your AI mental health support assistant. I'm here to listen and provide coping strategies. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-200px)]">
      <div className="bg-white rounded-xl shadow-xl h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <FiBot className="text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Mental Health Support</h2>
              <p className="text-blue-100 text-sm">Confidential • Available 24/7</p>
            </div>
          </div>
          
          <button
            onClick={resetChat}
            className="p-2 bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 transition-colors"
            title="Reset Chat"
          >
            <FiRefreshCw className="text-lg" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {message.sender === 'user' ? <FiUser /> : <FiBot />}
              </div>
              
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.severity === 'crisis'
                  ? 'bg-red-50 border border-red-200 text-gray-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <FiBot className="text-gray-600" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Responses */}
        {messages.length === 1 && (
          <div className="px-4 py-2 border-t bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">Quick start suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedResponses.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedResponse(suggestion)}
                  className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full hover:bg-blue-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t bg-gray-50 rounded-b-xl">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isTyping}
            />
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiSend />
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            This is an AI assistant. For emergencies, please contact emergency services immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;