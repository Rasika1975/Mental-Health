import React, { useState } from 'react';
import { FiUsers, FiTrendingUp, FiAlertTriangle, FiCalendar, FiMessageSquare, FiActivity, FiBarChart2, FiDownload } from 'react-icons/fi';

const AdminDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  const stats = [
    {
      title: 'Total Students',
      value: '2,456',
      change: '+12%',
      changeType: 'positive',
      icon: FiUsers,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Active Sessions',
      value: '89',
      change: '+8%',
      changeType: 'positive',
      icon: FiActivity,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'High Risk Alerts',
      value: '23',
      change: '-15%',
      changeType: 'negative',
      icon: FiAlertTriangle,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Counselor Utilization',
      value: '76%',
      change: '+5%',
      changeType: 'positive',
      icon: FiBarChart2,
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      student: 'Student #2456',
      severity: 'high',
      reason: 'PHQ-9 score indicates severe depression',
      timestamp: '15 minutes ago',
      status: 'pending'
    },
    {
      id: 2,
      student: 'Student #1892',
      severity: 'medium',
      reason: 'Multiple forum posts indicating distress',
      timestamp: '1 hour ago',
      status: 'assigned'
    },
    {
      id: 3,
      student: 'Student #3401',
      severity: 'high',
      reason: 'Crisis keywords detected in chatbot conversation',
      timestamp: '2 hours ago',
      status: 'resolved'
    }
  ];

  const wellnessMetrics = [
    { category: 'Anxiety', current: 34, previous: 38, trend: 'down' },
    { category: 'Depression', current: 28, previous: 31, trend: 'down' },
    { category: 'Academic Stress', current: 45, previous: 42, trend: 'up' },
    { category: 'Sleep Issues', current: 52, previous: 48, trend: 'up' },
    { category: 'Social Isolation', current: 19, previous: 23, trend: 'down' }
  ];

  const upcomingEvents = [
    {
      title: 'Mental Health Awareness Workshop',
      date: 'Sept 5, 2025',
      time: '2:00 PM',
      attendees: 45,
      type: 'workshop'
    },
    {
      title: 'Stress Management Seminar',
      date: 'Sept 8, 2025',
      time: '10:00 AM',
      attendees: 67,
      type: 'seminar'
    },
    {
      title: 'Peer Counselor Training',
      date: 'Sept 12, 2025',
      time: '9:00 AM',
      attendees: 12,
      type: 'training'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'assigned': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor student wellness and platform analytics</p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="day">Last 24 Hours</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="semester">This Semester</option>
            </select>
            
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <FiDownload className="mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last {selectedTimeRange}
                  </p>
                </div>
                
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white text-xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Wellness Metrics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Wellness Metrics Trends</h3>
          
          <div className="space-y-4">
            {wellnessMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{metric.category}</h4>
                  <p className="text-sm text-gray-600">{metric.current}% of students affected</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {metric.trend === 'up' ? '+' : '-'}{Math.abs(metric.current - metric.previous)}%
                  </span>
                  
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    metric.trend === 'up' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {metric.trend === 'up' ? '↗' : '↘'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Alerts</h3>
            <FiAlertTriangle className="text-orange-500 text-xl" />
          </div>
          
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{alert.student}</h4>
                    <p className="text-sm text-gray-600">{alert.reason}</p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">{alert.timestamp}</span>
                  
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <FiCalendar className="text-blue-600 text-lg" />
                <div>
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {event.attendees} registered
                </span>
                
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full capitalize">
                  {event.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Usage Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Platform Usage</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FiTrendingUp className="text-lg" />
            <span>Daily Active Users</span>
          </div>
        </div>
        
        {/* Simple Chart Representation */}
        <div className="space-y-4">
          {[
            { feature: 'AI Chatbot', usage: 78, sessions: 342 },
            { feature: 'Self-Assessment', usage: 45, sessions: 156 },
            { feature: 'Resource Hub', usage: 62, sessions: 289 },
            { feature: 'Peer Forum', usage: 34, sessions: 98 },
            { feature: 'Counselor Booking', usage: 23, sessions: 67 }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{item.feature}</h4>
                <p className="text-sm text-gray-600">{item.sessions} sessions this week</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.usage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-12">{item.usage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;