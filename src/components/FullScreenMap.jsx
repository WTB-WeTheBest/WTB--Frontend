import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { ApiError } from '../exception/ApiError.js';
import { getUserIPLocation } from '../api/GetUserIPLocatioin.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapPinIcon, MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid/index.js';
import { getActivities, getLandmarks } from '../api/GetMarker.js';
import { getActivitiesById, getLandmarksById } from '../api/GetMarkerById.js';

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
            <div className="absolute top-0 left-0 h-full w-80 bg-white shadow-lg z-[2001] p-4 overflow-y-auto">
              {selectedMarker.pictures.map((p, index) => {
                <img key={index} src={p} />
              })}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{selectedMarker.name}</h2>
                <button onClick={() => {
                  setSelectedMarker(null)
                  navigate('/map')
                }}>
                  <XMarkIcon className="w-6 h-6 text-gray-500"/>
                </button>
              </div>
              <p>{selectedMarker.contact}</p>
              <p>{selectedMarker.url}</p>
              <p>{selectedMarker.minPrice}</p>
              <p>{selectedMarker.maxPrice}</p>
              <p>{selectedMarker.description}</p>
              <p>{selectedMarker.location.city}</p>
              <p>{selectedMarker.location.provice}</p>
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
