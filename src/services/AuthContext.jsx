import React, { createContext, useContext, useState, useEffect } from 'react';
  import { authService } from '../services/authService';

  const AuthContext = createContext();

  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const initAuth = async () => {
        if (authService.isAuthenticated()) {
          try {
            const userData = await authService.getProfile();
            setUser(userData);
          } catch (error) {
            console.error('Failed to fetch user profile:', error);
          }
        }
        setLoading(false);
      };

      initAuth();
    }, []);

    const login = async (username, password) => {
      const response = await authService.login(username, password);
      setUser(response.user);
      return response;
    };

    const register = async (userData) => {
      const response = await authService.register(userData);
      setUser(response.user);
      return response;
    };

    const logout = async () => {
      await authService.logout();
      setUser(null);
    };

    const value = {
      user,
      login,
      register,
      logout,
      loading,
      isAuthenticated: !!user,
    };

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };