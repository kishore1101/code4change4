import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaSearch, 
  FaCompass, 
  FaFilm, 
  FaChartBar, 
  FaAd, 
  FaUser,
  FaInstagram 
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <FaInstagram className="logo-icon" />
        <span className="logo-text">AI Detector</span>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaHome className="nav-icon" />
          <span>Home</span>
        </NavLink>
        
        <NavLink to="/search" className="nav-link">
          <FaSearch className="nav-icon" />
          <span>Search</span>
        </NavLink>
        
        <NavLink to="/explore" className="nav-link">
          <FaCompass className="nav-icon" />
          <span>Explore</span>
        </NavLink>
        
        <NavLink to="/reels" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaFilm className="nav-icon" />
          <span>Reels</span>
        </NavLink>
        
        <NavLink to="/ads-detector" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaAd className="nav-icon" />
          <span>Ad Detector</span>
        </NavLink>
        
        <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaChartBar className="nav-icon" />
          <span>Analytics</span>
        </NavLink>
        
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaUser className="nav-icon" />
          <span>Profile</span>
        </NavLink>
      </nav>
      
      {/* Bottom Navigation for Mobile */}
      <div className="bottom-nav">
        <NavLink to="/" className="bottom-nav-item">
          <FaHome />
        </NavLink>
        <NavLink to="/search" className="bottom-nav-item">
          <FaSearch />
        </NavLink>
        <NavLink to="/explore" className="bottom-nav-item">
          <FaCompass />
        </NavLink>
        <NavLink to="/reels" className="bottom-nav-item">
          <FaFilm />
        </NavLink>
        <NavLink to="/profile" className="bottom-nav-item">
          <FaUser />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;