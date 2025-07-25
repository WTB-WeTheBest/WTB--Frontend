import React, { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { MapPinIcon } from '@heroicons/react/24/solid';
import collectionService from '../services/collectionService';

const ActivityCard = ({ activity }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if activity is in collection when component mounts
    const checkStatus = async () => {
      if (collectionService.isAuthenticated() && activity.id) {
        try {
          const saved = await collectionService.checkCollectionStatus(activity.id);
          setIsSaved(saved);
        } catch (error) {
          console.error('Error checking collection status:', error);
        }
      }
    };

    checkStatus();
  }, [activity.id]);

  const handleHeartClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!collectionService.isAuthenticated()) {
      alert('Please log in to save activities to your collection.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await collectionService.toggleCollection(activity.id, 'activity');
      setIsSaved(result.is_saved);
    } catch (error) {
      console.error('Error toggling collection:', error);
      alert('Failed to update collection. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-[#F5F5F5] rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
      <div className="p-4">
        <div className="relative">
          <img
            src={activity.image}
            alt={activity.name}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
          <button 
            className={`absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 group ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={handleHeartClick}
            disabled={isLoading}
          >
            {isSaved ? (
              <HeartSolidIcon className="h-4 w-4 text-red-500 transition-colors duration-200" />
            ) : (
              <HeartIcon className="h-4 w-4 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
            )}
          </button>
        </div>
        <div className="flex items-center mb-2">
          <MapPinIcon className="w-3 h-3 text-[#2B5C4F] mr-2" />
          <span className="text-xs text-[#2B5C4F] font-inter">{activity.location}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 font-inter">
          {activity.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 font-inter line-clamp-2">
          {activity.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#E2C97E] font-inter">
            {activity.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;