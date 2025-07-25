import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

const FolkloreCard = ({ folklore }) => {
  return (
    <div className="bg-[#F5F5F5] rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow min-h-[320px]">
      <div className="p-4">
        <div className="relative">
          <img
            src={folklore.image}
            alt={folklore.name}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
        </div>
        <div className="flex items-center mb-2">
          <MapPinIcon className="w-3 h-3 text-[#2B5C4F] mr-2" />
          <span className="text-xs text-[#2B5C4F] font-inter">{folklore.location}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 font-inter text-sm leading-tight">
          {folklore.name}
        </h3>
        <p className="text-xs text-gray-600 mb-2 font-inter leading-relaxed">
          {folklore.description || "When you follow your heart and explore the unknown, you may encounter beauty and knowledge beyond what you ever imagined."}
        </p>
      </div>
    </div>
  );
};

export default FolkloreCard;