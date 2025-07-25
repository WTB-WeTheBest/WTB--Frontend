import { ApiError } from '../exception/ApiError.js';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getActivities(position) {
  const res = await fetch(`${BASE_URL}/activities?lat=${position.latitude}&lng=${position.longitude}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })

  if (!res.ok) {
    const data = await res.json()
    throw new ApiError(data.errors, res.status, data.errors)
  }

  return res.json()
}

export async function getLandmarks(position) {
  const res = await fetch(`${BASE_URL}/landmarks?lat=${position.latitude}&lng=${position.longitude}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })

  if (!res.ok) {
    const data = await res.json()
    throw new ApiError(data.errors, res.status, data.errors)
  }

  return res.json()
}
