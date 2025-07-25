import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext.jsx';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-[#2B5C4F]">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-yellow-300">
          <Link to="/" className="cursor-pointer">BudayaIn!</Link>
        </h1>
      </div>
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-yellow-300 hover:text-yellow-200 font-medium cursor-pointer">
          Maps
        </Link>
        <Link to="/landmarks" className="text-yellow-300 hover:text-yellow-200 font-medium cursor-pointer">
          Landmarks
        </Link>
        <Link to="/activities" className="text-yellow-300 hover:text-yellow-200 font-medium cursor-pointer">
          Activities
        </Link>
      </div>
      
      {/* Conditional rendering based on authentication status */}
      {isAuthenticated ? (
        /* Authenticated User Dropdown */
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center space-x-2"
          >
            <span>{user?.username || 'Profile'}</span>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/collections"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              >
                Collections
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Guest Login Button */
        <Link
          to="/login"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer"
        >
          Log In
        </Link>
      )}
    </nav>
  );
};

export default Navbar;