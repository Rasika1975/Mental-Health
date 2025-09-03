import React, { useState, useEffect } from "react";
import { FiHeart, FiShield, FiZap, FiTarget, FiBell, FiSettings, FiMessageCircle, FiArrowRight } from "react-icons/fi";
import Chatbot from "../components/Chatbot";

const ChatbotPage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [notifications, setNotifications] = useState([{ id: 1, read: false, message: "Welcome to your dashboard!" }]);

  return (
    <>
      {/* Sticky Header with subtle shadow and animated notification badge */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center animate-pulse">
            <FiHeart className="text-white text-2xl" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Welcome back, Student!</h1>
            <p className="text-sm text-gray-600">Here's your mental health overview</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            aria-label="Notifications"
            className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          >
            <FiBell className="text-xl" />
            {notifications.some((n) => !n.read) && (
              <span className="absolute top-0 right-0 inline-flex h-5 w-5 rounded-full bg-red-600 text-white text-xs items-center justify-center animate-ping">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </button>
          <button aria-label="Settings" className="p-2 text-gray-600 hover:text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FiSettings className="text-xl" />
          </button>
          <button
            onClick={() => alert("Login flow")}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </header>

      {/* Features Section with hover scaling */}
      <section className="py-20 bg-white max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Why Choose Our AI Assistant?</h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">Advanced AI technology meets compassionate mental health care.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[{
            icon: FiHeart, title: "24/7 Support", color: "text-red-500",
            description: "Always available when you need someone to talk to"
          }, {
            icon: FiShield, title: "100% Confidential", color: "text-green-500",
            description: "Your conversations are private and secure"
          }, {
            icon: FiZap, title: "Instant Response", color: "text-yellow-500",
            description: "Get immediate support and coping strategies"
          }, {
            icon: FiTarget, title: "Evidence-Based", color: "text-blue-500",
            description: "Techniques backed by mental health research"
          }].map(({ icon: Icon, title, description, color }, idx) => (
            <article
              key={title}
              className="p-8 rounded-3xl bg-gray-50 cursor-pointer hover:scale-105 transition-transform duration-300 shadow hover:shadow-lg"
              role="region"
              aria-labelledby={`feature-title-${idx}`}
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-white mb-6 ${color}`}>
                <Icon className="w-10 h-10" aria-hidden="true" />
              </div>
              <h3 id={`feature-title-${idx}`} className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Mental Wellness Journey?</h2>
        <p className="max-w-xl mx-auto mb-8 text-lg leading-relaxed text-blue-200">
          Join thousands of students who have found support, healing, and community through our AI assistant.
        </p>
        <button
          type="button"
          className="inline-flex items-center bg-white text-blue-600 px-12 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          onClick={() => setShowIntro(false)}
          aria-label="Start Chatting Now"
        >
          <FiMessageCircle className="mr-4 text-3xl" aria-hidden="true" />
          Start Chatting Now
          <FiArrowRight className="ml-4" aria-hidden="true" />
        </button>
      </div>
    </>
  );
};

export default ChatbotPage;
