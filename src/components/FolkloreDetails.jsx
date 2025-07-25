import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FolkloreDetails = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [storyPage, setStoryPage] = useState(1);

  // Array berisi isi cerita per halaman
  const storyPages = [
    (
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          Once upon a time, on a hill, far from any settlement in West Kalimantan, lived a mother and her 
          daughter. Her husband had long since died without leaving any significant wealth. Being a widow at a 
          fairly old age left her few options. She could not remarry, so she had to fend for herself to support her 
          beloved daughter, Darmi.
        </p>
        <p>
          Every day, her mother worked hard. She tended the vegetable garden from early morning: planting 
          seeds, watering, fertilizing, weeding, harvesting, and selling the produce at the market. She also had 
          to take care of her young child and gather firewood for cooking. Her skin, which had initially been fair, 
          gradually darkened from sun exposure. She lost weight, and she had no time to care for herself.
        </p>
        <p>
          Her mother hoped that Darmi would live a happy life, unlike herself. So, Darmi was pampered and 
          given lots of love. Darmi grew into a beautiful young woman! Her skin was light brown, her figure 
          slender, her face captivating, and her long, flowing jet-black hair. Darmi always wore beautiful clothes 
          and flashy accessories. Unlike her mother, who hadn't bought anything for herself in a long time. She 
          was old, she thought. She didn't need any of that anymore.
        </p>
        <p>
          But Darmi was still young and sociable. Darmi was always happy to be bought new clothes, 
          accessories, and make-up. Over time, those things were all she could think about. Darmi loved looking 
          in the mirror while combing her hair. She knew she was very beautiful. But that was all Darmi did. 
          Admiring herself all day long, while her mother worked hard in the garden.
        </p>
      </div>
    ),
    (
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          One day, Darmi's only comb broke, leaving her grumpy all day. She wanted a new comb! It had to be prettier than her old one. But Darmi didn't trust her mother's taste. Besides, if she went to the market, she could see beautiful accessories and perhaps get some too. Finally, Darmi decided to go with her mother, who supplied vegetables to the market, down the hill.
        </p>
        <p>
          Darmi, afraid of sunburn, held a large leaf as an umbrella. Meanwhile, her mother pulled a cart filled with vegetables with her frail body. One or two people passed them, giving them cynical glances. In Darmi's mind, it was because people looked down on her, having a mother who looked like a beggar. Skinny and shabby!
        </p>
        <p>
          Darmi took a quick step, leaving her mother behind, so people didn't know the woman pulling the cart was her mother. Unexpectedly, Darmi met a friend on the way. They chatted until her mother arrived. Her mother asked who the young man who had spoken to Darmi was, hoping to introduce her. But Darmi instead introduced her mother as her maid. Her mother's heart was broken by her daughter's words. She held back tears and was speechless. Knowing her mother was silent and accepting being called a maid, Darmi repeated her words every time someone greeted her.
        </p>
        <p>
          Darmi's beauty earned her many young men's greetings at the market, and some even offered to take her home. However, her mother was worried about Darmi's safety. She followed behind Darmi to protect her. Darmi seemed engrossed in conversation with the group of young men who "said" they were taking her home.
        </p>
      </div>
    ),
    (
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          The young men drew closer and closer to her daughter! So her mother had to warn Darmi by calling out to her. Suddenly, the young men turned to look and question Darmi, confirming that it was her mother who was calling. This time, Darmi laughed, asking how could such a homeless woman be her mother? Darmi said she came from a wealthy family, her mother was beautiful, and was waiting at home. Darmi added that the woman was a lowly worker at her residence. The young men laughed too, realizing how ridiculous the question was.
        </p>
        <p>
          Enough, Mother couldn't take it anymore! She let go of the cart she was holding and knelt to the ground. Heartbroken, Mother wept. She let out all the tears she had been holding back, asking God for help to end her heartache, fatigue, and futile prayers for happiness for her disobedient daughter.
        </p>
        <p>
          The sky darkened, and the wind blew hard. It turned out that God had heard her mother's prayer. Darmi, still surrounded by the young men, suddenly felt her legs stiffen and heavy. Instantly, Darmi realized she had been cursed for what she had done to her mother. As her body grew heavier, Darmi wept in fear. Darmi's body was so heavy that it was pulled to the ground. Now she knelt, crying even harder.
        </p>
        <p>
          Her legs turned to stone, and then to her hips. Darmi grew increasingly frightened, calling out to her mother. She apologized and promised never to repeat her actions. Her mother could only stare, then approached her half-turned-stone daughter. The two of them could only cry together, until finally Darmi turned completely into stone. Strangely, tears continued to flow from Darmi's stone for some time.
        </p>
        <p>
          The young men moved the stone to the side of a cliff, facing the sky so Darmi wouldn't be alone. Locals later called it the Crying Stone.
        </p>
      </div>
    ),
  ];

  const tabContent = {
    story: {
      title: "The Legend of The Crying Stone",
      content: storyPages[storyPage - 1]
    },
    origin: {
      title: "Origin of The Crying Stone",
      content: (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            The legend of the Crying Stone originates from the Dayak people of West Kalimantan, Indonesia. This 
            traditional folklore has been passed down through generations for centuries, serving as a moral lesson 
            about respect, gratitude, and the consequences of vanity and selfishness.
          </p>
          
          <p>
            In Dayak culture, stones and rocks are often considered sacred and possess spiritual significance. 
            The transformation of Darmi into a crying stone represents the eternal punishment for those who 
            disrespect their parents and forget their duties to family. The tears that continuously flow from the 
            stone symbolize endless regret and sorrow.
          </p>
          
          <p>
            This legend is particularly told to young people in Dayak communities to teach them about the 
            importance of filial piety, hard work, and humility. The story emphasizes that beauty without good 
            character is meaningless, and that children should always honor and help their parents, especially 
            when they grow old and need support.
          </p>
          
          <p>
            The actual "crying stone" is said to be located in the forests of West Kalimantan, and local people 
            believe that during rainy seasons, the stone appears to shed tears. This natural phenomenon has 
            reinforced the legend and made it an integral part of local folklore and cultural identity.
          </p>
        </div>
      )
    },
    location: {
      title: "Location & Cultural Context",
      content: (
        <div className="space-y-6 text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Geographic Origin</h3>
              <div className="space-y-2">
                <p>West Kalimantan Province</p>
                <p>Dayak Traditional Territories</p>
                <p>Indonesian Borneo</p>
                <p>Equatorial Rainforest Region</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Cultural Significance</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Moral Education Tool</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Dayak Cultural Heritage</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Oral Tradition</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Related Folklore & Visiting Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Similar Legends</h4>
                <div className="text-sm space-y-1">
                  <p>• Malin Kundang (Sumatra)</p>
                  <p>• Tangkuban Perahu (West Java)</p>
                  <p>• Roro Jonggrang (Central Java)</p>
                  <p>• Other transformation legends</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Cultural Tours</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Dayak Villages:</span> Cultural immersion</p>
                  <p><span className="font-medium">Storytelling Sessions:</span> Traditional narration</p>
                  <p><span className="font-medium">Forest Treks:</span> Stone location visits</p>
                  <p><span className="font-medium">Cultural Centers:</span> Educational programs</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              This legend continues to be an important part of Indonesian folklore education and cultural preservation. 
              Many schools and cultural institutions use this story to teach moral values and respect for elders.
            </p>
          </div>
        </div>
      )
    }
  };

  // Reset halaman cerita ke 1 jika pindah tab
  useEffect(() => {
    if (activeTab !== 'story') {
      setStoryPage(1);
    }
  }, [activeTab]);

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
            <h1 className="text-4xl font-bold text-gray-200 mb-2">The Legend of The Crying Stone</h1>
            <div className="flex items-center text-gray-300">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Kalimantan Barat</span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            {/* Large Image */}
            <div className="lg:col-span-2">
              <img
                src="https://asset.kompas.com/crops/oeF5G9_ih4xnECFSQdtWjlWLrrc=/0x0:1000x667/1200x800/data/photo/2022/07/04/62c2f0abe941e.jpg"
                alt="The Legend of The Crying Stone"
                className="w-full h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            {/* Small Images */}
            <div className="grid grid-rows-2 gap-4">
              <img
                src="https://smpn2.bimakota.sch.id/upload/kontent/1693182967_2ec018f6e1228014d59a.jpg"
                alt="Dayak Cultural Heritage"
                className="w-full h-36 lg:h-44 object-cover rounded-lg shadow-lg"
              />
              <img
                src="https://telusurkultur.com/cdn/shop/articles/Cover_Blog_Dienvibi_2_8efc2c06-4296-4230-94f4-8e5449f6e859.png?v=1695530285"
                alt="Kalimantan Forest"
                className="w-full h-36 lg:h-44 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Navigation Tabs - Centered */}
          <div className="flex justify-center space-x-4 mb-8">
            <button 
              onClick={() => setActiveTab('story')}
              className={`px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'story' 
                  ? 'bg-yellow-400 text-gray-800' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              The Legend of The Crying Stone
            </button>
            <button 
              onClick={() => setActiveTab('origin')}
              className={`px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'origin' 
                  ? 'bg-yellow-400 text-gray-800' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Origin
            </button>
            <button 
              onClick={() => setActiveTab('location')}
              className={`px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'location' 
                  ? 'bg-yellow-400 text-gray-800' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Location
            </button>
          </div>

          {/* Details Section - Full Width with Dynamic Content */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{tabContent[activeTab].title}</h2>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Kalimantan Barat</span>
              </div>
            </div>
            
            {tabContent[activeTab].content}
            
            {/* Navigation Buttons - Hanya untuk tab "story" */}
            {activeTab === 'story' && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    storyPage === 1 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer'
                  }`}
                  onClick={() => {
                    if (storyPage > 1) {
                      setStoryPage(prev => prev - 1);
                    }
                  }}
                  disabled={storyPage === 1}
                >
                  Previous
                </button>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Page {storyPage} of {storyPages.length}</p>
                </div>
                <button
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    storyPage === storyPages.length 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-yellow-400 hover:bg-yellow-500 text-gray-800 cursor-pointer'
                  }`}
                  onClick={() => {
                    if (storyPage < storyPages.length) {
                      setStoryPage(prev => prev + 1);
                    }
                  }}
                  disabled={storyPage === storyPages.length}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolkloreDetails;