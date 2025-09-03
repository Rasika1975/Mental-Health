import React, { useState, useRef, useEffect } from 'react';
import { 
  FiSend,  
  FiMessageCircle, FiThumbsUp, FiThumbsDown, FiCopy, FiDownload,
  FiSettings, FiVolume2, FiVolumeX, FiMoreHorizontal, FiStar,
  FiAlertTriangle, FiCheckCircle, FiInfo, FiZap
} from 'react-icons/fi';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI mental health support assistant. I'm here to listen and provide evidence-based coping strategies. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
      severity: 'mild'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [messageRatings, setMessageRatings] = useState({});
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
    "I need help managing stress",
    "I'm having panic attacks",
    "I feel depressed",
    "I need relationship advice",
    "I'm struggling with self-esteem",
    "I want to learn mindfulness"
  ];

  const quickActions = [
    { icon: FiHeart, label: "Breathing Exercise", action: "breathing" },
    { icon: FiZap, label: "Quick Mood Check", action: "mood" },
    { icon: FiShield, label: "Crisis Resources", action: "crisis" },
    { icon: FiMessageCircle, label: "Book Counselor", action: "counselor" }
  ];

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Handle quick actions
    if (lowerMessage.includes('breathing') || lowerMessage.includes('breath')) {
      return {
        text: "Let's do a calming breathing exercise together:\n\n🌬️ *4-7-8 Breathing Technique*\n\n1. Breathe in through your nose for 4 counts\n2. Hold your breath for 7 counts\n3. Exhale through your mouth for 8 counts\n4. Repeat 3-4 times\n\nThis activates your parasympathetic nervous system and helps reduce anxiety. How are you feeling after trying this?",
        severity: 'mild',
        type: 'exercise'
      };
    }

    if (lowerMessage.includes('mood') || lowerMessage.includes('check')) {
      return {
        text: "Let's do a quick mood check-in:\n\n📊 *Rate your current mood (1-10):*\n• 1-3: Really struggling\n• 4-6: Having a tough time\n• 7-8: Doing okay\n• 9-10: Feeling great\n\nWhat's contributing to your mood today? Sometimes identifying the factors helps us work through them together.",
        severity: 'mild',
        type: 'assessment'
      };
    }

    if (lowerMessage.includes('crisis') || lowerMessage.includes('emergency')) {
      return {
        text: "🚨 *CRISIS RESOURCES* 🚨\n\n*Immediate Help:\n• National Suicide Prevention Lifeline: **988\n• Crisis Text Line: Text **HOME* to 741741\n• Campus Emergency: Contact campus security\n\n*You are not alone.* These feelings are temporary, and help is available 24/7. Please reach out to someone right now.",
        severity: 'crisis',
        type: 'crisis'
      };
    }
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('panic')) {
      return {
        text: "I understand you're feeling anxious. Here are some immediate techniques that can help:\n\n🧘 *Immediate Relief:\n✓ 4-7-8 breathing: Inhale 4, hold 7, exhale 8\n✓ 5-4-3-2-1 grounding: 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n✓ Progressive muscle relaxation\n\n💡 **Remember:* Anxiety is temporary and you have the strength to get through this. Your body is trying to protect you.\n\nWould you like me to guide you through a breathing exercise, or would you prefer to talk about what's making you anxious?",
        severity: 'moderate',
        type: 'support'
      };
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
      return {
        text: "Sleep issues can really affect your mental health. Here are some evidence-based strategies:\n\n🌙 *Sleep Hygiene Tips:\n✓ Create a consistent bedtime routine (same time every night)\n✓ Avoid screens 1 hour before bed (blue light disrupts melatonin)\n✓ Keep your room cool (65-68°F) and dark\n✓ Try progressive muscle relaxation or meditation\n✓ Avoid caffeine after 2 PM\n\n📊 **Sleep Tracking:* Consider keeping a sleep diary to identify patterns.\n\nIf sleep problems persist for more than 2 weeks, I'd recommend speaking with a counselor. Would you like me to help you book an appointment?",
        severity: 'mild',
        type: 'advice'
      };
    }
    
    if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('stress')) {
      return {
        text: "Feeling overwhelmed is completely normal, especially during college. Let's break this down:\n\n📋 *Stress Management Strategies:\n✓ List your tasks and prioritize them (use the Eisenhower Matrix)\n✓ Take breaks every 45-60 minutes (Pomodoro Technique)\n✓ Practice saying 'no' to additional commitments\n✓ Remember: you don't have to be perfect\n✓ Try the 2-minute rule: if it takes less than 2 minutes, do it now\n\n💭 **Mindset Shift:* Progress over perfection. What's the biggest source of stress for you right now? Sometimes talking through it helps.",
        severity: 'moderate',
        type: 'support'
      };
    }
    
    if (lowerMessage.includes('lonely') || lowerMessage.includes('isolated')) {
      return {
        text: "Loneliness is tough, but you're not alone in feeling this way. Many students experience this:\n\n🤝 *Connection Strategies:\n✓ Consider joining our peer support forum\n✓ Look into campus clubs or activities that interest you\n✓ Try reaching out to one person today, even briefly\n✓ Remember: quality connections matter more than quantity\n✓ Join study groups or academic clubs\n\n💡 **Remember:* It's okay to feel lonely sometimes. The goal is to build meaningful connections gradually. Would you like me to help you find ways to connect with others on campus?",
        severity: 'moderate',
        type: 'support'
      };
    }

    if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('sad')) {
      return {
        text: "I hear that you're feeling depressed, and I want you to know that your feelings are valid. Depression is a real condition that affects many people.\n\n💙 *Immediate Support:\n✓ Practice self-compassion - be kind to yourself\n✓ Try to maintain a routine, even a simple one\n✓ Get some sunlight or natural light\n✓ Consider gentle movement or a short walk\n✓ Reach out to someone you trust\n\n🔍 **Professional Help:* If these feelings persist or worsen, please consider speaking with a counselor. Depression is treatable, and you don't have to face it alone.\n\nWould you like me to help you find resources or book a counseling session?",
        severity: 'moderate',
        type: 'support'
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

  const handleQuickAction = (action) => {
    let message = '';
    switch (action) {
      case 'breathing':
        message = 'I want to try a breathing exercise';
        break;
      case 'mood':
        message = 'I want to do a mood check';
        break;
      case 'crisis':
        message = 'I need crisis resources';
        break;
      case 'counselor':
        message = 'I want to book a counselor';
        break;
      default:
        return;
    }
    setInputMessage(message);
  };

  const handleMessageRating = (messageId, rating) => {
    setMessageRatings(prev => ({
      ...prev,
      [messageId]: rating
    }));
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadChat = () => {
    const chatText = messages.map(msg => 
      `${msg.sender === 'user' ? 'You' : 'AI'}: ${msg.text}\n${msg.timestamp.toLocaleString()}\n`
    ).join('\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetChat = () => {
    setMessages([{
      id: 1,
      text: "Hello! I'm your AI mental health support assistant. I'm here to listen and provide evidence-based coping strategies. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
      severity: 'mild'
    }]);
    setMessageRatings({});
  };

  return (
    <div className="w-full h-[calc(100vh-200px)]">
      <div className="bg-white rounded-xl shadow-2xl h-full flex flex-col border border-gray-200">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <FiBot className="text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Mental Health Support</h2>
                <div className="flex items-center space-x-4 text-blue-100 text-sm">
                  <div className="flex items-center space-x-1">
                    <FiShield className="text-green-300" />
                    <span>100% Confidential</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiClock className="text-yellow-300" />
                    <span>Available 24/7</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiHeart className="text-red-300" />
                    <span>Evidence-Based</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <FiVolumeX className="text-lg" /> : <FiVolume2 className="text-lg" />}
              </button>
              <button
                onClick={downloadChat}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Download Chat"
              >
                <FiDownload className="text-lg" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Settings"
              >
                <FiSettings className="text-lg" />
              </button>
              <button
                onClick={resetChat}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Reset Chat"
              >
                <FiRefreshCw className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <Icon className="text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-4 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                  : message.severity === 'crisis'
                  ? 'bg-gradient-to-br from-red-500 to-red-600 text-white'
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600'
              }`}>
                {message.sender === 'user' ? <FiUser className="text-lg" /> : <FiBot className="text-lg" />}
              </div>
              
              <div className={`max-w-lg px-5 py-4 rounded-2xl shadow-sm ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                  : message.severity === 'crisis'
                  ? 'bg-red-50 border-2 border-red-200 text-gray-800'
                  : message.severity === 'moderate'
                  ? 'bg-yellow-50 border border-yellow-200 text-gray-800'
                  : 'bg-gray-50 border border-gray-200 text-gray-800'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                    <div className="flex items-center justify-between mt-3">
                      <p className={`text-xs ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      
                      {message.sender === 'bot' && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => copyMessage(message.text)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Copy message"
                          >
                            <FiCopy className="text-sm" />
                          </button>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleMessageRating(message.id, 'up')}
                              className={`p-1 transition-colors ${
                                messageRatings[message.id] === 'up' 
                                  ? 'text-green-600' 
                                  : 'text-gray-400 hover:text-green-600'
                              }`}
                              title="Helpful"
                            >
                              <FiThumbsUp className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleMessageRating(message.id, 'down')}
                              className={`p-1 transition-colors ${
                                messageRatings[message.id] === 'down' 
                                  ? 'text-red-600' 
                                  : 'text-gray-400 hover:text-red-600'
                              }`}
                              title="Not helpful"
                            >
                              <FiThumbsDown className="text-sm" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                <FiBot className="text-gray-600 text-lg" />
              </div>
              <div className="bg-gray-50 border border-gray-200 px-5 py-4 rounded-2xl">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">AI is thinking...</p>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Suggested Responses */}
        {messages.length === 1 && (
          <div className="px-6 py-4 border-t bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center space-x-2 mb-3">
              <FiZap className="text-blue-600" />
              <p className="text-sm font-medium text-gray-700">Quick start suggestions:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedResponses.slice(0, 6).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedResponse(suggestion)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Input */}
        <div className="p-6 border-t bg-white rounded-b-xl">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Share what's on your mind... I'm here to listen and help."
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-500"
                disabled={isTyping}
              />
              {inputMessage && (
                <button
                  onClick={() => setInputMessage('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiMoreHorizontal className="rotate-45" />
                </button>
              )}
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            >
              <FiSend className="text-lg" />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <FiShield className="text-green-500" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiHeart className="text-red-500" />
                <span>Evidence-Based</span>
              </div>
            </div>
            <p className="text-center">
              This is an AI assistant. For emergencies, please contact emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;