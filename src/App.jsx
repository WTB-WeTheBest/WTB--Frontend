import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/AuthContext.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Login from './components/Login';  
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Landmark1 from './components/Landmark1';
import Activities1 from './components/Activities1';
import LandmarkDetails from './components/LandmarkDetails';
import ActivityDetails from './components/ActivityDetails';
import Collection from './components/Collection';
import FullScreenMap from './components/FullScreenMap';
import Folklore from './components/Folklore';
import FolkloreDetails from './components/FolkloreDetails'; 

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = ['/login', '/register', '/map'].includes(location.pathname);
  const hideFooter = ['/login', '/register', '/map'].includes(location.pathname);

  return (
    <div className="min-h-screen">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route 
          path="/dashboard" 
          element={
          <Dashboard />
          } 
        />
        <Route 
          path="/landmarks" 
          element={
          <Landmark1 />
          } 
        />
        <Route 
          path="/landmarks/:slug" 
          element={
          <LandmarkDetails />
          } 
        />
        <Route 
          path="/activities" 
          element={
          <Activities1 />
          } 
        />
        <Route 
          path="/activities/:slug" 
          element={
          <ActivityDetails />
          } 
        />
        <Route 
          path="/collection" 
          element={
          <Collection />
          } 
        />
        <Route 
          path="/map" 
          element={
          <FullScreenMap />
          } 
        />
        <Route
          path="/folklore"
          element={
          <Folklore />
          } 
        />
        <Route 
          path="/folklore/details" 
          element={
          <FolkloreDetails />
          }
        />
        <Route
          path="/map/:id"
          element={
          <FullScreenMap />
          }
        />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/" />;
};

const HomeRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return <LandingPage />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
