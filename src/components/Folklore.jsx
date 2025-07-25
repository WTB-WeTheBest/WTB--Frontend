import React from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import FolkloreCard from './FolkloreCard';

const Folklore = () => {
  const folkloreStories = [
    {
      id: 1,
      name: "Putri Ayu : A Legend from Trunyan Village",
      location: "Bali",
      price: "",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJhxZUJzYyQoKp36nvPNTl941pgFowi1FXIRsOPSh0PNowX2sb4m-hX7XK_2RU2hroIi_3GLxJec3FdOjUwzoZL20k_ce4IjO-rJ4o5WKf2f7mc7bnghqc4V57z_sEa6zkJefKHVOo6UJqFr46rLxE92nK1UiXelDAyMlWfwU4PFOUoK7AQ8ogb3cPjdE/w1200-h630-p-k-no-nu/cartoon%20illustration%20of%20a%20goddess%20in%20traditional%20South%20Sumatra%20attire%20admiring%20the%20Musi%20River%20from%20the%20heavens%20for%20children.png",
      description: "When you follow your heart and explore the unknown, you may encounter beauty and knowledge beyond what you ever imagined."
    },
    {
      id: 2,
      name: "Bujang's Legendary Adventure: The Tale of Belitung Island",
      location: "Bangka Belitung",
      price: "",
      image: "https://portal.belitung.go.id/wp-content/uploads/2022/11/ec520-masjidjamik.jpg",
      description: "Their strength is not found in revenge or greed, but in something beautiful in every interaction."
    },
    {
      id: 3,
      name: "Sangkuriang: The Legend of Tangkuban Perahu",
      location: "West Java",
      price: "",
      image: "https://smpn2.bimakota.sch.id/upload/kontent/1693182967_2ec018f6e1228014d59a.jpg",
      description: "This strength is not found in revenge or greed, but in something beautiful in every interaction."
    },
    {
      id: 4,
      name: "The Legend of The Crying Stone",
      location: "Kalimantan",
      price: "",
      image: "https://asset.kompas.com/crops/oeF5G9_ih4xnECFSQdtWjlWLrrc=/0x0:1000x667/1200x800/data/photo/2022/07/04/62c2f0abe941e.jpg",
      description: "True strength is not found in revenge or greed, but is something beautiful in every interaction."
    }
  ];

  // Duplicate the stories for multiple sections
  const allStories = [...folkloreStories, ...folkloreStories, ...folkloreStories];

  return (
    <div 
      style={{
        background: 'linear-gradient(to bottom, #2B5C4F 0%, #2B5C4F 5%, rgba(43, 92, 79, 0.8) 10%, rgba(43, 92, 79, 0.4) 15%, white 85%)'
      }}
    >
      <div>
        <div className="px-8 py-20 pt-40">
          {/* Header and Search Section */}
          <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Folklore
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12">
            Listen to the timeless tales and mystical legends that reveal the soul of the archipelago.
          </p>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for stories that intrigued you"
                className="w-full pl-12 pr-16 py-4 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2B5C4F] font-inter"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#2B5C4F] hover:bg-[#1f4239] text-white p-2 rounded-full transition-colors">
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>  

        {/* Wonderful tales Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 font-inter">
              Wonderful tales for you to explore
            </h2>
            <p className="text-gray-600 font-inter">
              Many places in Indonesia have their own stories to tell!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {folkloreStories.map((story) => (
              <Link to="/folklore/details" key={story.id}>
                <FolkloreCard folklore={story} />
              </Link>
            ))}
          </div>
        </div>
      <div className="text-2xl font-bold text-gray-800 mb-2 px-auto font-inter">More Coming Soon!</div>
        
      </div>

      {/* Footer Section */}
      <div className="bg-[#2B5C4F] h-64 mt-16"></div>
    </div>
  </div>
  );
};

export default Folklore;