import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import landmarkService from '../services/landmarkService';

const LandmarkDetails = () => {
  const { slug } = useParams();
  const [landmark, setLandmark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchLandmarkDetails = async () => {
      try {
        setLoading(true);
        const landmarks = await landmarkService.getLandmarks();
        const foundLandmark = landmarks.find(l => l.marker.name === slug);
        if (foundLandmark) {
          setLandmark(landmarkService.transformLandmarkData(foundLandmark));
        } else {
          setError('Landmark not found');
        }
      } catch (err) {
        setError('Failed to fetch landmark details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLandmarkDetails();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!landmark) {
    return <div>Landmark not found.</div>;
  }

  const tabContent = {
    about: {
      title: `About ${landmark.name}`,
      content: (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>{landmark.description}</p>
        </div>
      )
    },
    legend: {
      title: `Legend of ${landmark.name}`,
      content: (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>{landmark.story || 'No legend available for this landmark.'}</p>
        </div>
      )
    },
    contacts: {
      title: "Contact Information",
      content: (
        <div className="space-y-6 text-gray-700">
          <p>Contact: {landmark.contact}</p>
          <p>Website: <a href={landmark.url} target="_blank" rel="noopener noreferrer">{landmark.url}</a></p>
        </div>
      )
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #2B5C4F 0%, #2B5C4F 8%, rgba(43, 92, 79, 0.9) 15%, rgba(43, 92, 79, 0.7) 25%, rgba(43, 92, 79, 0.5) 35%, rgba(120, 140, 120, 0.4) 50%, rgba(180, 180, 160, 0.3) 65%, rgba(220, 210, 190, 0.2) 75%, #EDE4D3 100%)'
      }}
    >

      {/* Main Content */}
      <div className="px-8 py-12 pt-32">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-200 mb-2">{landmark.name}</h1>
            <div className="flex items-center text-gray-300">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{landmark.location}</span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            {/* Large Image */}
            <div className="lg:col-span-2">
              <img
                src={landmark.image}
                alt={`${landmark.name} Main View`}
                className="w-full h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            {/* Small Images */}
            <div className="grid grid-rows-2 gap-4">
              <img
                src={landmark.pictures[1] ? landmark.pictures[1].url : landmark.image}
                alt={`${landmark.name} Interior`}
                className="w-full h-36 lg:h-44 object-cover rounded-lg shadow-lg"
              />
              <img
                src={landmark.pictures[2] ? landmark.pictures[2].url : landmark.image}
                alt={`${landmark.name} Night View`}
                className="w-full h-36 lg:h-44 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Navigation Tabs - Centered */}
          <div className="flex justify-center space-x-4 mb-8">
            <button 
              onClick={() => setActiveTab('about')}
              className={`px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'about' 
                  ? 'bg-yellow-400 text-gray-800' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => setActiveTab('legend')}
              className={`px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'legend' 
                  ? 'bg-yellow-400 text-gray-800' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Legend
            </button>
            <button 
              onClick={() => setActiveTab('contacts')}
              className={`px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'contacts' 
                  ? 'bg-yellow-400 text-gray-800' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Contacts
            </button>
          </div>

          {/* Details Section - Full Width with Dynamic Content */}
          <div className="bg-cream rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{tabContent[activeTab].title}</h2>
            
            <div className="flex items-center text-gray-600 mb-4">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{landmark.location}</span>
            </div>
            
            {tabContent[activeTab].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandmarkDetails;