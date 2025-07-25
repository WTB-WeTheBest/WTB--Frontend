import { ApiError } from '../exception/ApiError.js';

const BASE_URL = import.meta.env.VITE_API_IP_LOCATION_URL

export async function getUserIPLocation() {
  const res = await fetch(`${BASE_URL}/locations/me`, {
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
