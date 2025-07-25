const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class LandmarkService {
  
  // Get all landmarks
  async getLandmarks() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/landmarks/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.landmarks || [];
    } catch (error) {
      console.error('Error fetching landmarks:', error);
      throw error;
    }
  }

  // Get a specific landmark by ID
  async getLandmark(landmarkId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/landmarks/${landmarkId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.landmark;
    } catch (error) {
      console.error('Error fetching landmark:', error);
      throw error;
    }
  }

  // Get all activities
  async getActivities() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/activities/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.activities || [];
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  }

  // Get a specific activity by ID
  async getActivity(activityId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/activities/${activityId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.activity;
    } catch (error) {
      console.error('Error fetching activity:', error);
      throw error;
    }
  }

  // Helper method to format price in Rupiah
  formatPrice(minPrice, maxPrice) {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    if (minPrice === maxPrice) {
      return formatter.format(minPrice);
    } else {
      return `${formatter.format(minPrice)} - ${formatter.format(maxPrice)}`;
    }
  }

  // Helper method to get the first image URL from pictures array
  getFirstImageUrl(pictures, fallbackUrl = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=200&fit=crop') {
    if (pictures && pictures.length > 0) {
      return pictures[0].url;
    }
    return fallbackUrl;
  }

  // Helper method to transform landmark data for frontend consumption
  transformLandmarkData(landmark) {
    if (!landmark || !landmark.marker) {
      return null;
    }

    const marker = landmark.marker;
    const location = marker.location;
    
    return {
      id: marker.id,
      name: marker.name,
      location: location ? `${location.city}, ${location.province}` : 'Unknown Location',
      price: this.formatPrice(marker.min_price, marker.max_price),
      image: this.getFirstImageUrl(marker.pictures),
      description: marker.description,
      story: landmark.story,
      contact: marker.contact,
      url: marker.url,
      coordinates: location ? location.coordinates : null,
      pictures: marker.pictures || []
    };
  }

  // Helper method to transform activity data for frontend consumption
  transformActivityData(activity) {
    if (!activity || !activity.marker) {
      return null;
    }

    const marker = activity.marker;
    const location = marker.location;
    
    return {
      id: marker.id,
      name: marker.name,
      location: location ? `${location.city}, ${location.province}` : 'Unknown Location',
      price: this.formatPrice(marker.min_price, marker.max_price),
      image: this.getFirstImageUrl(marker.pictures),
      description: marker.description,
      contact: marker.contact,
      url: marker.url,
      coordinates: location ? location.coordinates : null,
      pictures: marker.pictures || []
    };
  }
}

// Export a singleton instance
export default new LandmarkService();