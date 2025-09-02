import React, { useState } from 'react';
import { FiPlay, FiDownload, FiBookOpen, FiHeadphones, FiVideo, FiFileText, FiSearch, FiFilter } from 'react-icons/fi';

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Resources', icon: FiBookOpen },
    { id: 'videos', label: 'Videos', icon: FiVideo },
    { id: 'audio', label: 'Audio Guides', icon: FiHeadphones },
    { id: 'articles', label: 'Articles', icon: FiFileText },
    { id: 'exercises', label: 'Exercises', icon: FiPlay }
  ];

  const resources = [
    {
      id: 1,
      title: 'Understanding Anxiety: A Student\'s Guide',
      type: 'video',
      category: 'videos',
      duration: '15 min',
      language: 'English',
      description: 'Learn about anxiety symptoms, causes, and effective coping strategies specifically for college students.',
      thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Anxiety+Guide',
      tags: ['anxiety', 'coping', 'student-life']
    },
    {
      id: 2,
      title: 'Progressive Muscle Relaxation',
      type: 'audio',
      category: 'audio',
      duration: '20 min',
      language: 'Hindi',
      description: 'Guided audio session to help you relax your body and mind through progressive muscle relaxation.',
      thumbnail: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Relaxation',
      tags: ['relaxation', 'stress-relief', 'mindfulness']
    },
    {
      id: 3,
      title: 'Managing Academic Stress',
      type: 'article',
      category: 'articles',
      duration: '8 min read',
      language: 'English',
      description: 'Practical strategies for handling exam pressure, deadlines, and academic expectations.',
      thumbnail: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Academic+Stress',
      tags: ['stress', 'academics', 'time-management']
    },
    {
      id: 4,
      title: '4-7-8 Breathing Exercise',
      type: 'exercise',
      category: 'exercises',
      duration: '5 min',
      language: 'Regional',
      description: 'Simple but effective breathing technique to quickly reduce anxiety and promote relaxation.',
      thumbnail: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Breathing',
      tags: ['breathing', 'quick-relief', 'anxiety']
    },
    {
      id: 5,
      title: 'Sleep Hygiene for Students',
      type: 'video',
      category: 'videos',
      duration: '12 min',
      language: 'English',
      description: 'Essential tips for better sleep quality and establishing healthy sleep routines in college.',
      thumbnail: 'https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=Sleep+Tips',
      tags: ['sleep', 'health', 'routine']
    },
    {
      id: 6,
      title: 'Mindfulness Meditation',
      type: 'audio',
      category: 'audio',
      duration: '15 min',
      language: 'Hindi',
      description: 'Guided mindfulness meditation to help you stay present and reduce overwhelming thoughts.',
      thumbnail: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Meditation',
      tags: ['mindfulness', 'meditation', 'present-moment']
    },
    {
      id: 7,
      title: 'Building Social Connections',
      type: 'article',
      category: 'articles',
      duration: '10 min read',
      language: 'English',
      description: 'Overcome social anxiety and build meaningful friendships during your college years.',
      thumbnail: 'https://via.placeholder.com/300x200/84CC16/FFFFFF?text=Social+Skills',
      tags: ['social-anxiety', 'friendship', 'communication']
    },
    {
      id: 8,
      title: 'Gratitude Journaling',
      type: 'exercise',
      category: 'exercises',
      duration: '10 min',
      language: 'Regional',
      description: 'Learn how to practice gratitude journaling to improve mood and perspective.',
      thumbnail: 'https://via.placeholder.com/300x200/A855F7/FFFFFF?text=Gratitude',
      tags: ['gratitude', 'journaling', 'positivity']
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
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
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-600';
      case 'audio': return 'bg-green-100 text-green-600';
      case 'article': return 'bg-purple-100 text-purple-600';
      case 'exercise': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mental Health Resource Hub</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="text-lg" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type);
          return (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(resource.type)}`}>
                  <div className="flex items-center space-x-1">
                    <TypeIcon className="text-sm" />
                    <span className="capitalize">{resource.type}</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs">
                  {resource.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{resource.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Language: {resource.language}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <FiPlay className="mr-2" />
                    {resource.type === 'article' ? 'Read' : resource.type === 'audio' ? 'Listen' : 'Watch'}
                  </button>
                  
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    <FiDownload />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiBookOpen className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Resources Found</h3>
          <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
        </div>
      )}

        {/* Emergency Resources */}
        <div className="mt-16 bg-red-50 border border-red-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Emergency Resources</h2>
          <p className="text-red-700 mb-6">
            If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out immediately:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="tel:988"
              className="flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              Crisis Lifeline: 988
            </a>
            
            <a
              href="tel:911"
              className="flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              Emergency: 911
            </a>
            
            <a
              href="/chatbot"
              className="flex items-center justify-center px-6 py-3 border-2 border-red-600 text-red-600 font-medium rounded-md hover:bg-red-50 transition-colors"
            >
              Chat Support Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;