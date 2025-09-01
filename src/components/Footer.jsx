import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiPhone, FiMail, FiMapPin, FiShield, FiBook, FiUsers } from 'react-icons/fi';

const Footer = () => {
  const quickLinks = [
    { path: '/chatbot', label: 'AI Support' },
    { path: '/screening', label: 'Self-Assessment' },
    { path: '/resources', label: 'Resources' },
    { path: '/forum', label: 'Peer Support' },
    { path: '/booking', label: 'Book Counselor' }
  ];

  const emergencyContacts = [
    { label: 'Crisis Lifeline', number: '988' },
    { label: 'Emergency Services', number: '911' },
    { label: 'Campus Security', number: '(555) 123-4567' },
    { label: 'Student Health', number: '(555) 123-4568' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FiHeart className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold">MindCare</span>
            </div>
            
            <p className="text-gray-300 mb-6">
              Supporting college students' mental health through technology, 
              community, and professional care.
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <FiShield className="text-lg" />
              <span>HIPAA Compliant & Secure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FiBook className="mr-2" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FiPhone className="mr-2" />
              Emergency Contacts
            </h3>
            <ul className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <li key={index}>
                  <a
                    href={`tel:${contact.number}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200 block"
                  >
                    <div className="text-sm font-medium">{contact.label}</div>
                    <div className="text-blue-400">{contact.number}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FiUsers className="mr-2" />
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <FiMail className="text-lg" />
                <span>support@mindcare.edu</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <FiPhone className="text-lg" />
                <span>(555) 123-CARE</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300">
                <FiMapPin className="text-lg" />
                <span>Student Wellness Center<br />Campus Building A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 lg:mb-0">
              © 2025 MindCare Digital Mental Health Platform. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;