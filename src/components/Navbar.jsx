import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-[#2B5C4F]">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-yellow-300">
          <Link to="/">BudayaIn!</Link>
        </h1>
      </div>
      <div className="flex items-center space-x-8">
        <Link to="#" className="text-yellow-300 hover:text-yellow-200 font-medium">
          Maps
        </Link>
        <Link to="/landmarks" className="text-yellow-300 hover:text-yellow-200 font-medium">
          Landmarks
        </Link>
        <Link to="#" className="text-yellow-300 hover:text-yellow-200 font-medium">
          Activities
        </Link>
      </div>
      <Link
        to="/login"
        className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Log In
      </Link>
    </nav>
  );
};

export default Navbar;