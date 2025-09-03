//do not tuch this file//
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiHeart,
  FiMessageCircle,
  FiUsers,
  FiBook,
  FiCalendar,
  FiActivity,
  FiHome,
  FiLogOut,
} from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: FiHeart },
    { path: '/chatbot', label: 'AI Support', icon: FiMessageCircle },
    { path: '/screening', label: 'Self-Assessment', icon: FiActivity },
    { path: '/resources', label: 'Resources', icon: FiBook },
    { path: '/forum', label: 'Peer Support', icon: FiUsers },
    { path: '/booking', label: 'Book Counselor', icon: FiCalendar },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-white border-r border-gray-200 transform transition-transform duration-300 h-full ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:fixed lg:inset-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200 bg-gray-50">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <FiHeart className="text-white text-sm" />
            </div>
            <span className="text-lg font-semibold text-gray-900">MindCare</span>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Main Section Label */}
        <div className="px-4 py-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Main</span>
        </div>

        {/* Navigation */}
        <nav className="mt-2 px-3 flex flex-col h-full">
          <div className="flex-1 space-y-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive(path)
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`mr-3 text-base ${
                    isActive(path)
                      ? 'text-blue-600'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                <span className="tracking-wide">{label}</span>
              </Link>
            ))}
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-200 pt-4 pb-4">
            <button
              className="group flex items-center w-full px-3 py-3 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
              onClick={() => alert('Signed out!')}
            >
              <FiLogOut className="mr-3 text-base text-gray-400 group-hover:text-gray-500" />
              <span className="tracking-wide">Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile menu button */}
      {!isOpen && (
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2.5 rounded-md bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
            aria-label="Open menu"
          >
            <FiMenu className="text-lg" />
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;