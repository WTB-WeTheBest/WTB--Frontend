import axios from 'axios';

  const API_BASE_URL = 'http://localhost:8000';

  // Create axios instance
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  // Token management
  const getTokens = () => ({
    access: localStorage.getItem('access_token'),
    refresh: localStorage.getItem('refresh_token'),
  });

  const setTokens = (tokens) => {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  };

  const clearTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  // Add auth header to requests
  api.interceptors.request.use((config) => {
    const { access } = getTokens();
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  });

  // Handle token refresh on 401
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const { refresh } = getTokens();
        if (refresh) {
          try {
            const response = await axios.post(`${API_BASE_URL}/api/refresh/`, {
              refresh: refresh
            });

            setTokens({
              access: response.data.access,
              refresh: refresh
            });

            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
            return api(originalRequest);
          } catch (refreshError) {
            clearTokens();
            window.location.href = '/login';
          }
        }
      }

      return Promise.reject(error);
    }
  );

  // Auth methods
  export const authService = {
    async login(username, password) {
      const response = await api.post('/api/login/', { username, password });
      setTokens(response.data.tokens);
      return response.data;
    },

    async register(userData) {
      const response = await api.post('/api/register/', userData);
      setTokens(response.data.tokens);
      return response.data;
    },

    async logout() {
      const { refresh } = getTokens();
      if (refresh) {
        try {
          await api.post('/api/logout/', { refresh });
        } catch (error) {
          console.log('Logout error:', error);
        }
      }
      clearTokens();
    },

    async getProfile() {
      const response = await api.get('/api/profile/');
      return response.data;
    },

    isAuthenticated() {
      return !!getTokens().access;
    }
  };

  export default api;