import React, { useState, useEffect } from "react";
import { 
  FiHeart, FiShield, FiClock, FiUsers, FiBook, FiActivity, 
  FiTrendingUp, FiAward, FiZap, FiTarget, FiCheckCircle,
  FiArrowRight, FiStar, FiMessageCircle, FiCalendar
} from "react-icons/fi";
import Chatbot from "../components/Chatbot";

const ChatbotPage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [sessionStats, setSessionStats] = useState({
    totalSessions: 0,
    averageMood: 0,
    lastSession: null
  });

  useEffect(() => {
    // Load session stats from localStorage
    const stats = localStorage.getItem('chatbot-stats');
    if (stats) {
      setSessionStats(JSON.parse(stats));
    }
  }, []);

  const features = [
    {
      icon: FiHeart,
      title: "24/7 Support",
      description: "Always available when you need someone to talk to",
      color: "text-red-500"
    },
    {
      icon: FiShield,
      title: "100% Confidential",
      description: "Your conversations are private and secure",
      color: "text-green-500"
    },
    {
      icon: FiZap,
      title: "Instant Response",
      description: "Get immediate support and coping strategies",
      color: "text-yellow-500"
    },
    {
      icon: FiTarget,
      title: "Evidence-Based",
      description: "Techniques backed by mental health research",
      color: "text-blue-500"
    }
  ];

  const quickActions = [
    {
      icon: FiActivity,
      title: "Mood Check",
      description: "Track your emotional state",
      action: () => setShowIntro(false)
    },
    {
      icon: FiHeart,
      title: "Breathing Exercise",
      description: "Calm your mind with guided breathing",
      action: () => setShowIntro(false)
    },
    {
      icon: FiBook,
      title: "Coping Strategies",
      description: "Learn new ways to manage stress",
      action: () => setShowIntro(false)
    },
    {
      icon: FiUsers,
      title: "Peer Support",
      description: "Connect with others who understand",
      action: () => setShowIntro(false)
    }
  ];

  const testimonials = [
    {
      text: "The AI helped me through a panic attack. The breathing exercises really work!",
      author: "Sarah M.",
      rating: 5
    },
    {
      text: "Having someone to talk to 24/7 has been a game changer for my anxiety.",
      author: "Alex K.",
      rating: 5
    },
    {
      text: "The mood tracking feature helps me understand my patterns better.",
      author: "Maria L.",
      rating: 4
    }
  ];

  if (!showIntro) {
    return <Chatbot />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl">
                <FiMessageCircle className="text-white text-3xl" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              AI Mental Health
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Support Assistant
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your confidential, 24/7 AI companion for mental wellness. Get instant support, 
              evidence-based coping strategies, and professional guidance whenever you need it.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => setShowIntro(false)}
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <FiMessageCircle className="mr-3 text-xl" />
                Start Chatting Now
                <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <FiBook className="mr-3 text-xl" />
                Learn More
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <FiShield className="text-green-500" />
                <span className="text-sm font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-blue-500" />
                <span className="text-sm font-medium">Available 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <FiAward className="text-purple-500" />
                <span className="text-sm font-medium">University Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <FiTrendingUp className="text-orange-500" />
                <span className="text-sm font-medium">Evidence-Based</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our AI Assistant?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI technology meets compassionate mental health care
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`text-2xl ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Started Instantly
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose what you need help with and start your wellness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{action.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Students Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from students who found support through our AI assistant
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">Student</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Mental Wellness Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of students who have found support, healing, and community through our AI assistant.
          </p>
          <button
            onClick={() => setShowIntro(false)}
            className="group inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            <FiMessageCircle className="mr-3 text-xl" />
            Start Chatting Now
            <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-blue-200">
            <div className="flex items-center gap-2">
              <FiShield className="text-green-300" />
              <span className="text-sm font-medium">100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-yellow-300" />
              <span className="text-sm font-medium">Available 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <FiHeart className="text-red-300" />
              <span className="text-sm font-medium">Student-Focused</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;