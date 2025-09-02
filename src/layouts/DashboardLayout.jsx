import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUsers, FiCalendar, FiMessageSquare, FiSettings, FiLogOut, FiHeart } from 'react-icons/fi';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Overview', href: '/dashboard/admin', icon: FiMenu, current: location.pathname === '/dashboard/admin' },
    { name: 'Students', href: '/dashboard/admin/students', icon: FiUsers, current: location.pathname === '/dashboard/admin/students' },
    { name: 'Counselors', href: '/dashboard/counselor', icon: FiUsers, current: location.pathname === '/dashboard/counselor' },
    { name: 'Appointments', href: '/dashboard/admin/appointments', icon: FiCalendar, current: location.pathname === '/dashboard/admin/appointments' },
    { name: 'Forum Moderation', href: '/dashboard/admin/forum', icon: FiMessageSquare, current: location.pathname === '/dashboard/admin/forum' },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: FiSettings, current: location.pathname === '/dashboard/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0 lg:translate-x-0"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
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

        {/* Sidebar nav */}
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
                  <Icon
                    className={`mr-3 text-lg ${
                      item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
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

      {/* Main content (next to sidebar) */}
      <div className="flex-1 bg-gray-50 p-6 ">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <FiMenu className="text-xl" />
              </button>
              <h1 className="ml-4 lg:ml-0 text-2xl font-bold text-gray-900">
                {location.pathname.includes('counselor') ? 'Counselor Dashboard' : 'Admin Dashboard'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Online</span>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <FiUsers className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
