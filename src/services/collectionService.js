const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class CollectionService {
  
  // Get user's authentication token from localStorage
  getAuthToken() {
    return localStorage.getItem('access_token');
  }

  // Get authorization headers
  getAuthHeaders() {
    const token = this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  // Get all user's collections
  async getCollections() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/collections/`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.collections || [];
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw error;
    }
  }

  // Add item to collection
  async addToCollection(markerId, itemType) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/collections/`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          marker_id: markerId,
          item_type: itemType
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding to collection:', error);
      throw error;
    }
  }

  // Remove item from collection
  async removeFromCollection(markerId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/collections/${markerId}/`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error removing from collection:', error);
      throw error;
    }
  }

  // Check if item is in collection
  async checkCollectionStatus(markerId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/collections/check/${markerId}/`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.is_saved || false;
    } catch (error) {
      console.error('Error checking collection status:', error);
      return false; // Default to not saved if error
    }
  }

  // Get collection statistics
  async getCollectionStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/collections/stats/`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching collection stats:', error);
      throw error;
    }
  }

  // Toggle item in collection (add if not present, remove if present)
  async toggleCollection(markerId, itemType) {
    try {
      const isInCollection = await this.checkCollectionStatus(markerId);
      
      if (isInCollection) {
        await this.removeFromCollection(markerId);
        return { action: 'removed', is_saved: false };
      } else {
        await this.addToCollection(markerId, itemType);
        return { action: 'added', is_saved: true };
      }
    } catch (error) {
      console.error('Error toggling collection:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getAuthToken();
  }

  // Transform collection data for frontend consumption
  transformCollectionData(collection) {
    if (!collection || !collection.marker_details) {
      return null;
    }

    const marker = collection.marker_details;
    const location = marker.location;
    
    return {
      id: collection.id,
      markerId: collection.marker_id,
      itemType: collection.item_type,
      savedAt: collection.saved_at,
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
}

// Export a singleton instance
export default new CollectionService();