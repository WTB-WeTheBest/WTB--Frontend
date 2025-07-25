import React from 'react';
import { Link } from 'react-router-dom';
import LandmarkCard from './LandmarkCard';
import ActivityCard from './ActivityCard';

const LandingPage = () => {
  const landmarks = [
    {
      id: 1,
      name: "Masjid Agung An-Nur",
      location: "Lombok Barat, NTB",
      price: "Rp 2.705.000",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Istana Siak Sri Indrapura",
      location: "Lombok Barat, Sri Riau",
      price: "Rp 1.200.000",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Museum Sang Nila Utama",
      location: "",
      price: "Rp 405.000",
      image: "https://images.unsplash.com/photo-1533177172800-09d31ad38e45?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Desa Wisata Kandri",
      location: "Jawa Tengah, Sfi, Sehti",
      price: "Rp 1.500.000",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
    }
  ];

  const activities = [
    {
      id: 1,
      name: "Pacu Jalur Festival",
      location: "Lorem Ipsum Sit Dolor...",
      price: "Rp 9.750.000",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Siak River Boat Tour",
      location: "Lorem Ipsum Sit Dolor...",
      price: "Rp 1.500.000",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Desa Wisata Kandri",
      location: "Lorem Ipsum Sit Dolor...",
      price: "Rp 1.500.000",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Desa Wisata Kandri",
      location: "Lorem Ipsum Sit Dolor...",
      price: "Rp 1.500.000",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
    }
  ];

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #2B5C4F 0%, #2B5C4F 5%, rgba(43, 92, 79, 0.8) 10%, rgba(43, 92, 79, 0.4) 15%, #EDE4D3 85%)'
      }}
    >
        <div className="px-8 py-12 pt-32">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Discover Indonesia Like Never Before
            </h1>
            <p className="text-xl text-gray-200">
              From iconic landmarks to unforgettable local experiences — all just around the corner.
            </p>
          </div>

        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0531220356393!2d106.61572797453162!3d-6.256732661256703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb56b25975f9%3A0x50c7d605ba8542f5!2sMultimedia%20Nusantara%20University!5e0!3m2!1sen!2sid!4v1753399934984!5m2!1sen!2sid"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
              <button 
                onClick={() => console.log('View larger map clicked')}
                className="absolute top-4 right-4 bg-white hover:bg-blue-600 text-blue-600 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                View larger map
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 font-inter">
              Historical landmark recommended for you
            </h2>
            <p className="text-gray-600 font-inter">
              Vacations to make your experience enjoyable in Indonesia!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {landmarks.map((landmark) => (
              <Link to="/landmarks/details" key={landmark.id} className="cursor-pointer">
                <LandmarkCard landmark={landmark} />
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 font-inter">
              Activities recommended for you
            </h2>
            <p className="text-gray-600 font-inter">
              Vacations to make your experience enjoyable in Indonesia!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity) => (
              <Link to="/activities/details" key={activity.id} className="cursor-pointer">
                <ActivityCard activity={activity} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
