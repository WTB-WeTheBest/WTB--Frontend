import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/solid';

const ActivityCard = ({ activity }) => {
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
            className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 group"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle heart click logic here
            }}
          >
            <HeartIcon className="h-4 w-4 text-gray-600 group-hover:text-red-500 group-hover:fill-red-500 transition-colors duration-200" />
          </button>
        </div>
        <div className="flex items-center mb-2">
          <MapPinIcon className="w-3 h-3 text-[#2B5C4F] mr-2" />
          <span className="text-xs text-[#2B5C4F] font-inter">{activity.location}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 font-inter">
          {activity.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 font-inter">
          Lorem Ipsum Sit Dolor.....
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