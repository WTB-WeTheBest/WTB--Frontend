import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandmarkDetails = () => {
  const [activeTab, setActiveTab] = useState('about');

  const tabContent = {
    about: {
      title: "About Masjid Agung An-Nur",
      content: (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Masjid Raya An-Nur Provinsi Riau merupakan masjid yang berdiri di 3. Jamppean, Sukajadi, Kec. 
            Pekanbaru Kota, Kota Pekanbaru, Riau 28156. Masjid ini merupakan masjid yang berdiri di tengah kota 
            sehingga sangat mudah diakses oleh masyarakat. Masjid ini dapat dikenal baik dengan 21 jam, sehingga 
            kapan saja umat dapat beribadah di masjid tersebut.
          </p>
          
          <p>
            Sejak yang dibangun dari masjid ini adalah arsitektur yang megah. Tidak hanya dipuji so 
            dalam dengan Ini sebutir Indonesia dan dimana salah satu masjid dengan desain yang megan di 
            Indonesia. Masjid kelebuhan masyarakat Pekanbaru ini sudah menghubungi sekuruh pertama dalam 
            masyarakat umum, mengutungnya lingkungan sumber dimana para kaum 1952 dan lalu rempang dalam 
            persekutuan para Agung.
          </p>
          
          <p>
            Kemegahan Masjid Raya An-Nur tergolong terlihat dari arsitekturalnya yang memasan. Masjid ini 
            menggunakannya tertenap budaya arsitektur yang khas disert dan untuk kawasan dangkal dari 
            mengalah kota. Ada banyak hal bagus lagi ini dakwah Pekanbaru Selatan budaya Melayu. Batu Tulis, dan masih banyaklah unsur 
            yang masih dalam bentuk bagguingan yang sama dengan Di Kota.
          </p>
        </div>
      )
    },
    legend: {
      title: "Legend of Masjid Agung An-Nur",
      content: (
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Masjid Agung An-Nur dibangun pada tahun 1968 sebagai masjid provinsi Riau yang pertama. Pembangunan 
            masjid ini merupakan hasil kerja sama antara pemerintah daerah Riau dengan masyarakat muslim setempat 
            yang ingin memiliki tempat ibadah yang representatif untuk provinsi yang baru terbentuk.
          </p>
          
          <p>
            Pada masa awal pembangunannya, masjid ini mengalami beberapa tahap renovasi dan perluasan. Renovasi 
            besar-besaran dilakukan pada tahun 1995 untuk memperluas kapasitas jamaah dan memperbaiki fasilitas 
            yang ada. Arsitektur masjid ini menggabungkan gaya Melayu tradisional dengan sentuhan modern yang 
            mencerminkan perkembangan zaman.
          </p>
          
          <p>
            Nama "An-Nur" yang berarti "cahaya" dipilih dengan harapan masjid ini dapat menjadi sumber cahaya 
            spiritual bagi masyarakat Riau. Sejak diresmikan, masjid ini telah menjadi pusat kegiatan keagamaan 
            dan sosial yang penting bagi komunitas muslim di Pekanbaru dan sekitarnya.
          </p>
          
          <p>
            Hingga saat ini, Masjid Agung An-Nur telah mengalami beberapa kali pemugaran untuk mempertahankan 
            keindahan arsitektur dan meningkatkan kenyamanan jamaah. Masjid ini tidak hanya berfungsi sebagai 
            tempat ibadah, tetapi juga sebagai pusat pendidikan Islam dan kegiatan sosial kemasyarakatan.
          </p>
        </div>
      )
    },
    contacts: {
      title: "Contact Information",
      content: (
        <div className="space-y-6 text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Address</h3>
              <div className="space-y-2">
                <p>Jl. Jenderal Sudirman No. 3</p>
                <p>Kelurahan Jadipan, Kecamatan Sukajadi</p>
                <p>Kota Pekanbaru, Riau 28156</p>
                <p>Indonesia</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Contact Details</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+62 761 123456</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>info@masjidannur-riau.id</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 112 0v3a1 1 0 11-2 0V9z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 5a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  <span>www.masjidannur-riau.id</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Prayer Times & Visiting Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Daily Prayer Schedule</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Subuh:</span>
                    <span>05:15 - 06:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dhuhur:</span>
                    <span>12:15 - 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ashar:</span>
                    <span>15:30 - 16:15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maghrib:</span>
                    <span>18:15 - 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Isya:</span>
                    <span>19:30 - 20:15</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Visiting Information</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Open:</span> 24 hours daily</p>
                  <p><span className="font-medium">Guided Tours:</span> Available on request</p>
                  <p><span className="font-medium">Friday Prayer:</span> 11:30 - 13:30</p>
                  <p><span className="font-medium">Special Events:</span> Islamic holidays</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              For special events, group visits, or religious ceremonies, please contact us in advance. 
              The mosque welcomes visitors of all backgrounds who wish to learn about Islamic culture and architecture.
            </p>
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
            <h1 className="text-4xl font-bold text-gray-200 mb-2">Masjid Agung An-Nur</h1>
            <div className="flex items-center text-gray-300">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Pekanbaru, Riau</span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            {/* Large Image */}
            <div className="lg:col-span-2">
              <img
                src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=500&fit=crop"
                alt="Masjid Agung An-Nur Main View"
                className="w-full h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            {/* Small Images */}
            <div className="grid grid-rows-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=250&fit=crop"
                alt="Masjid Interior"
                className="w-full h-36 lg:h-44 object-cover rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1533177172800-09d31ad38e45?w=400&h=250&fit=crop"
                alt="Masjid Night View"
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
              <span className="font-medium">Pekanbaru, Riau</span>
            </div>
            
            {tabContent[activeTab].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandmarkDetails;