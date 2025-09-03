import React, { useState } from 'react';
import { 
  FiCalendar, FiClock, FiUser, FiAlertCircle, FiCheckCircle, 
  FiPhone, FiVideo, FiMessageSquare, FiFileText, 
  FiHeart, FiBell, FiSettings 
} from 'react-icons/fi';

const CounselorDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Added for header
  const userStats = { name: "Dr. Smith" };
  const [notifications] = useState([
    { id: 1, read: false, message: "New student referral" },
    { id: 2, read: true, message: "Session completed" }
  ]);

  const todayStats = [
    {
      title: "Today's Appointments",
      value: '6',
      icon: FiCalendar,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'New Student Referrals',
      value: '3',
      icon: FiUser,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Urgent Cases',
      value: '2',
      icon: FiAlertCircle,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Completed Sessions',
      value: '4',
      icon: FiCheckCircle,
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const appointments = [
    {
      id: 1,
      studentId: 'Student #2456',
      time: '09:00 AM',
      duration: '50 min',
      type: 'video',
      status: 'upcoming',
      isNewStudent: false,
      urgency: 'normal',
      lastSession: '2 weeks ago',
      notes: 'Follow-up on anxiety management techniques'
    },
    {
      id: 2,
      studentId: 'Student #1892',
      time: '10:30 AM',
      duration: '50 min',
      type: 'in-person',
      status: 'in-progress',
      isNewStudent: true,
      urgency: 'high',
      lastSession: null,
      notes: 'Initial consultation - academic stress and depression symptoms'
    },
    {
      id: 3,
      studentId: 'Student #3401',
      time: '02:00 PM',
      duration: '50 min',
      type: 'phone',
      status: 'upcoming',
      isNewStudent: false,
      urgency: 'normal',
      lastSession: '1 week ago',
      notes: 'Progress check on sleep hygiene improvements'
    },
    {
      id: 4,
      studentId: 'Student #1254',
      time: '03:30 PM',
      duration: '50 min',
      type: 'video',
      status: 'upcoming',
      isNewStudent: true,
      urgency: 'medium',
      lastSession: null,
      notes: 'Social anxiety and relationship concerns'
    }
  ];

  const recentActivity = [
    {
      type: 'session_completed',
      message: 'Completed session with Student #1647',
      time: '1 hour ago',
      severity: 'normal'
    },
    {
      type: 'urgent_referral',
      message: 'Urgent referral: Student #2890 - high PHQ-9 score',
      time: '2 hours ago',
      severity: 'high'
    },
    {
      type: 'appointment_booked',
      message: 'New appointment booked for tomorrow',
      time: '3 hours ago',
      severity: 'normal'
    },
    {
      type: 'crisis_alert',
      message: 'Crisis intervention completed for Student #1923',
      time: '5 hours ago',
      severity: 'high'
    }
  ];

  const getSessionTypeIcon = (type) => {
    switch (type) {
      case 'video': return FiVideo;
      case 'phone': return FiPhone;
      case 'in-person': return FiUser;
      default: return FiMessageSquare;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'normal': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200 mb-8">
        <div className="px-8 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <FiHeart className="text-white text-sm" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Welcome back, {userStats.name}!
              </h1>
              <p className="text-sm text-gray-500">
                Here's your mental health overview
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-md">
              <FiBell className="text-lg" />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
              <FiSettings className="text-lg" />
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {todayStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white text-xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rest of your dashboard (unchanged) */}
      {/* ...Today's Schedule + Recent Activity sections... */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Today's Schedule</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>

          <div className="space-y-4">
            {appointments.map((appointment) => {
              const SessionIcon = getSessionTypeIcon(appointment.type);
              return (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <SessionIcon className="text-gray-600" />
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{appointment.studentId}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <FiClock />
                          <span>{appointment.time} ({appointment.duration})</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.replace('-', ' ').toUpperCase()}
                      </span>
                      
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getUrgencyColor(appointment.urgency)}`}>
                        {appointment.urgency.toUpperCase()}
                      </span>
                      
                      {appointment.isNewStudent && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-medium">
                          NEW STUDENT
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-base text-gray-700 mb-3">{appointment.notes}</p>
                  
                  {appointment.lastSession && (
                    <p className="text-sm text-gray-500 mb-3">
                      Last session: {appointment.lastSession}
                    </p>
                  )}

                  <div className="flex space-x-3">
                    <button className="flex items-center px-3 py-2 bg-blue-600 text-white text-base font-semibold rounded-md hover:bg-blue-700 transition-colors">
                      <FiVideo className="mr-1" />
                      {appointment.status === 'in-progress' ? 'Join Session' : 'Start Session'}
                    </button>
                    
                    <button className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 text-base font-semibold rounded-md hover:bg-gray-50 transition-colors">
                      <FiFileText className="mr-1" />
                      View Notes
                    </button>
                    
                    <button className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 text-base font-semibold rounded-md hover:bg-gray-50 transition-colors">
                      <FiMessageSquare className="mr-1" />
                      Message
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center px-4 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                <FiCalendar className="mr-3" />
                Add Available Hours
              </button>
              
              <button className="w-full flex items-center px-4 py-3 border border-gray-300 text-gray-700 text-base font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                <FiFileText className="mr-3" />
                Create Session Notes
              </button>
              
              <button className="w-full flex items-center px-4 py-3 border border-gray-300 text-gray-700 text-base font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                <FiUser className="mr-3" />
                View Student Profiles
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.severity === 'high' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                  
                  <div className="flex-1">
                    <p className="text-base text-gray-700">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-blue-600 hover:text-blue-700 text-base font-semibold">
                View All Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};




      


export default CounselorDashboard;