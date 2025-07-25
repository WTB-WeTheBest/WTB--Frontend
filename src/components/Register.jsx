import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0); // 0 or 1 to alternate between two divs
  const [scrollY, setScrollY] = useState(0);
  const { register } = useAuth();
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
      setPreviousImageIndex(currentImageIndex); // Store current as previous
      setCurrentImageIndex((prevIndex) => {
        const availableIndices = backgroundImages.map((_, index) => index).filter(index => index !== prevIndex);
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        return randomIndex;
      });
      setActiveLayer(prev => prev === 0 ? 1 : 0); // Switch which layer is active
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

  const validatePassword = (password) => {
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\\/~`]/.test(password);

    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/~`]/.test(password)) {
      return 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>_-+=[]\\/~`)';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    if (username.length < 3 || username.length > 20) {
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return false;
    }
    if (username.startsWith('_') || username.endsWith('_')) {
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!validateUsername(formData.username)) {
      if (formData.username.length < 3 || formData.username.length > 20) {
        newErrors.username = 'Username must be between 3 and 20 characters long';
      } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        newErrors.username = 'Username can only contain letters, numbers, and underscores';
      } else if (formData.username.startsWith('_') || formData.username.endsWith('_')) {
        newErrors.username = 'Username cannot start or end with an underscore';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }


    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const userData = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        password_confirm: formData.confirmPassword
      };

      await register(userData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response?.data) {
        const serverErrors = error.response.data;
        const newErrors = {};
        
        Object.keys(serverErrors).forEach(key => {
          if (Array.isArray(serverErrors[key])) {
            newErrors[key] = serverErrors[key][0];
          } else {
            newErrors[key] = serverErrors[key];
          }
        });
        
        setErrors(newErrors);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
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
      
      <div className="register-card">
        <div className="register-header">
          <h1 className="register-title">Sign Up</h1>
          <p className="register-subtitle">Sign up to Garuda to access all of our features!</p>
        </div>
          
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

        <form onSubmit={handleSubmit} noValidate className="register-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${
                errors.email ? 'error' : ''
              }`}
              disabled={loading}
              autoComplete="email"
              required
              placeholder="Email"
            />
            {errors.email && (
              <p className="error-message">{errors.email}</p>
            )}
          </div>

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

          <div className="form-row">
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
                autoComplete="new-password"
                required
                placeholder="Password"
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
              <p className="password-hint">
                Must contain: 8+ characters, uppercase, lowercase, number, and symbol
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input ${
                  errors.confirmPassword ? 'error' : ''
                }`}
                disabled={loading}
                autoComplete="new-password"
                required
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>
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
                Creating Account...
              </div>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="login-link">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;