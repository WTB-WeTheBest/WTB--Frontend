import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ActivityDetails = () => {
  const [activeTab, setActiveTab] = useState('about');

  const tabContent = {
    about: {
      title: "About Pacu Jalur Festival",
      content: (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Pacu Jalur adalah tradisi balap perahu tradisional yang menjadi kebanggaan masyarakat Riau. Festival ini 
            merupakan warisan budaya yang telah berlangsung selama berabad-abad dan menjadi salah satu atraksi budaya 
            paling spektakuler di Indonesia. Acara ini biasanya diselenggarakan di Sungai Kampar dan Sungai Siak dengan 
            antusiasme yang luar biasa dari masyarakat lokal dan wisatawan.
          </p>
          
          <p>
            Festival Pacu Jalur tidak hanya sekedar perlombaan, tetapi juga perayaan budaya yang menampilkan berbagai 
            aspek kehidupan masyarakat Melayu Riau. Perahu jalur yang digunakan adalah perahu tradisional yang dibuat 
            khusus dengan teknik dan desain yang telah diturunkan dari generasi ke generasi. Setiap perahu dapat 
            mengangkut puluhan pendayung yang bekerja sama dalam harmoni yang sempurna.
          </p>
          
          <p>
            Selama festival, pengunjung dapat menyaksikan berbagai kegiatan pendukung seperti pertunjukan tari 
            tradisional, musik Melayu, pameran kerajinan tangan, dan kuliner khas Riau. Atmosfer festival yang meriah 
            dan penuh warna membuat pengalaman ini tak terlupakan bagi siapa saja yang hadir.
          </p>
        </div>
      )
    },
    history: {
      title: "History of Pacu Jalur Festival",
      content: (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Tradisi Pacu Jalur berasal dari masa Kesultanan Siak Sri Indrapura pada abad ke-18. Awalnya, perahu jalur 
            digunakan sebagai alat transportasi utama di sungai-sungai besar Riau. Seiring waktu, masyarakat mulai 
            mengadakan perlombaan untuk menguji kecepatan dan keterampilan para pendayung, yang kemudian berkembang 
            menjadi festival budaya yang besar.
          </p>
          
          <p>
            Pada masa kolonial Belanda, tradisi ini sempat mengalami penurunan karena berbagai pembatasan. Namun, 
            setelah kemerdekaan Indonesia, masyarakat Riau kembali menghidupkan tradisi ini dengan semangat yang baru. 
            Pemerintah daerah mulai memberikan dukungan penuh pada tahun 1980-an, menjadikan Pacu Jalur sebagai event 
            pariwisata budaya resmi Provinsi Riau.
          </p>
          
          <p>
            Hingga kini, Festival Pacu Jalur telah menjadi ikon budaya Riau yang dikenal hingga mancanegara. Setiap 
            tahun, ribuan wisatawan dari berbagai daerah dan negara datang untuk menyaksikan kemeriahan festival ini. 
            Tradisi yang dimulai sebagai kegiatan sehari-hari masyarakat pesisir kini telah menjadi warisan budaya 
            yang berharga dan harus dilestarikan.
          </p>
        </div>
      )
    },
    contacts: {
      title: "Event Information & Contacts",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Festival Information</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Sungai Kampar, Pekanbaru, Riau</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>August - September (Annual)</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>info@pacujalur-riau.id</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 112 0v3a1 1 0 11-2 0V9z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 5a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  <span>www.pacujalur-riau.id</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Festival Schedule & Ticket Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Daily Schedule</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Registration:</span>
                    <span>07:00 - 08:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Opening Ceremony:</span>
                    <span>08:00 - 09:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Preliminary Races:</span>
                    <span>09:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Final Race:</span>
                    <span>14:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cultural Shows:</span>
                    <span>16:00 - 18:00</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Ticket Information</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>General Admission:</span>
                    <span>Rp 50.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VIP Tribune:</span>
                    <span>Rp 150.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Festival Package:</span>
                    <span>Rp 300.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students (with ID):</span>
                    <span>Rp 25.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Children (under 12):</span>
                    <span>Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <h1 className="text-4xl font-bold text-gray-200 mb-2">Pacu Jalur Festival</h1>
            <div className="flex items-center text-gray-300">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Pekanbaru, Riau</span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="md:col-span-2">
              <img 
                src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=400&fit=crop" 
                alt="Pacu Jalur Festival Main"
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=200&fit=crop" 
                alt="Traditional Boats"
                className="w-full h-32 md:h-36 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1533177172800-09d31ad38e45?w=400&h=200&fit=crop" 
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
              onClick={() => setActiveTab('history')}
              className={`px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === 'history' 
                  ? 'bg-yellow-400 text-gray-800' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              History
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