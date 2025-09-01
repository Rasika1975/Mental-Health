import React from 'react';
import { Link } from 'react-router-dom';
import { FiMessageCircle, FiActivity, FiBook, FiUsers, FiCalendar, FiShield, FiHeart, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: FiMessageCircle,
      title: 'AI-Guided Support',
      description: 'Get instant coping strategies and guidance from our intelligent chatbot available 24/7',
      link: '/chatbot',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiActivity,
      title: 'Self-Assessment',
      description: 'Take confidential mental health screenings to understand your wellbeing',
      link: '/screening',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiBook,
      title: 'Resource Hub',
      description: 'Access videos, guides, and exercises in your preferred language',
      link: '/resources',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiUsers,
      title: 'Peer Support',
      description: 'Connect anonymously with fellow students in moderated forums',
      link: '/forum',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: FiCalendar,
      title: 'Book Counselor',
      description: 'Schedule private appointments with certified campus counselors',
      link: '/booking',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: FiShield,
      title: 'Complete Privacy',
      description: 'Your data is encrypted and confidential. Anonymous support available',
      link: '#',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Students Supported' },
    { number: '24/7', label: 'AI Support Available' },
    { number: '50+', label: 'Counselors Connected' },
    { number: '99%', label: 'Privacy Protected' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FiHeart className="text-white text-2xl" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Mental Health
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Matters
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive digital platform providing AI-guided support, peer connections, 
            and professional counseling services tailored for college students.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/chatbot"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
            >
              Get Instant Support
              <FiArrowRight className="ml-2" />
            </Link>
            
            <Link
              to="/screening"
              className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
            >
              Take Self-Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive support system designed specifically for college students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-purple-600 transition-colors">
                    Learn More
                    <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              If you're experiencing a mental health emergency, please reach out immediately
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:911"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Emergency: 911
              </a>
              
              <a
                href="tel:988"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Crisis Helpline: 988
              </a>
              
              <Link
                to="/chatbot"
                className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
              >
                <FiMessageCircle className="mr-2" />
                Chat Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Take the First Step Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Your mental health journey starts with a single step. We're here to support you.
          </p>
          
          <Link
            to="/screening"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-md hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
          >
            Start Your Assessment
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;