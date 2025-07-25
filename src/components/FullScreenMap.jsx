import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { ApiError } from '../exception/ApiError.js';
import { getUserIPLocation } from '../api/GetUserIPLocatioin.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapPinIcon, MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid/index.js';
import { getActivities, getLandmarks } from '../api/GetMarker.js';
import { getActivitiesById, getLandmarksById } from '../api/GetMarkerById.js';

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  shadowSize: [41, 41]
})

function SetViewTo({ position }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.setView(position, 16)
    }
  }, [])
  return null
}

const FullScreenMap = () => {
  const { id } = useParams()
  const [userPosition, setUserPosition] = useState(null)
  const [activity, setActivity] = useState([])
  const [landmark, setLandmark] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    handleSelectMarker(id)
  }, [id])

  const handleSelectMarker = async (id) => {
    let marker
    try {
      marker = await getLandmarksById(id)
      setSelectedMarker(marker.data)
    } catch { /* empty */ }
    try {
      marker = await getActivitiesById(id)
      setSelectedMarker(marker.data)
    } catch { /* empty */ }
  }

  const fallbackToIPLocation = async () => {
    try {
      const res = await getUserIPLocation()
      setUserPosition({ latitude: res.data.latitude, longitude: res.data.longitude })
    } catch (err) {
      if (err instanceof ApiError) console.error('API error:', err.message)
      else console.error('Terjadi kesalahan.')
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserPosition({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => fallbackToIPLocation()
      )
    } else {
      fallbackToIPLocation()
    }
  }, [])

  useEffect(() => {
    if (!userPosition) return
    const fetchMarker = async () => {
      try {
        const activities = await getActivities(userPosition)
        const landmarks = await getLandmarks(userPosition)
        setActivity(activities.data)
        setLandmark(landmarks.data)
      } catch (err) {
        if (err instanceof ApiError) console.error('API error:', err.message)
        else console.error('Terjadi kesalahan.')
      }
    }
    fetchMarker()
  }, [userPosition]);

  const center = userPosition ? [userPosition.latitude, userPosition.longitude] : [0, 0]
  const zoom = userPosition ? 16 : 2;

  return (
    <div className="relative">
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-screen"
        zoomControl={false}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {userPosition && (
          <>
            <Marker
              position={[userPosition.latitude, userPosition.longitude]}
            >
              <Popup>Your location</Popup>
            </Marker>
            <SetViewTo position={[userPosition.latitude, userPosition.longitude]} />
          </>
        )}

        {activity
          .map(act => (
            <Marker
              icon={redIcon}
              key={act.id}
              position={[act.location.latitude, act.location.longitude]}
              eventHandlers={{
                click: () => navigate(`/map/${act.id}`)
              }}
            >
              <Popup>{act.name}</Popup>
            </Marker>
          ))}
        {landmark
          .map(lnd => (
            <Marker
              icon={redIcon}
              key={lnd.id}
              position={[lnd.location.latitude, lnd.location.longitude]}
              eventHandlers={{
                click: () => navigate(`/map/${lnd.id}`)
              }}
            >
              <Popup>{lnd.name}</Popup>
            </Marker>
          ))}

          {selectedMarker && (
            <div className="absolute top-0 left-0 h-full w-96 bg-white shadow-xl z-[2001]">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start gap-4 z-10">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-gray-900 leading-tight break-words">
                    {selectedMarker.name}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedMarker(null);
                    navigate('/map');
                  }}
                  className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Close panel"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto h-[calc(100vh-4rem)] pb-20"> {/* Adjust the height to leave space for the header */}
                {selectedMarker.pictures && selectedMarker.pictures.length > 0 && (
                  <div className="px-6 py-4">
                    <div className="grid grid-cols-2 gap-3">
                      {selectedMarker.pictures.map((p, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                          <img
                            src={p}
                            alt={`${selectedMarker.name} - Image ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1">Location</p>
                      <p className="text-sm text-gray-600">
                        {selectedMarker.location?.city}
                        {selectedMarker.location?.city && selectedMarker.location?.province && ', '}
                        {selectedMarker.location?.province}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-2">Price Range</p>
                      <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {selectedMarker.minPrice ? `From ${selectedMarker.minPrice}` : 'Price not available'}
              </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {selectedMarker.maxPrice ? `Up to ${selectedMarker.maxPrice}` : 'Price not available'}
              </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                {selectedMarker.contact && (
                  <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">Contact</p>
                        <p className="text-sm text-gray-600 break-words">{selectedMarker.contact}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Website */}
                {selectedMarker.url && (
                  <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">Website</p>
                        <a
                          href={selectedMarker.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-words transition-colors duration-200"
                        >
                          {selectedMarker.url}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                {selectedMarker.description && (
                  <div className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-2">Description</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{selectedMarker.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        <ControlButton userPosition={userPosition}/>
      </MapContainer>
      <div className="absolute z-[2001] top-2.5 right-2.5">
        <button className="p-2 rounded-full bg-white text-gray-500">
          <Link to="/">
            <XMarkIcon className="h-6 w-6"/>
          </Link>
        </button>
      </div>
    </div>
  )
};

export default FullScreenMap;

function ControlButton({ userPosition }) {
  const map = useMap()

  const handleFlyToLocation = () => {
    if (userPosition) {
      const targetPosition = [userPosition.latitude, userPosition.longitude];
      map.flyTo(targetPosition, 18, {
        duration: 1.5
      });
    }
  };

  return (
    <div className="absolute bottom-6 right-4 z-[2000]">
      <button
        onClick={handleFlyToLocation}
        className="mb-2 text-gray-500 p-2 bg-white hover:bg-gray-100 border border-gray-200 shadow-md rounded cursor-pointer"
      >
        <MapPinIcon className="w-5 h-5" />
      </button>

      <div className="text-gray-500 bottom-6 right-2.5 flex flex-col z-[1000] border border-gray-200 shadow-md rounded overflow-hidden">
        <button
          onClick={() => map.zoomIn()}
          className="p-2 bg-white hover:bg-gray-100"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => map.zoomOut()}
          className="p-2 bg-white hover:bg-gray-100"
        >
          <MinusIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
