import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMessageCircle, FiActivity, FiBook, FiUsers, FiCalendar, FiShield, 
  FiHeart, FiArrowRight, FiStar, FiChevronDown, FiChevronUp, FiMail, 
  FiCheck, FiTarget, FiThumbsUp, FiLock, FiChevronLeft, FiChevronRight,
  FiUserCheck, FiPenTool, FiSend, FiAward, FiClock, FiGlobe, FiTrendingUp,
  FiZap, FiEye, FiHeadphones, FiVideo, FiFileText, FiDownload, FiUser,
   FiBell, FiSettings, FiPlus, FiTrendingDown, FiMinus,
  FiEdit3, FiTrash2, FiRefreshCw, FiExternalLink, FiChevronUp as FiUp,
  FiChevronDown as FiDown, FiMoreHorizontal, FiFilter, FiSearch
} from 'react-icons/fi';

// Custom Hook for Count-Up Animation
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const finalEnd = parseInt(String(end).replace(/[^0-9]/g, '')) || 0;
          if (start === finalEnd) {
            setCount(end);
            return;
          }

          const incrementTime = 16; // roughly 60fps
          const totalSteps = Math.ceil(duration / incrementTime);
          const increment = finalEnd / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= finalEnd) {
              setCount(finalEnd);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, incrementTime);
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  // Handle non-numeric strings like '24/7'
  if (isNaN(parseInt(String(end).replace(/[^0-9]/g, '')))) {
    return <span ref={ref}>{end}</span>;
  }

  return <span ref={ref}>{count}</span>;
};

const Home = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Your mood assessment is complete', time: '2 hours ago', read: false },
    { id: 2, type: 'info', message: 'New meditation session available', time: '1 day ago', read: false },
    { id: 3, type: 'reminder', message: 'Counselor session scheduled for tomorrow', time: '2 days ago', read: true },
  ]);

  // Dashboard Data
  const userStats = {
    name: "Team Elite",
    streak: 7,
    moodScore: 8.2,
    sessionsCompleted: 12,
    goalsAchieved: 5
  };

  const recentActivities = [
    { id: 1, type: 'assessment', title: 'Completed PHQ-9 Assessment', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'chat', title: 'AI Chat Session', time: '1 day ago', status: 'completed' },
    { id: 3, type: 'meditation', title: 'Mindfulness Meditation', time: '2 days ago', status: 'completed' },
    { id: 4, type: 'counselor', title: 'Counselor Session', time: '3 days ago', status: 'completed' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Counselor Session', time: 'Tomorrow 2:00 PM', type: 'counselor' },
    { id: 2, title: 'Group Therapy', time: 'Friday 4:00 PM', type: 'group' },
    { id: 3, title: 'Mood Check-in', time: 'Daily Reminder', type: 'reminder' },
  ];

  const moodData = [
    { day: 'Mon', mood: 7 },
    { day: 'Tue', mood: 6 },
    { day: 'Wed', mood: 8 },
    { day: 'Thu', mood: 7 },
    { day: 'Fri', mood: 9 },
    { day: 'Sat', mood: 8 },
    { day: 'Sun', mood: 7 },
  ];

  const quickActions = [
    { icon: FiMessageCircle, title: 'AI Chat', description: 'Get instant support', color: 'blue', link: '/chatbot' },
    { icon: FiActivity, title: 'Assessment', description: 'Check your mood', color: 'green', link: '/screening' },
    { icon: FiCalendar, title: 'Book Session', description: 'Schedule counseling', color: 'purple', link: '/booking' },
    { icon: FiBook, title: 'Resources', description: 'Browse materials', color: 'orange', link: '/resources' },
  ];

  const stats = [
    { number: '10,000+', label: 'Students Helped', suffix: '' },
    { number: '24/7', label: 'AI Support', suffix: '' },
    { number: '98%', label: 'Satisfaction Rate', suffix: '' },
    { number: '50+', label: 'Counselors', suffix: '' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="px-14 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <FiHeart className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userStats.name}!</h1>
                <p className="text-gray-600">Here's your mental health overview</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <FiBell className="text-xl" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <FiSettings className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-3xl font-bold text-blue-600">{userStats.streak} days</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="text-blue-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <FiUp className="mr-1" />
              <span>+2 from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mood Score</p>
                <p className="text-3xl font-bold text-green-600">{userStats.moodScore}/10</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiHeart className="text-green-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <FiUp className="mr-1" />
              <span>+0.8 from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sessions</p>
                <p className="text-3xl font-bold text-purple-600">{userStats.sessionsCompleted}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiCalendar className="text-purple-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <span>This month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Goals Achieved</p>
                <p className="text-3xl font-bold text-orange-600">{userStats.goalsAchieved}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FiTarget className="text-orange-600 text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <FiUp className="mr-1" />
              <span>+1 this week</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={index}
                      to={action.link}
                      className="flex items-center p-3 rounded-lg border-2 border-transparent hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                        <Icon className="text-blue-600 text-lg" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{action.title}</p>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mood Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Mood Trend</h3>
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              <div className="h-64 flex items-end justify-between space-x-2">
                {moodData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-blue-400"
                      style={{ height: `${(data.mood / 10) * 200}px` }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">{data.day}</span>
                    <span className="text-xs font-medium text-gray-900">{data.mood}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FiCheck className="text-green-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Calendar</button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiCalendar className="text-blue-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">{event.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {useCountUp(stat.number)}{stat.suffix}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;