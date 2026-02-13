import React, { useState } from 'react';
import { FaTh, FaFilm, FaBookmark, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const posts = [
    { 
      id: 1, 
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop', 
      type: 'post', 
      aiScore: 12 
    },
    { 
      id: 2, 
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop', 
      type: 'post', 
      aiScore: 89 
    },
    { 
      id: 3, 
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop', 
      type: 'post', 
      aiScore: 34 
    },
    { 
      id: 4, 
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop', 
      type: 'reel', 
      aiScore: 76 
    },
    { 
      id: 5, 
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop', 
      type: 'post', 
      aiScore: 23 
    },
    { 
      id: 6, 
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop', 
      type: 'reel', 
      aiScore: 92 
    }
  ];

  const getRiskClass = (score) => {
    if (score >= 70) return 'risk-high';
    if (score >= 40) return 'risk-medium';
    return 'risk-low';
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info">
          <div className="profile-avatar-large">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" 
              alt="Profile" 
            />
          </div>
          <div className="profile-details">
            <div className="profile-name-section">
              <h2 className="profile-username">ai_detector</h2>
              <button className="edit-profile-btn">Edit Profile</button>
              <button className="settings-btn">
                <FaCog />
              </button>
            </div>
            
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">42</span>
                <span className="stat-label">posts</span>
              </div>
              <div className="stat">
                <span className="stat-value">1.2k</span>
                <span className="stat-label">followers</span>
              </div>
              <div className="stat">
                <span className="stat-value">580</span>
                <span className="stat-label">following</span>
              </div>
            </div>
            
            <div className="profile-bio">
              <p className="bio-name">AI Detective 🔍</p>
              <p className="bio-text">Detecting deepfakes and AI-generated content</p>
              <p className="bio-link">www.aidetector.com</p>
            </div>

            <div className="ai-insights">
              <div className="insight-badge">
                <span className="badge-label">Your Content AI Risk</span>
                <span className={`badge-value ${getRiskClass(34)}`}>34%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <FaTh /> POSTS
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reels' ? 'active' : ''}`}
          onClick={() => setActiveTab('reels')}
        >
          <FaFilm /> REELS
        </button>
        <button 
          className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <FaBookmark /> SAVED
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'posts' && (
          <div className="posts-grid">
            {posts.map((post) => (
              <div key={post.id} className="post-grid-item">
                <img src={post.image} alt={`Post ${post.id}`} />
                {post.type === 'reel' && <span className="reel-indicator">REEL</span>}
                <div className={`post-ai-badge ${getRiskClass(post.aiScore)}`}>
                  AI: {post.aiScore}%
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reels' && (
          <div className="posts-grid">
            {posts.filter(p => p.type === 'reel').map((reel) => (
              <div key={reel.id} className="post-grid-item">
                <img src={reel.image} alt={`Reel ${reel.id}`} />
                <span className="reel-indicator">REEL</span>
                <div className={`post-ai-badge ${getRiskClass(reel.aiScore)}`}>
                  AI: {reel.aiScore}%
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="saved-empty">
            <FaBookmark className="empty-icon" />
            <h3>No saved posts yet</h3>
            <p>Save posts you want to check for AI detection later</p>
          </div>
        )}
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Profile;