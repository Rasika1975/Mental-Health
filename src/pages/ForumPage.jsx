import React, { useState } from 'react';
import { FiMessageSquare, FiHeart, FiUser, FiClock, FiPlus, FiShield, FiUsers, FiTrendingUp } from 'react-icons/fi';

const ForumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' });

  const forumCategories = [
    { id: 'all', label: 'All Posts', count: 156 },
    { id: 'general', label: 'General Support', count: 45 },
    { id: 'anxiety', label: 'Anxiety & Stress', count: 38 },
    { id: 'depression', label: 'Depression', count: 25 },
    { id: 'academic', label: 'Academic Pressure', count: 32 },
    { id: 'social', label: 'Social Issues', count: 16 }
  ];

  const forumPosts = [
    {
      id: 1,
      title: 'Dealing with exam anxiety - tips that actually work',
      content: 'I wanted to share some techniques that have really helped me manage my exam anxiety. The 4-7-8 breathing method has been a game changer...',
      author: 'Anonymous Student',
      category: 'anxiety',
      timestamp: '2 hours ago',
      replies: 12,
      likes: 24,
      isPopular: true
    },
    {
      id: 2,
      title: 'Feeling overwhelmed with coursework - anyone else?',
      content: 'Is anyone else feeling completely overwhelmed this semester? I have 3 major projects due next week and I can barely keep up...',
      author: 'StudyingHard22',
      category: 'academic',
      timestamp: '4 hours ago',
      replies: 8,
      likes: 15,
      isPopular: false
    },
    {
      id: 3,
      title: 'Made my first friend in months!',
      content: 'I know this might sound silly, but I finally worked up the courage to talk to someone in my class and we grabbed coffee today...',
      author: 'QuietStudent',
      category: 'social',
      timestamp: '6 hours ago',
      replies: 18,
      likes: 42,
      isPopular: true
    },
    {
      id: 4,
      title: 'Sleep schedule completely messed up',
      content: 'My sleep has been terrible lately. Going to bed at 3am and waking up at noon. Any advice on how to reset?',
      author: 'NightOwl2024',
      category: 'general',
      timestamp: '8 hours ago',
      replies: 6,
      likes: 9,
      isPopular: false
    },
    {
      id: 5,
      title: 'Homesickness hitting hard',
      content: 'Been at college for 3 months now and the homesickness is getting worse, not better. Missing family and old friends...',
      author: 'FarFromHome',
      category: 'general',
      timestamp: '1 day ago',
      replies: 14,
      likes: 28,
      isPopular: false
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? forumPosts 
    : forumPosts.filter(post => post.category === selectedCategory);

  const handleNewPost = () => {
    // In a real app, this would make an API call
    console.log('New post:', newPost);
    setShowNewPostModal(false);
    setNewPost({ title: '', content: '', category: 'general' });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Peer Support Forum</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with fellow students in a safe, anonymous environment. Share experiences, 
          get support, and help others on their mental health journey.
        </p>
      </div>

      {/* Safety Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
        <div className="flex items-center space-x-3">
          <FiShield className="text-green-600 text-xl" />
          <div>
            <h3 className="font-semibold text-green-800">Safe & Moderated Space</h3>
            <p className="text-green-700 text-sm">
              All posts are reviewed by trained moderators. Personal information is protected. Report inappropriate content immediately.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            {/* New Post Button */}
            <button
              onClick={() => setShowNewPostModal(true)}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all mb-6"
            >
              <FiPlus className="mr-2" />
              New Post
            </button>

            {/* Categories */}
            <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {forumCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.label}</span>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Forum Stats */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Community Stats</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Users</span>
                  <span className="font-medium text-blue-600">342</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Posts Today</span>
                  <span className="font-medium text-green-600">28</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Posts</span>
                  <span className="font-medium text-purple-600">1,247</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <FiUser className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{post.author}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FiClock className="text-xs" />
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span className="capitalize">{post.category}</span>
                      </div>
                    </div>
                  </div>

                  {post.isPopular && (
                    <div className="flex items-center space-x-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                      <FiTrendingUp className="text-xs" />
                      <span>Popular</span>
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                      <FiHeart className="text-lg" />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <FiMessageSquare className="text-lg" />
                      <span>{post.replies} replies</span>
                    </button>
                  </div>

                  <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                    View Discussion
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Posts in This Category</h3>
              <p className="text-gray-500 mb-4">Be the first to start a conversation!</p>
              <button
                onClick={() => setShowNewPostModal(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <FiPlus className="mr-2" />
                Create First Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {forumCategories.slice(1).map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What would you like to discuss?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts, experiences, or questions..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <div className="flex items-start space-x-3">
                <FiShield className="text-blue-600 text-lg mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800">Community Guidelines</h4>
                  <ul className="text-blue-700 text-sm mt-1 space-y-1">
                    <li>• Be respectful and supportive</li>
                    <li>• No personal information sharing</li>
                    <li>• No medical advice - share experiences only</li>
                    <li>• Report harmful content immediately</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              <button
                onClick={handleNewPost}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post Anonymously
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPage;