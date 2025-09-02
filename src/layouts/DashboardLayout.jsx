import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUsers,  FiCalendar, FiMessageSquare, FiSettings, FiLogOut, FiHeart } from 'react-icons/fi';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Overview', href: '/dashboard/admin', icon: FiMenu, current: location.pathname === '/dashboard/admin' },
    { name: 'Students', href: '/dashboard/admin/students', icon: FiUsers, current: false },
    { name: 'Counselors', href: '/dashboard/counselor', icon: FiUsers, current: location.pathname === '/dashboard/counselor' },
    { name: 'Appointments', href: '/dashboard/admin/appointments', icon: FiCalendar, current: false },
    { name: 'Forum Moderation', href: '/dashboard/admin/forum', icon: FiMessageSquare, current: false },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: FiSettings, current: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FiHeart className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-gray-800">MindCare</span>
          </div>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={`mr-3 text-lg ${
                    item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <FiHome className="mr-3 text-lg text-gray-400 group-hover:text-gray-600" />
              Back to Site
            </Link>
            
            <button className="group flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors">
              <FiLogOut className="mr-3 text-lg text-gray-400 group-hover:text-gray-600" />
              Sign Out
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md bg-white shadow-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <FiMenu className="text-xl" />
          </button>
        </div>

        {/* Page content */}
        <main className="py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;