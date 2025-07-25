import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import ActivityCard from './ActivityCard';
import landmarkService from '../services/landmarkService';

const Activities1 = () => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['Cultural Events', 'Religious Activities', 'Traditional Arts', 'Educational Tours'];
  const priceRanges = ['Under Rp 500.000', 'Rp 500.000 - 1.000.000', 'Rp 1.000.000 - 2.000.000', 'Above Rp 2.000.000'];

  // Fetch activities from API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const rawActivities = await landmarkService.getActivities();
        const transformedActivities = rawActivities
          .map(activity => landmarkService.transformActivityData(activity))
          .filter(activity => activity !== null);
        setActivities(transformedActivities);
        setError(null);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('Failed to load activities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Helper function to get activities for each section
  const getDisplayActivities = (section = 'all') => {
    if (activities.length === 0) return [];
    
    // For demo purposes, we'll distribute activities into different sections
    // In a real app, you might have different endpoints or categorization
    const shuffled = [...activities].sort(() => 0.5 - Math.random());
    
    switch (section) {
      case 'nearest':
        return shuffled.slice(0, 4);
      case 'trending':
        return shuffled.slice(4, 8).length > 0 ? shuffled.slice(4, 8) : shuffled.slice(0, 4);
      case 'recommended':
        return shuffled.slice(8, 12).length > 0 ? shuffled.slice(8, 12) : shuffled.slice(0, 4);
      default:
        return shuffled;
    }
  };


  return (
    <div
    style={{
        background: 'linear-gradient(to bottom, #2B5C4F 0%, #2B5C4F 5%, rgba(43, 92, 79, 0.8) 10%, rgba(43, 92, 79, 0.4) 15%, #EDE4D3 85%)'
      }}
    >
      {/* Hero Section with Background Image */}
      <div 
      >
        <div className="relative px-8 py-20 pt-40">
          {/* Header and Search Section */}
          <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Activities
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12">
            Immerse yourself in authentic Indonesian cultural experiences and traditional activities that bring our heritage to life
          </p>
          
          <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
              <input
                type="text"
                placeholder="Search for exciting experiences near you"
                className="w-full pl-12 pr-16 py-4 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2B5C4F] font-inter"
              />
              <button 
                onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#2B5C4F] hover:bg-[#1f4239] text-white p-2 rounded-full transition-colors cursor-pointer"
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
              </button>
            </div>
            
            {/* Expanded Filters */}
            {isFiltersExpanded && (
              <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2B5C4F] focus:border-transparent appearance-none font-inter cursor-pointer"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                      Price Range
                    </label>
                    <div className="relative">
                      <select
                        value={selectedPriceRange}
                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                        className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2B5C4F] focus:border-transparent appearance-none font-inter cursor-pointer"
                      >
                        <option value="">Select Price Range</option>
                        {priceRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Apply/Clear Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setSelectedPriceRange('');
                    }}
                    className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors font-inter cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setIsFiltersExpanded(false)}
                    className="px-6 py-2 bg-[#2B5C4F] hover:bg-[#1f4239] text-white rounded-lg font-medium transition-colors font-inter cursor-pointer"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>

      {/* Content Section with Gradient Background */}
      <div 
        className="px-8 py-12"
      >
        {/* Loading State */}
        {loading && (
          <div className="max-w-6xl mx-auto mb-16 text-center">
            <div className="py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2B5C4F]"></div>
              <p className="mt-4 text-gray-600">Loading activities...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-6xl mx-auto mb-16 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Nearest Activities Section */}
        {!loading && !error && (
          <div className="max-w-6xl mx-auto mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 font-inter">
                Nearest Activities around you
              </h2>
              <p className="text-gray-600 font-inter">
                Vacations to make your experience enjoyable in Indonesia!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getDisplayActivities('nearest').map((activity) => (
                <Link to="/activities/details" key={activity.id} className="cursor-pointer">
                  <ActivityCard activity={activity} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Trending Now Section */}
        {!loading && !error && (
          <div className="max-w-6xl mx-auto mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 font-inter">
                Trending now
              </h2>
              <p className="text-gray-600 font-inter">
                Vacations to make your experience enjoyable in Indonesia!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getDisplayActivities('trending').map((activity) => (
                <Link to="/activities/details" key={activity.id} className="cursor-pointer">
                  <ActivityCard activity={activity} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recommended by AI Section */}
        {!loading && !error && (
          <div className="max-w-6xl mx-auto mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 font-inter">
                Recommended for you by AI
              </h2>
              <p className="text-gray-600 font-inter">
                Vacations to make your experience enjoyable in Indonesia!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getDisplayActivities('recommended').map((activity) => (
                <Link to="/activities/details" key={activity.id} className="cursor-pointer">
                  <ActivityCard activity={activity} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

    </div>
  );
};

export default Activities1;