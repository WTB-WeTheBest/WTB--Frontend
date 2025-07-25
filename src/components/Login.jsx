import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  const backgroundImages = [
    '/assets/images/backgrounds/bali-ritual.jpg',
    '/assets/images/backgrounds/gamelan.jpg',
    '/assets/images/backgrounds/garuda.jpg',
    '/assets/images/backgrounds/handbag.jpg',
    '/assets/images/backgrounds/handicrafts.jpg',
    '/assets/images/backgrounds/riau-music.jpg',
    '/assets/images/backgrounds/wayang.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => {
        const availableIndices = backgroundImages.map((_, index) => index).filter(index => index !== prevIndex);
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        return randomIndex;
      });
      setActiveLayer(prev => prev === 0 ? 1 : 0);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length, currentImageIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await login(formData.username.trim(), formData.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response?.status === 401) {
        setErrors({ general: 'Invalid username or password' });
      } else {
        setErrors({ general: 'Login failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div 
        className="background-slideshow"
        style={{
          backgroundImage: `url(${backgroundImages[activeLayer === 0 ? currentImageIndex : previousImageIndex]})`,
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: activeLayer === 0 ? 1 : 0
        }}
      />
      <div 
        className="background-slideshow"
        style={{
          backgroundImage: `url(${backgroundImages[activeLayer === 1 ? currentImageIndex : previousImageIndex]})`,
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: activeLayer === 1 ? 1 : 0
        }}
      />
      <div className="blur-overlay" />
      
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your Garuda account</p>
        </div>
          
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username <span className="required">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`form-input ${
                errors.username ? 'error' : ''
              }`}
              disabled={loading}
              autoComplete="username"
              required
              placeholder="Username"
            />
            {errors.username && (
              <p className="error-message">{errors.username}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${
                errors.password ? 'error' : ''
              }`}
              disabled={loading}
              autoComplete="current-password"
              required
              placeholder="Password"
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? (
              <div className="loading-spinner">
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-link">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;