import React from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const Landmark1 = () => {
  const historicalLandmarks = [
    {
      id: 1,
      name: "Masjid Agung An-Nur",
      location: "Pekanbaru, Riau",
      price: "Rp 2.705.000",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Istana Siak Sri Indrapura",
      location: "Siak, Riau",
      price: "Rp 1.200.000",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Museum Sang Nila Utama",
      location: "Pekanbaru, Riau",
      price: "Rp 605.000",
      image: "https://images.unsplash.com/photo-1533177172800-09d31ad38e45?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Desa Wisata Kandri",
      location: "Kota Semarang",
      price: "Rp 1.500.000",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
    }
  ];

  const trendingLandmarks = [
    {
      id: 1,
      name: "Pacu Jalur Festival",
      location: "Pekanbaru, Riau",
      price: "Rp 6.705.000",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Siak River Boat Tour",
      location: "Siak, Riau",
      price: "Rp 1.205.000",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Desa Wisata Kandri",
      location: "Kota Semarang",
      price: "Rp 1.400.000",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Desa Wisata Kandri",
      location: "Kota Semarang",
      price: "Rp 1.400.000",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
    }
  ];

  const recommendedLandmarks = [
    {
      id: 1,
      name: "Pacu Jalur Festival",
      location: "Pekanbaru, Riau",
      price: "Rp 6.705.000",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Siak River Boat Tour",
      location: "Siak, Riau",
      price: "Rp 1.205.000",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Desa Wisata Kandri",
      location: "Kota Semarang",
      price: "Rp 1.400.000",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Desa Wisata Kandri",
      location: "Kota Semarang",
      price: "Rp 1.400.000",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
    }
  ];

  const LandmarkCard = ({ landmark }) => (
    <div className="bg-[#DFDFDF] rounded-lg shadow-lg min-h-[320px]">
      <div className="p-4">
        <img
          src={landmark.image}
          alt={landmark.name}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
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

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #2B5C4F 0%, #2B5C4F 5%, rgba(43, 92, 79, 0.8) 10%, rgba(43, 92, 79, 0.4) 15%, white 85%)'
      }}
    >
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-[#2B5C4F]">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-yellow-300 font-inter">BudayaIn!</h1>
        </div>
        <div className="flex items-center space-x-8">
          <Link to="#" className="text-yellow-300 hover:text-yellow-200 font-medium font-inter">
            Maps
          </Link>
          <Link 
            to="/landmarks" 
            className="text-yellow-300 hover:text-yellow-200 font-medium font-inter"
        >
            Landmarks
          </Link>
          <Link to="#" className="text-yellow-300 hover:text-yellow-200 font-medium font-inter">
            Activities
          </Link>
        </div>
        <Link
          to="/login"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium transition-colors font-inter"
        >
          Log In
        </Link>
      </nav>

      {/* Main Content */}
      <div className="px-8 py-12 pt-32">
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for remarkable landmarks near you"
                className="w-full pl-12 pr-16 py-4 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2B5C4F] font-inter"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#2B5C4F] hover:bg-[#1f4239] text-white p-2 rounded-full transition-colors">
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Historical Landmark Section */}
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
            {historicalLandmarks.map((landmark) => (
              <LandmarkCard key={landmark.id} landmark={landmark} />
            ))}
          </div>
        </div>

        {/* Trending Now Section */}
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
            {trendingLandmarks.map((landmark) => (
              <LandmarkCard key={landmark.id} landmark={landmark} />
            ))}
          </div>
        </div>

        {/* Recommended by AI Section */}
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
            {recommendedLandmarks.map((landmark) => (
              <LandmarkCard key={landmark.id} landmark={landmark} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-[#2B5C4F] h-64 mt-16"></div>
    </div>
  );
};

export default Landmark1;