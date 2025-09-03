import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FiMessageCircle,
  FiActivity,
  FiBook,
  FiUsers,
  FiCalendar,
  FiHeart,
  FiBell,
  FiSettings,
  FiTrendingUp,
  FiTarget,
  FiCheck,
} from "react-icons/fi";

// Custom Hook for Count-Up Animation
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const finalEnd =
            parseInt(String(end).replace(/[^0-9]/g, "")) || 0;
          if (start === finalEnd) {
            setCount(end);
            return;
          }

          const incrementTime = 16; // ~60fps
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

  if (isNaN(parseInt(String(end).replace(/[^0-9]/g, "")))) {
    return <span ref={ref}>{end}</span>;
  }

  return <span ref={ref}>{count}</span>;
};

const Home = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");
  const [notifications] = useState([
    {
      id: 1,
      type: "success",
      message: "Your mood assessment is complete",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      message: "New meditation session available",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      type: "reminder",
      message: "Counselor session scheduled for tomorrow",
      time: "2 days ago",
      read: true,
    },
  ]);

  // Dashboard Data
  const userStats = {
    name: "Team Elite",
    streak: 7,
    moodScore: 8.2,
    sessionsCompleted: 12,
    goalsAchieved: 5,
  };

  const recentActivities = [
    {
      id: 1,
      type: "assessment",
      title: "Completed PHQ-9 Assessment",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "chat",
      title: "AI Chat Session",
      time: "1 day ago",
      status: "completed",
    },
    {
      id: 3,
      type: "meditation",
      title: "Mindfulness Meditation",
      time: "2 days ago",
      status: "completed",
    },
    {
      id: 4,
      type: "counselor",
      title: "Counselor Session",
      time: "3 days ago",
      status: "completed",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Counselor Session",
      time: "Tomorrow 2:00 PM",
      type: "counselor",
    },
    {
      id: 2,
      title: "Group Therapy",
      time: "Friday 4:00 PM",
      type: "group",
    },
    { id: 3, title: "Mood Check-in", time: "Daily Reminder", type: "reminder" },
  ];

  const moodData = [
    { day: "Mon", mood: 7 },
    { day: "Tue", mood: 6 },
    { day: "Wed", mood: 8 },
    { day: "Thu", mood: 7 },
    { day: "Fri", mood: 9 },
    { day: "Sat", mood: 8 },
    { day: "Sun", mood: 7 },
  ];

  const quickActions = [
    {
      icon: FiMessageCircle,
      title: "AI Chat",
      description: "Get instant support",
      link: "/chatbot",
    },
    {
      icon: FiActivity,
      title: "Assessment",
      description: "Check your mood",
      link: "/screening",
    },
    {
      icon: FiCalendar,
      title: "Book Session",
      description: "Schedule counseling",
      link: "/booking",
    },
    {
      icon: FiBook,
      title: "Resources",
      description: "Browse materials",
      link: "/resources",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Students Helped" },
    { number: "24/7", label: "AI Support" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "50+", label: "Counselors" },
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
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
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="px-8 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Current Streak</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userStats.streak} days
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                <FiTrendingUp className="text-gray-600 text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Mood Score</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userStats.moodScore}/10
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                <FiHeart className="text-gray-600 text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Sessions</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userStats.sessionsCompleted}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                <FiCalendar className="text-gray-600 text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Goals Achieved</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userStats.goalsAchieved}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                <FiTarget className="text-gray-600 text-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions + Mood Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className="flex items-center p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition"
                  >
                    <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                      <Icon className="text-gray-600 text-base" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {action.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {action.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mood Trend */}
          <div className="lg:col-span-2 bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-gray-900">
                Mood Trend
              </h3>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {moodData.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1"
                >
                  <div
                    className="w-full bg-gray-300 rounded-t-md transition-all duration-500"
                    style={{ height: `${(data.mood / 10) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">
                    {data.day}
                  </span>
                  <span className="text-xs font-medium text-gray-800">
                    {data.mood}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity + Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                Recent Activity
              </h3>
              <button className="text-sm text-blue-600 hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 transition"
                >
                  <div className="w-7 h-7 bg-green-100 rounded-md flex items-center justify-center">
                    <FiCheck className="text-green-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded">
                    Completed
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                Upcoming Events
              </h3>
              <button className="text-sm text-blue-600 hover:underline">
                View Calendar
              </button>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 transition"
                >
                  <div className="w-7 h-7 bg-gray-100 rounded-md flex items-center justify-center">
                    <FiCalendar className="text-gray-600 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded capitalize">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-5">
            Platform Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {useCountUp(stat.number)}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
