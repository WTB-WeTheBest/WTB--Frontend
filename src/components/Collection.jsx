import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import LandmarkCard from './LandmarkCard';
import ActivityCard from './ActivityCard';
import collectionService from '../services/collectionService';

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, landmarks: 0, activities: 0 });
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  useEffect(() => {
    fetchCollections();
    fetchStats();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [collections, activeTab, searchQuery]);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const rawCollections = await collectionService.getCollections();
      const transformedCollections = rawCollections
        .map(collection => collectionService.transformCollectionData(collection))
        .filter(collection => collection !== null);
      
      setCollections(transformedCollections);
      setError(null);
    } catch (err) {
      console.error('Error fetching collections:', err);
      setError('Failed to load your collection. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await collectionService.getCollectionStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching collection stats:', err);
    }
  };

  const applyFilters = () => {
    let filtered = [...collections];

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.itemType === activeTab);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.province.toLowerCase().includes(query)
      );
    }

    setFilteredCollections(filtered);
  };

  const handleRemoveFromCollection = async (markerId) => {
    try {
      await collectionService.removeFromCollection(markerId);
      // Refresh collections and stats
      await fetchCollections();
      await fetchStats();
    } catch (error) {
      console.error('Error removing from collection:', error);
      alert('Failed to remove item from collection. Please try again.');
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  if (!collectionService.isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <HeartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your collection</h2>
          <p className="text-gray-600 mb-8">Save your favorite landmarks and activities by creating an account.</p>
          <Link 
            to="/login" 
            className="px-6 py-3 bg-[#2B5C4F] text-white rounded-lg hover:bg-[#1f4239] transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#2B5C4F] text-white py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center">
            <HeartSolidIcon className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4 font-inter">My Collection</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Your saved landmarks and activities for your perfect Indonesian adventure
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.total}</div>
                <div className="text-gray-200">Total Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.landmarks}</div>
                <div className="text-gray-200">Landmarks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.activities}</div>
                <div className="text-gray-200">Activities</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'bg-white text-[#2B5C4F] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setActiveTab('landmark')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'landmark'
                    ? 'bg-white text-[#2B5C4F] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Landmarks ({stats.landmarks})
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'activity'
                    ? 'bg-white text-[#2B5C4F] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Activities ({stats.activities})
              </button>
            </div>

            {/* Search */}
            <div className="flex gap-4 w-full sm:w-auto">
              <div className="flex-1 sm:w-80 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2B5C4F] focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2B5C4F]"></div>
            <p className="mt-4 text-gray-600">Loading your collection...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={fetchCollections}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <HeartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            {searchQuery ? (
              <>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search terms</p>
                <button
                  onClick={handleClearSearch}
                  className="px-6 py-2 bg-[#2B5C4F] text-white rounded-lg hover:bg-[#1f4239] transition-colors"
                >
                  Clear Search
                </button>
              </>
            ) : collections.length === 0 ? (
              <>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Your collection is empty</h3>
                <p className="text-gray-500 mb-4">Start exploring and save your favorite landmarks and activities</p>
                <div className="flex gap-4 justify-center">
                  <Link
                    to="/landmarks"
                    className="px-6 py-2 bg-[#2B5C4F] text-white rounded-lg hover:bg-[#1f4239] transition-colors"
                  >
                    Explore Landmarks
                  </Link>
                  <Link
                    to="/activities"
                    className="px-6 py-2 border border-[#2B5C4F] text-[#2B5C4F] rounded-lg hover:bg-[#2B5C4F] hover:text-white transition-colors"
                  >
                    Explore Activities
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No {activeTab === 'all' ? 'items' : activeTab + 's'} found</h3>
                <p className="text-gray-500 mb-4">You haven't saved any {activeTab === 'all' ? 'items' : activeTab + 's'} yet</p>
                <button
                  onClick={() => setActiveTab('all')}
                  className="px-6 py-2 bg-[#2B5C4F] text-white rounded-lg hover:bg-[#1f4239] transition-colors"
                >
                  View All Items
                </button>
              </>
            )}
          </div>
        )}

        {/* Collection Grid */}
        {!loading && !error && filteredCollections.length > 0 && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {searchQuery ? `Search Results (${filteredCollections.length})` : 
                 activeTab === 'all' ? `All Items (${filteredCollections.length})` :
                 `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s (${filteredCollections.length})`}
              </h2>
              {searchQuery && (
                <p className="text-gray-600">
                  Showing results for "{searchQuery}"
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCollections.map((item) => (
                <div key={item.id} className="relative">
                  <Link 
                    to={item.itemType === 'landmark' ? `/landmarks/details` : `/activities/details`}
                    onClick={() => {
                      // You might want to pass the item data to the details page
                      console.log('Navigate to details:', item);
                    }}
                  >
                    {item.itemType === 'landmark' ? (
                      <LandmarkCard landmark={item} />
                    ) : (
                      <ActivityCard activity={item} />
                    )}
                  </Link>
                  
                  {/* Remove from collection button */}
                  <button
                    onClick={() => handleRemoveFromCollection(item.markerId)}
                    className="absolute top-2 left-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 opacity-90 hover:opacity-100"
                    title="Remove from collection"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Collection date badge */}
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded-md">
                    Saved {new Date(item.savedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Collection;