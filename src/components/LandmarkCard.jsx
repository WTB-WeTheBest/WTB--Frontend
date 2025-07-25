import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';

const LandmarkCard = ({ landmark }) => {
  return (
    <div className="bg-[#DFDFDF] rounded-lg shadow-lg min-h-[320px] cursor-pointer hover:shadow-xl transition-shadow">
      <div className="p-4">
        <div className="relative">
          <img
            src={landmark.image}
            alt={landmark.name}
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
          <div className="w-2 h-2 bg-[#2B5C4F] rounded-full mr-2"></div>
          <span className="text-xs text-[#2B5C4F] font-inter">{landmark.location}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 font-inter">
          {landmark.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 font-inter">
          Lorem Ipsum Sit Dolor.....
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#E2C97E] font-inter">
            {landmark.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandmarkCard;