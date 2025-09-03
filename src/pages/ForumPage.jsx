import React, { useState } from 'react';
import { 
  FiMessageSquare, FiHeart, FiUser, FiClock, FiPlus, FiShield, FiUsers, FiTrendingUp,
  FiSearch, FiFilter, FiThumbsUp, FiMessageCircle, FiEye, FiFlag, FiMoon, FiSun,
  FiSettings, FiChevronDown, FiChevronUp, FiStar, FiBookmark, FiShare2, FiX,
  FiSmile, FiMeh, FiFeather, FiLifeBuoy, FiArrowUp, FiArrowDown, FiMoreHorizontal,
  FiAlertTriangle, FiPhone, FiEdit3, FiSend, FiRefreshCw
} from 'react-icons/fi';

const ForumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general', mood: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPosts, setExpandedPosts] = useState(new Set());
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [replyText, setReplyText] = useState('');

  const forumCategories = [
    { id: 'all', label: 'All Posts', count: 156, icon: FiMessageSquare, color: 'blue' },
    { id: 'general', label: 'General Support', count: 45, icon: FiUsers, color: 'green' },
    { id: 'anxiety', label: 'Anxiety & Stress', count: 38, icon: FiFeather, color: 'yellow' },
    { id: 'depression', label: 'Depression', count: 25, icon: FiHeart, color: 'purple' },
    { id: 'academic', label: 'Academic Pressure', count: 32, icon: FiTrendingUp, color: 'red' },
    { id: 'social', label: 'Social Issues', count: 16, icon: FiSmile, color: 'pink' }
  ];

  const moodOptions = [
    { id: 'struggling', label: 'Struggling', color: 'red' },
    { id: 'anxious', label: 'Anxious', color: 'yellow' },
    { id: 'sad', label: 'Sad', color: 'blue' },
    { id: 'hopeful', label: 'Hopeful', color: 'green' },
    { id: 'grateful', label: 'Grateful', color: 'purple' },
    { id: 'celebrating', label: 'Celebrating', color: 'orange' }
  ];

  const forumPosts = [
    {
      id: 1,
      title: 'Dealing with exam anxiety - tips that actually work',
      content: 'I wanted to share some techniques that have really helped me manage my exam anxiety. The 4-7-8 breathing method has been a game changer for me during stressful moments. Also, breaking study sessions into 25-minute chunks has made everything feel less overwhelming.',
      fullContent: 'I wanted to share some techniques that have really helped me manage my exam anxiety. The 4-7-8 breathing method has been a game changer for me during stressful moments. Also, breaking study sessions into 25-minute chunks (Pomodoro technique) has made everything feel less overwhelming. What techniques work for you? I\'d love to hear other strategies that have helped people here.',
      author: 'Anonymous Student',
      category: 'anxiety',
      timestamp: '2 hours ago',
      replies: 12,
      likes: 24,
      views: 89,
      isPopular: true,
      mood: 'hopeful',
      tags: ['breathing', 'study-tips', 'coping'],
      isVerified: true,
      recentReplies: [
        { author: 'Helper123', content: 'The Pomodoro technique saved my semester!', timestamp: '1 hour ago' },
        { author: 'StudentLife', content: 'Thanks for sharing, trying the breathing method now', timestamp: '30 min ago' }
      ]
    },
    {
      id: 2,
      title: 'Feeling overwhelmed with coursework - anyone else?',
      content: 'Is anyone else feeling completely overwhelmed this semester? I have 3 major projects due next week and I can barely keep up. Sometimes I wonder if I\'m cut out for this.',
      fullContent: 'Is anyone else feeling completely overwhelmed this semester? I have 3 major projects due next week and I can barely keep up. Sometimes I wonder if I\'m cut out for this. Looking for some encouragement and maybe time management tips. How do you all manage when everything feels like too much?',
      author: 'StudyingHard22',
      category: 'academic',
      timestamp: '4 hours ago',
      replies: 8,
      likes: 15,
      views: 67,
      isPopular: false,
      mood: 'struggling',
      tags: ['overwhelmed', 'time-management', 'projects'],
      recentReplies: [
        { author: 'MentorStudent', content: 'You\'re definitely not alone. Try breaking tasks into smaller chunks.', timestamp: '2 hours ago' }
      ]
    },
    {
      id: 3,
      title: 'Made my first friend in months!',
      content: 'I know this might sound silly, but I finally worked up the courage to talk to someone in my class and we grabbed coffee today! For someone who\'s been struggling with social anxiety, this feels like a huge win.',
      fullContent: 'I know this might sound silly, but I finally worked up the courage to talk to someone in my class and we grabbed coffee today! For someone who\'s been struggling with social anxiety, this feels like a huge win. To anyone who feels lonely - small steps really do matter. We talked about our shared interests and it felt so natural. Sometimes the anticipation is worse than the actual interaction.',
      author: 'QuietStudent',
      category: 'social',
      timestamp: '6 hours ago',
      replies: 18,
      likes: 42,
      views: 123,
      isPopular: true,
      mood: 'celebrating',
      tags: ['friendship', 'social-anxiety', 'victory'],
      recentReplies: [
        { author: 'Cheerleader', content: 'This is amazing! So proud of you!', timestamp: '4 hours ago' },
        { author: 'SocialAnxietyWarrior', content: 'You\'ve inspired me to try this too', timestamp: '3 hours ago' }
      ]
    },
    {
      id: 4,
      title: 'Sleep schedule completely messed up',
      content: 'My sleep has been terrible lately. Going to bed at 3am and waking up at noon. Any advice on how to reset?',
      fullContent: 'My sleep has been terrible lately. Going to bed at 3am and waking up at noon. Any advice on how to reset? I know it\'s affecting my mood and energy levels. I\'ve tried melatonin but it doesn\'t seem to help much. Has anyone successfully fixed a messed up sleep schedule?',
      author: 'NightOwl2024',
      category: 'general',
      timestamp: '8 hours ago',
      replies: 6,
      likes: 9,
      views: 45,
      isPopular: false,
      mood: 'struggling',
      tags: ['sleep', 'routine', 'health'],
      recentReplies: [
        { author: 'SleepExpert', content: 'Try gradual 15-minute adjustments each day', timestamp: '6 hours ago' }
      ]
    },
    {
      id: 5,
      title: 'Homesickness hitting hard',
      content: 'Been at college for 3 months now and the homesickness is getting worse, not better. Missing family and old friends so much.',
      fullContent: 'Been at college for 3 months now and the homesickness is getting worse, not better. Missing family and old friends so much. I thought it would get easier with time but some days I just want to pack up and go home. Anyone else dealing with this? How do you cope with being far from home?',
      author: 'FarFromHome',
      category: 'general',
      timestamp: '1 day ago',
      replies: 14,
      likes: 28,
      views: 78,
      isPopular: false,
      mood: 'sad',
      tags: ['homesickness', 'family', 'adjustment'],
      recentReplies: [
        { author: 'HomeSweetHome', content: 'Video calls with family help me a lot', timestamp: '12 hours ago' },
        { author: 'CollegeVet', content: 'It does get easier, I promise. Give it more time.', timestamp: '8 hours ago' }
      ]
    }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.likes - a.likes;
      case 'mostReplies': return b.replies - a.replies;
      case 'recent': 
      default: return new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  const toggleExpanded = (postId) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  const toggleLike = (postId) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  const toggleSave = (postId) => {
    const newSaved = new Set(savedPosts);
    if (newSaved.has(postId)) {
      newSaved.delete(postId);
    } else {
      newSaved.add(postId);
    }
    setSavedPosts(newSaved);
  };

  const handleNewPost = () => {
    console.log('New post:', newPost);
    setShowNewPostModal(false);
    setNewPost({ title: '', content: '', category: 'general', mood: '' });
  };

  const getCategoryColor = (color) => {
    const colors = {
      blue: darkMode ? 'from-blue-600 to-blue-700' : 'from-blue-400 to-blue-500',
      green: darkMode ? 'from-green-600 to-green-700' : 'from-green-400 to-green-500',
      yellow: darkMode ? 'from-yellow-600 to-yellow-700' : 'from-yellow-400 to-yellow-500',
      purple: darkMode ? 'from-purple-600 to-purple-700' : 'from-purple-400 to-purple-500',
      red: darkMode ? 'from-red-600 to-red-700' : 'from-red-400 to-red-500',
      pink: darkMode ? 'from-pink-600 to-pink-700' : 'from-pink-400 to-pink-500',
      orange: darkMode ? 'from-orange-600 to-orange-700' : 'from-orange-400 to-orange-500'
    };
    return colors[color] || colors.blue;
  };

  const getMoodColor = (mood) => {
    const moodData = moodOptions.find(m => m.id === mood);
    return moodData ? getCategoryColor(moodData.color) : 'from-gray-400 to-gray-500';
  };

  const themeClasses = darkMode 
    ? 'bg-gray-900 text-gray-100 min-h-screen' 
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900 min-h-screen';

  const cardClasses = darkMode 
    ? 'bg-gray-800 border border-gray-700' 
    : 'bg-white/80 backdrop-blur-sm border border-white/50';

  const PostModal = ({ post, onClose }) => {
    if (!post) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className={`${cardClasses} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}>
          {/* Modal Header */}
          <div className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FiUser className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{post.author}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiClock />
                    <span>{post.timestamp}</span>
                    <span>•</span>
                    <span className="capitalize">{post.category}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{post.fullContent}</p>

            {/* Post Stats */}
            <div className="flex items-center space-x-6 mb-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center space-x-1">
                <FiHeart className="text-red-500" />
                <span>{post.likes} likes</span>
              </span>
              <span className="flex items-center space-x-1">
                <FiMessageCircle className="text-blue-500" />
                <span>{post.replies} replies</span>
              </span>
              <span className="flex items-center space-x-1">
                <FiEye className="text-gray-500" />
                <span>{post.views} views</span>
              </span>
            </div>

            {/* Replies Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="text-lg font-semibold mb-4">Replies ({post.replies})</h4>
              
              {post.recentReplies?.map((reply, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <FiUser className="text-white text-sm" />
                    </div>
                    <span className="text-base font-semibold">{reply.author}</span>
                    <span className="text-sm text-gray-500">{reply.timestamp}</span>
                  </div>
                  <p className="text-base text-gray-700 dark:text-gray-300">{reply.content}</p>
                </div>
              ))}

              {/* Reply Input */}
              <div className="mt-6">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Share your thoughts and support..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-base"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">Remember to be kind and supportive</span>
                  <button 
                    disabled={!replyText.trim()}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-base rounded-lg transition-colors"
                  >
                    <FiSend />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${themeClasses} transition-all duration-300`}>
      {/* Emergency Support Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FiLifeBuoy className="text-xl" />
            <span className="text-sm font-semibold">Need immediate support?</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:988" className="flex items-center space-x-1 hover:underline text-sm">
              <FiPhone />
              <span>Crisis Line: 988</span>
            </a>
            <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition-colors text-sm font-semibold">
              Chat Now
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full">
                <FiUsers className="text-4xl text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Peer Support Forum
            </h1>
            <p className="text-base text-gray-700 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Connect with fellow students in a safe, anonymous environment. Share experiences, 
              get support, and help others on their mental health journey.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className={`${cardClasses} rounded-xl p-4 text-center shadow-lg`}>
              <FiUsers className="text-2xl text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">342</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Active Users</div>
            </div>
            <div className={`${cardClasses} rounded-xl p-4 text-center shadow-lg`}>
              <FiMessageSquare className="text-2xl text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">28</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Posts Today</div>
            </div>
            <div className={`${cardClasses} rounded-xl p-4 text-center shadow-lg`}>
              <FiHeart className="text-2xl text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Support Given</div>
            </div>
            <div className={`${cardClasses} rounded-xl p-4 text-center shadow-lg`}>
              <FiStar className="text-2xl text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">4.9</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Community Rating</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        {/* Controls Bar */}
        <div className={`${cardClasses} rounded-xl shadow-lg p-6 mb-8`}>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 relative max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts and discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="mostReplies">Most Replies</option>
              </select>

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {darkMode ? <FiSun className="text-yellow-500" /> : <FiMoon className="text-blue-500" />}
              </button>

              {/* New Post Button */}
              <button
                onClick={() => setShowNewPostModal(true)}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-base rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <FiPlus />
                <span>New Post</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className={`${cardClasses} rounded-xl shadow-lg p-6 sticky top-24`}>
              {/* Safety Notice */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <FiShield className="text-green-600 dark:text-green-400 text-lg mt-0.5" />
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 dark:text-green-400">Safe Space</h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Moderated 24/7. Anonymous posting. Personal info protected.
                    </p>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <h3 className="text-2xl font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {forumCategories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-102 ${
                        isActive
                          ? `bg-gradient-to-r ${getCategoryColor(category.color)} text-white shadow-md`
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="text-lg" />
                          <span className="text-base font-semibold">{category.label}</span>
                        </div>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          isActive ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                        }`}>
                          {category.count}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Community Guidelines */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                  <FiShield className="text-blue-500" />
                  <span>Guidelines</span>
                </h4>
                <ul className="text-base text-gray-700 dark:text-gray-400 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Be respectful and supportive</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>No personal information sharing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Share experiences, not medical advice</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Report harmful content</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-base text-gray-700 dark:text-gray-300">
                {filteredPosts.length} posts in {selectedCategory === 'all' ? 'all categories' : forumCategories.find(c => c.id === selectedCategory)?.label}
              </p>
              <div className="flex items-center space-x-2 text-sm">
                {savedPosts.size > 0 && (
                  <span className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <FiBookmark />
                    <span>{savedPosts.size} saved</span>
                  </span>
                )}
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {sortedPosts.map((post) => {
                const isExpanded = expandedPosts.has(post.id);
                const isLiked = likedPosts.has(post.id);
                const isSaved = savedPosts.has(post.id);
                const moodData = moodOptions.find(m => m.id === post.mood);

                return (
                  <div 
                    key={post.id} 
                    className={`${cardClasses} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
                  >
                    {/* Post Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <FiUser className="text-white text-xl" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-semibold">{post.author}</h3>
                              {post.isVerified && <FiShield className="text-blue-500" title="Verified Helper" />}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                              <FiClock />
                              <span>{post.timestamp}</span>
                              <span>•</span>
                              <span className="capitalize">{post.category}</span>
                            </div>
                          </div>
                        </div>
                        {moodData && (
                          <div className={`text-sm font-semibold px-3 py-1 rounded-full text-white bg-gradient-to-r ${getMoodColor(post.mood)}`}>
                            {moodData.label}
                          </div>
                        )}
                      </div>

                      {/* Post Title */}
                      <h2 
                        className="text-2xl font-bold mb-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => setSelectedPost(post)}
                      >
                        {post.title}
                      </h2>
                    </div>

                    {/* Post Content */}
                    <div className="px-6 pb-4">
                      <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        {isExpanded ? post.fullContent : post.content}
                      </p>
                      {!isExpanded && (
                        <button 
                          onClick={() => toggleExpanded(post.id)}
                          className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-2 hover:underline"
                        >
                          Read more
                        </button>
                      )}
                    </div>

                    {/* Post Footer */}
                    <div className="px-6 pb-4">
                      <div className="flex items-center space-x-2 mb-4">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-2 py-1 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-6">
                          <button onClick={() => toggleLike(post.id)} className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''}`}>
                            <FiHeart />
                            <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                          </button>
                          <button onClick={() => setSelectedPost(post)} className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                            <FiMessageCircle />
                            <span>{post.replies}</span>
                          </button>
                          <span className="flex items-center space-x-1">
                            <FiEye />
                            <span>{post.views}</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => toggleSave(post.id)} className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isSaved ? 'text-blue-500 bg-blue-100 dark:bg-blue-900/50' : ''}`}>
                            <FiBookmark />
                          </button>
                          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <FiShare2 />
                          </button>
                          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <FiMoreHorizontal />
                          </button>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-6 border-t border-gray-200 dark:border-gray-600">
                        <h4 className="text-lg font-semibold mb-4">Recent Replies</h4>
                        <div className="space-y-4">
                          {post.recentReplies?.map((reply, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex-shrink-0 flex items-center justify-center">
                                <FiUser className="text-white text-sm" />
                              </div>
                              <div>
                                <span className="text-base font-semibold">{reply.author}</span>
                                <span className="text-sm text-gray-500 ml-2">{reply.timestamp}</span>
                                <p className="text-base text-gray-700 dark:text-gray-300 mt-1">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button 
                          onClick={() => toggleExpanded(post.id)}
                          className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-4 hover:underline flex items-center space-x-1"
                        >
                          <FiChevronUp />
                          <span>Show less</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`${cardClasses} rounded-2xl max-w-2xl w-full shadow-2xl`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Create a New Post</h2>
              <button onClick={() => setShowNewPostModal(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiX />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Post Title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
                <textarea
                  placeholder="Share your thoughts... (be kind and supportive)"
                  rows="6"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  >
                    {forumCategories.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                  <select
                    value={newPost.mood}
                    onChange={(e) => setNewPost({ ...newPost, mood: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  >
                    <option value="">Select your mood (optional)</option>
                    {moodOptions.map(m => (
                      <option key={m.id} value={m.id}>{m.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNewPost}
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-base rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend />
                  <span>Post Anonymously</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
};

export default ForumPage;