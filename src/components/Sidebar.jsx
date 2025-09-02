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
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 h-full ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:fixed lg:inset-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <FiHeart className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold text-gray-800">MindCare</span>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 flex flex-col h-[calc(100%-4rem)]">
          <div className="flex-1 space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(path)
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`mr-3 text-lg ${
                    isActive(path)
                      ? 'text-blue-600'
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                />
                {label}
              </Link>
            ))}
          </div>

          {/* Bottom section */}
          <div className="pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="group flex items-center px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <FiHome className="mr-3 text-lg text-gray-400 group-hover:text-gray-600" />
              Back to Site
            </Link>

            <button
              className="group flex items-center w-full px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              onClick={() => alert('Signed out!')}
            >
              <FiLogOut className="mr-3 text-lg text-gray-400 group-hover:text-gray-600" />
              Sign Out
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile menu button */}
      {!isOpen && (
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="p-3 rounded-lg bg-white shadow-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            aria-label="Open menu"
          >
            <FiMenu className="text-xl" />
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
