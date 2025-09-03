import React, { useState, useEffect } from 'react';
import { 
  FiPlay, FiDownload, FiBookOpen, FiHeadphones, FiVideo, FiFileText, FiSearch, FiFilter,
  FiHeart, FiStar, FiClock, FiGlobe, FiMoon, FiSun, FiVolume2, FiBookmark, FiChevronDown,
  FiMessageCircle, FiPhone, FiAlertTriangle, FiSettings, FiUser, FiMenu, FiX
} from 'react-icons/fi';

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedResources, setSavedResources] = useState(new Set());
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(null);

  const categories = [
    { id: 'all', label: 'All Resources', icon: FiBookOpen },
    { id: 'videos', label: 'Videos', icon: FiVideo },
    { id: 'audio', label: 'Audio Guides', icon: FiHeadphones },
    { id: 'articles', label: 'Articles', icon: FiFileText },
    { id: 'exercises', label: 'Exercises', icon: FiPlay }
  ];

  const languages = ['all', 'English', 'Hindi', 'Regional'];

  const resources = [
    {
      id: 1,
      title: 'Understanding Anxiety: A Student\'s Guide',
      type: 'video',
      category: 'videos',
      duration: '15 min',
      language: 'English',
      rating: 4.8,
      views: '12.3k',
      description: 'Learn about anxiety symptoms, causes, and effective coping strategies specifically for college students.',
      thumbnail: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop',
      tags: ['anxiety', 'coping', 'student-life'],
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Progressive Muscle Relaxation',
      type: 'audio',
      category: 'audio',
      duration: '20 min',
      language: 'Hindi',
      rating: 4.9,
      views: '8.7k',
      description: 'Guided audio session to help you relax your body and mind through progressive muscle relaxation.',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      tags: ['relaxation', 'stress-relief', 'mindfulness'],
      difficulty: 'Beginner'
    },
    {
      id: 3,
      title: 'Managing Academic Stress',
      type: 'article',
      category: 'articles',
      duration: '8 min read',
      language: 'English',
      rating: 4.7,
      views: '15.2k',
      description: 'Practical strategies for handling exam pressure, deadlines, and academic expectations.',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
      tags: ['stress', 'academics', 'time-management'],
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      title: '4-7-8 Breathing Exercise',
      type: 'exercise',
      category: 'exercises',
      duration: '5 min',
      language: 'Regional',
      rating: 4.9,
      views: '9.1k',
      description: 'Simple but effective breathing technique to quickly reduce anxiety and promote relaxation.',
      thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=250&fit=crop',
      tags: ['breathing', 'quick-relief', 'anxiety'],
      difficulty: 'Beginner'
    },
    {
      id: 5,
      title: 'Sleep Hygiene for Students',
      type: 'video',
      category: 'videos',
      duration: '12 min',
      language: 'English',
      rating: 4.6,
      views: '7.8k',
      description: 'Essential tips for better sleep quality and establishing healthy sleep routines in college.',
      thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=250&fit=crop',
      tags: ['sleep', 'health', 'routine'],
      difficulty: 'Beginner'
    },
    {
      id: 6,
      title: 'Mindfulness Meditation',
      type: 'audio',
      category: 'audio',
      duration: '15 min',
      language: 'Hindi',
      rating: 4.8,
      views: '11.5k',
      description: 'Guided mindfulness meditation to help you stay present and reduce overwhelming thoughts.',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      tags: ['mindfulness', 'meditation', 'present-moment'],
      difficulty: 'Beginner'
    },
    {
      id: 7,
      title: 'Building Social Connections',
      type: 'article',
      category: 'articles',
      duration: '10 min read',
      language: 'English',
      rating: 4.5,
      views: '6.3k',
      description: 'Overcome social anxiety and build meaningful friendships during your college years.',
      thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop',
      tags: ['social-anxiety', 'friendship', 'communication'],
      difficulty: 'Intermediate'
    },
    {
      id: 8,
      title: 'Gratitude Journaling',
      type: 'exercise',
      category: 'exercises',
      duration: '10 min',
      language: 'Regional',
      rating: 4.7,
      views: '5.9k',
      description: 'Learn how to practice gratitude journaling to improve mood and perspective.',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
      tags: ['gratitude', 'journaling', 'positivity'],
      difficulty: 'Beginner'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesLanguage && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return FiVideo;
      case 'audio': return FiHeadphones;
      case 'article': return FiFileText;
      case 'exercise': return FiPlay;
      default: return FiBookOpen;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      video: darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600',
      audio: darkMode ? 'bg-green-900 text-green-300' : 'bg-green-50 text-green-600',
      article: darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-50 text-purple-600',
      exercise: darkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-50 text-orange-600'
    };
    return colors[type] || (darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-600');
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700',
      'Intermediate': darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700',
      'Advanced': darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700'
    };
    return colors[difficulty] || (darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700');
  };

  const toggleSaved = (id) => {
    const newSaved = new Set(savedResources);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedResources(newSaved);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  };

  const themeClasses = `
    ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'}
    ${highContrast ? 'contrast-more' : ''}
    ${getFontSizeClass()}
    transition-all duration-300 ease-in-out
  `;

  const cardClasses = darkMode 
    ? 'bg-gray-800 border border-gray-700' 
    : 'bg-white/80 backdrop-blur-sm border border-white/50';

  const PreviewModal = ({ resource, onClose }) => {
    if (!resource) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className={`${cardClasses} rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{resource.title}</h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>
          
          <img 
            src={resource.thumbnail} 
            alt={resource.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          
          <div className="space-y-4">
            <p className="text-base text-gray-700 dark:text-gray-300">{resource.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center space-x-1">
                <FiClock className="text-blue-500" />
                <span>{resource.duration}</span>
              </span>
              <span className="flex items-center space-x-1">
                <FiStar className="text-yellow-500" />
                <span>{resource.rating}</span>
              </span>
              <span className="flex items-center space-x-1">
                <FiGlobe className="text-purple-500" />
                <span>{resource.language}</span>
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-lg transition-all duration-200 transform hover:scale-105">
                <FiPlay className="mr-2" />
                Start {resource.type === 'article' ? 'Reading' : resource.type === 'audio' ? 'Listening' : 'Watching'}
              </button>
              <button 
                onClick={() => toggleSaved(resource.id)}
                className={`p-3 rounded-lg transition-all duration-200 text-base ${
                  savedResources.has(resource.id) 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FiBookmark className={savedResources.has(resource.id) ? 'fill-current' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Mental Health Resource Hub</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Access a comprehensive collection of videos, audio guides, articles, and exercises 
          designed to support your mental wellness journey.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>

            {/* Language Filter */}
            <div className="relative">
              <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer text-base"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === 'all' ? 'All Languages' : lang}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Advanced Filters Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-base"
            >
              <FiFilter />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {isFilterOpen && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Duration</label>
                  <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-base">
                    <option>Any Duration</option>
                    <option>Under 10 minutes</option>
                    <option>10-20 minutes</option>
                    <option>Over 20 minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Difficulty</label>
                  <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-base">
                    <option>Any Level</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Rating</label>
                  <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-base">
                    <option>Any Rating</option>
                    <option>4.5+ Stars</option>
                    <option>4.0+ Stars</option>
                    <option>3.5+ Stars</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-3 min-w-max pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200 whitespace-nowrap transform hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : `${cardClasses} hover:shadow-md`
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className="text-lg" />
                  <span>{category.label}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 opacity-75">
                    ({resources.filter(r => category.id === 'all' || r.category === category.id).length})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-base text-gray-700 dark:text-gray-300">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
          {savedResources.size > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1">
              <FiBookmark />
              <span>{savedResources.size} saved</span>
            </p>
          )}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            const isSaved = savedResources.has(resource.id);
            
            return (
              <div
                key={resource.id}
                className={`${cardClasses} rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group`}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setShowPreview(resource)}
                      className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium"
                    >
                      Quick Preview
                    </button>
                  </div>

                  {/* Type Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-medium ${getTypeColor(resource.type)} backdrop-blur-sm`}>
                    <div className="flex items-center space-x-1">
                      <TypeIcon className="text-sm" />
                      <span className="capitalize">{resource.type}</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs backdrop-blur-sm">
                    {resource.duration}
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={() => toggleSaved(resource.id)}
                    className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                      isSaved 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                    }`}
                    aria-label={isSaved ? 'Remove from saved' : 'Save resource'}
                  >
                    <FiBookmark className={isSaved ? 'fill-current' : ''} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 flex-1">
                      {resource.title}
                    </h3>
                  </div>
                  
                  <p className="text-base text-gray-700 dark:text-gray-400 mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1 text-yellow-500">
                        <FiStar />
                        <span>{resource.rating}</span>
                      </span>
                      <span>
                        {resource.views} views
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full font-semibold ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <FiGlobe />
                      <span>{resource.language}</span>
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {resource.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-500 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                        onClick={() => setSearchTerm(tag)}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setShowPreview(resource)}
                      className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-base font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <FiPlay className="mr-2" />
                      {resource.type === 'article' ? 'Read' : resource.type === 'audio' ? 'Listen' : resource.type === 'exercise' ? 'Practice' : 'Watch'}
                    </button>
                    
                    <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-base rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105">
                      <FiDownload />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiBookOpen className="text-blue-500 dark:text-blue-400 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">No Resources Found</h3>
            <p className="text-base text-gray-700 dark:text-gray-500 mb-6 max-w-md mx-auto">
              We couldn't find any resources matching your criteria. Try adjusting your search terms or category filter.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLanguage('all');
              }}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Motivational Section */}
        <div className={`${cardClasses} rounded-xl p-8 mt-12 text-center shadow-lg`}>
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiHeart className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              You're Taking a Positive Step
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-400 mb-6">
              Remember, seeking support is a sign of strength. Every small step you take towards 
              better mental health matters. You're not alone in this journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white text-base font-semibold rounded-lg transition-all duration-200 transform hover:scale-105">
                <FiMessageCircle />
                <span>Talk to Someone</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 border-2 border-purple-500 text-purple-600 dark:text-purple-400 text-base font-semibold rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 transform hover:scale-105">
                <FiBookmark />
                <span>View Saved ({savedResources.size})</span>
              </button>
            </div>
          </div>
        </div>

      {/* Emergency Resources */}
      <div className="mt-16 bg-red-50 border border-red-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-red-800 mb-4">Emergency Resources</h2>
        <p className="text-base text-red-700 mb-6">
          If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out immediately:
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a
            href="tel:988"
            className="flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors text-base"
          >
            Crisis Lifeline: 988
          </a>
          
          <a
            href="tel:911"
            className="flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors text-base"
          >
            Emergency: 911
          </a>
          
          <a
            href="/chatbot"
            className="flex items-center justify-center px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-md hover:bg-red-50 transition-colors text-base"
          >
            Chat Support Now
          </a>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal resource={showPreview} onClose={() => setShowPreview(null)} />
    </div>
  );
};

export default ResourcesPage;