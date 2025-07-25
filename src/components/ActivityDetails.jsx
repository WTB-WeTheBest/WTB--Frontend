import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import landmarkService from '../services/landmarkService';

const ActivityDetails = () => {
  const { slug } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        setLoading(true);
        const activities = await landmarkService.getActivities();
        const foundActivity = activities.find(a => a.marker.name === slug);
        if (foundActivity) {
          setActivity(landmarkService.transformActivityData(foundActivity));
        } else {
          setError('Activity not found');
        }
      } catch (err) {
        setError('Failed to fetch activity details.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivityDetails();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!activity) {
    return <div>Activity not found.</div>;
  }

  const tabContent = {
    about: {
      title: `About ${activity.name}`,
      content: (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>{activity.description}</p>
        </div>
      )
    },
    legend: {
      title: `Legend of ${activity.name}`,
      content: (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>No legend available for this activity.</p>
        </div>
      )
    },
    contacts: {
      title: "Event Information & Contacts",
      content: (
        <div className="space-y-6">
          <p>Contact: {activity.contact}</p>
          <p>Website: <a href={activity.url} target="_blank" rel="noopener noreferrer">{activity.url}</a></p>
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
            <h1 className="text-4xl font-bold text-gray-200 mb-2">{activity.name}</h1>
            <div className="flex items-center text-gray-300">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{activity.location}</span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="md:col-span-2">
              <img 
                src={activity.image}
                alt={`${activity.name} Main`}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              <img 
                src={activity.pictures[1] ? activity.pictures[1].url : activity.image}
                alt="Traditional Boats"
                className="w-full h-32 md:h-36 object-cover rounded-lg shadow-lg"
              />
              <img 
                src={activity.pictures[2] ? activity.pictures[2].url : activity.image}
                alt="Cultural Performance"
                className="w-full h-32 md:h-36 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Navigation Tabs */}
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
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {tabContent[activeTab].title}
            </h2>
            <div className="text-gray-700">
              {tabContent[activeTab].content}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ActivityDetails;