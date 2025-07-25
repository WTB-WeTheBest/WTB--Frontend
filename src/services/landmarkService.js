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
      pictures: marker.pictures || [],
      city: location ? location.city : '',
      province: location ? location.province : '',
      min_price: marker.min_price,
      max_price: marker.max_price
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
      pictures: marker.pictures || [],
      city: location ? location.city : '',
      province: location ? location.province : '',
      min_price: marker.min_price,
      max_price: marker.max_price
    };
  }

  // Search and filter landmarks
  searchAndFilterLandmarks(landmarks, searchQuery = '', filters = {}) {
    let filtered = [...landmarks];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(landmark =>
        landmark.name.toLowerCase().includes(query) ||
        landmark.description.toLowerCase().includes(query) ||
        landmark.location.toLowerCase().includes(query) ||
        landmark.city.toLowerCase().includes(query) ||
        landmark.province.toLowerCase().includes(query) ||
        (landmark.story && landmark.story.toLowerCase().includes(query))
      );
    }

    // Apply category filter (for landmarks, we can use description content)
    if (filters.category) {
      const category = filters.category.toLowerCase();
      filtered = filtered.filter(landmark => {
        const content = `${landmark.name} ${landmark.description} ${landmark.story || ''}`.toLowerCase();
        switch (category) {
          case 'historical sites':
            return content.includes('historical') || content.includes('history') || content.includes('heritage') || content.includes('ancient');
          case 'museums':
            return content.includes('museum') || content.includes('gallery') || content.includes('exhibition');
          case 'religious sites':
            return content.includes('mosque') || content.includes('temple') || content.includes('church') || content.includes('religious') || content.includes('masjid');
          case 'cultural sites':
            return content.includes('cultural') || content.includes('culture') || content.includes('traditional') || content.includes('art');
          default:
            return true;
        }
      });
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(landmark => {
        const price = landmark.max_price; // Use max price for filtering
        switch (filters.priceRange) {
          case 'Under Rp 500.000':
            return price < 500000;
          case 'Rp 500.000 - 1.000.000':
            return price >= 500000 && price <= 1000000;
          case 'Rp 1.000.000 - 2.000.000':
            return price >= 1000000 && price <= 2000000;
          case 'Above Rp 2.000.000':
            return price > 2000000;
          default:
            return true;
        }
      });
    }

    return filtered;
  }

  // Search and filter activities
  searchAndFilterActivities(activities, searchQuery = '', filters = {}) {
    let filtered = [...activities];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(activity =>
        activity.name.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query) ||
        activity.location.toLowerCase().includes(query) ||
        activity.city.toLowerCase().includes(query) ||
        activity.province.toLowerCase().includes(query)
      );
    }

    // Apply category filter (for activities)
    if (filters.category) {
      const category = filters.category.toLowerCase();
      filtered = filtered.filter(activity => {
        const content = `${activity.name} ${activity.description}`.toLowerCase();
        switch (category) {
          case 'cultural events':
            return content.includes('cultural') || content.includes('festival') || content.includes('ceremony') || content.includes('traditional');
          case 'religious activities':
            return content.includes('religious') || content.includes('prayer') || content.includes('pilgrimage') || content.includes('spiritual');
          case 'traditional arts':
            return content.includes('art') || content.includes('craft') || content.includes('dance') || content.includes('music') || content.includes('traditional');
          case 'educational tours':
            return content.includes('tour') || content.includes('educational') || content.includes('learning') || content.includes('guide') || content.includes('museum');
          default:
            return true;
        }
      });
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(activity => {
        const price = activity.max_price; // Use max price for filtering
        switch (filters.priceRange) {
          case 'Under Rp 500.000':
            return price < 500000;
          case 'Rp 500.000 - 1.000.000':
            return price >= 500000 && price <= 1000000;
          case 'Rp 1.000.000 - 2.000.000':
            return price >= 1000000 && price <= 2000000;
          case 'Above Rp 2.000.000':
            return price > 2000000;
          default:
            return true;
        }
      });
    }

    return filtered;
  }
}

// Export a singleton instance
export default new LandmarkService();