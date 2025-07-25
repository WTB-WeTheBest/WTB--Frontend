import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import LandmarkCard from './LandmarkCard';
import landmarkService from '../services/landmarkService';

const Landmark1 = () => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [landmarks, setLandmarks] = useState([]);
  const [filteredLandmarks, setFilteredLandmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [submittedFilters, setSubmittedFilters] = useState({ category: '', priceRange: '' });
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);

  const categories = ['Historical Sites', 'Museums', 'Religious Sites', 'Cultural Sites'];
  const priceRanges = ['Under Rp 500.000', 'Rp 500.000 - 1.000.000', 'Rp 1.000.000 - 2.000.000', 'Above Rp 2.000.000'];

  // Fetch landmarks from API
  useEffect(() => {
    const fetchLandmarks = async () => {
      try {
        setLoading(true);
        const rawLandmarks = await landmarkService.getLandmarks();
        const transformedLandmarks = rawLandmarks
          .map(landmark => landmarkService.transformLandmarkData(landmark))
          .filter(landmark => landmark !== null);
        setLandmarks(transformedLandmarks);
        setFilteredLandmarks(transformedLandmarks);
        setError(null);
      } catch (err) {
        console.error('Error fetching landmarks:', err);
        setError('Failed to load landmarks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLandmarks();
  }, []);

  // Apply search and filters when landmarks, submittedQuery, or submittedFilters change
  useEffect(() => {
    const filtered = landmarkService.searchAndFilterLandmarks(landmarks, submittedQuery, submittedFilters);
    setFilteredLandmarks(filtered);
    setIsSearchActive(submittedQuery.trim() !== '' || submittedFilters.category !== '' || submittedFilters.priceRange !== '');
    setCurrentPage(1); // Reset to first page when search/filter changes
  }, [landmarks, submittedQuery, submittedFilters]);

  // Helper function to get landmarks for each section
  const getDisplayLandmarks = (section = 'all') => {
    const dataToUse = isSearchActive ? filteredLandmarks : landmarks;
    
    if (dataToUse.length === 0) return [];
    
    // If search/filter is active, return paginated results
    if (isSearchActive) {
      const startIndex = (currentPage - 1) * resultsPerPage;
      const endIndex = startIndex + resultsPerPage;
      return dataToUse.slice(startIndex, endIndex);
    }
    
    // For demo purposes, we'll distribute landmarks into different sections
    // In a real app, you might have different endpoints or categorization
    const shuffled = [...dataToUse].sort(() => 0.5 - Math.random());
    
    switch (section) {
      case 'historical':
        return shuffled.slice(0, 4);
      case 'trending':
        return shuffled.slice(4, 8).length > 0 ? shuffled.slice(4, 8) : shuffled.slice(0, 4);
      case 'recommended':
        return shuffled.slice(8, 12).length > 0 ? shuffled.slice(8, 12) : shuffled.slice(0, 4);
      default:
        return shuffled;
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery);
    setSubmittedFilters({
      category: selectedCategory,
      priceRange: selectedPriceRange
    });
  };

  // Handle search on Enter key
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSubmittedQuery(searchQuery);
      setSubmittedFilters({
        category: selectedCategory,
        priceRange: selectedPriceRange
      });
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSubmittedQuery('');
    setSelectedCategory('');
    setSelectedPriceRange('');
    setSubmittedFilters({ category: '', priceRange: '' });
    setIsFiltersExpanded(false);
    setCurrentPage(1);
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    setIsFiltersExpanded(false);
    setSubmittedQuery(searchQuery); // Apply current search query
    setSubmittedFilters({
      category: selectedCategory,
      priceRange: selectedPriceRange
    });
  };

  // Pagination helpers
  const totalPages = Math.ceil(filteredLandmarks.length / resultsPerPage);
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, filteredLandmarks.length);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startResult}</span> to{' '}
              <span className="font-medium">{endResult}</span> of{' '}
              <span className="font-medium">{filteredLandmarks.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              {getVisiblePages().map((page, index) => (
                page === '...' ? (
                  <span key={index} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      page === currentPage
                        ? 'z-10 bg-[#2B5C4F] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B5C4F]'
                        : 'text-gray-900'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  // Search header component (for search results page)
  const SearchHeader = () => (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search for remarkable landmarks near you"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2B5C4F] focus:border-transparent font-inter"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#2B5C4F] text-white rounded-lg hover:bg-[#1f4239] transition-colors font-inter"
          >
            Search
          </button>
          <button 
            type="button"
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>
        </form>

        {/* Expanded Filters */}
        {isFiltersExpanded && (
          <div className="mt-4 bg-gray-50 rounded-lg p-6">
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
                onClick={handleClearFilters}
                className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors font-inter cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-6 py-2 bg-[#2B5C4F] hover:bg-[#1f4239] text-white rounded-lg font-medium transition-colors font-inter cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {/* Conditional Layout: Search Results vs Normal View */}
      {isSearchActive ? (
        // Search Results Layout
        <div className="min-h-screen bg-gray-50">
          <SearchHeader />
          
          <div className="max-w-6xl mx-auto px-8 py-8">
            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2B5C4F]"></div>
                <p className="mt-4 text-gray-600">Loading landmarks...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center">
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

            {/* Search Results Section */}
            {!loading && !error && (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2 font-inter">
                    Search Results
                    {submittedQuery && <span className="text-lg font-normal text-gray-600"> for "{submittedQuery}"</span>}
                  </h2>
                  <p className="text-gray-600 font-inter">
                    Found {filteredLandmarks.length} landmark{filteredLandmarks.length !== 1 ? 's' : ''}
                    {(submittedFilters.category || submittedFilters.priceRange) && (
                      <span>
                        {' '}matching your filters
                        {submittedFilters.category && <span className="ml-2 px-2 py-1 bg-[#2B5C4F] text-white text-xs rounded-full">{submittedFilters.category}</span>}
                        {submittedFilters.priceRange && <span className="ml-2 px-2 py-1 bg-[#2B5C4F] text-white text-xs rounded-full">{submittedFilters.priceRange}</span>}
                      </span>
                    )}
                  </p>
                </div>
                
                {filteredLandmarks.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      {getDisplayLandmarks('all').map((landmark) => (
                        <Link to={`/landmarks/${landmark.name}`} key={landmark.id}>
                          <LandmarkCard landmark={landmark} />
                        </Link>
                      ))}
                    </div>
                    
                    {/* Pagination */}
                    <Pagination />
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <MagnifyingGlassIcon className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No landmarks found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
                    <button
                      onClick={handleClearFilters}
                      className="px-6 py-2 bg-[#2B5C4F] text-white rounded-lg hover:bg-[#1f4239] transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        // Normal Layout
        <div 
          style={{
            background: 'linear-gradient(to bottom, #2B5C4F 0%, #2B5C4F 5%, rgba(43, 92, 79, 0.8) 10%, rgba(43, 92, 79, 0.4) 15%, #EDE4D3 85%)'
          }}
        >
          {/* Hero Section with Background Image */}
          <div className="relative px-8 py-20 pt-40">
            {/* Header and Search Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-4">
                Landmarks
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12">
                Discover Indonesia's most remarkable landmarks and uncover the stories behind these magnificent places
              </p>
              
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search for remarkable landmarks near you"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleSearch}
                      className="w-full pl-12 pr-16 py-4 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2B5C4F] font-inter"
                    />
                    <button 
                      type="button"
                      onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#2B5C4F] hover:bg-[#1f4239] text-white p-2 rounded-full transition-colors cursor-pointer"
                    >
                      <AdjustmentsHorizontalIcon className="h-5 w-5" />
                    </button>
                  </form>
                  
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
                          type="button"
                          onClick={handleClearFilters}
                          className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors font-inter cursor-pointer"
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          onClick={handleApplyFilters}
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
          <div className="px-8 py-12">
            {/* Loading State */}
            {loading && (
              <div className="max-w-6xl mx-auto mb-16 text-center">
                <div className="py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#2B5C4F]"></div>
                  <p className="mt-4 text-gray-600">Loading landmarks...</p>
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

            {/* Historical Landmark Section */}
            {!loading && !error && (
              <div className="max-w-6xl mx-auto mb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2 font-inter">
                    Historical landmark near you
                  </h2>
                  <p className="text-gray-600 font-inter">
                    Vacations to make your experience enjoyable in Indonesia!
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {getDisplayLandmarks('historical').map((landmark) => (
                    <Link to={`/landmarks/${landmark.name}`} key={landmark.id}>
                      <LandmarkCard landmark={landmark} />
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
                  {getDisplayLandmarks('trending').map((landmark) => (
                    <Link to={`/landmarks/${landmark.name}`} key={landmark.id}>
                      <LandmarkCard landmark={landmark} />
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
                  {getDisplayLandmarks('recommended').map((landmark) => (
                    <Link to={`/landmarks/${landmark.name}`} key={landmark.id}>
                      <LandmarkCard landmark={landmark} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Landmark1;
