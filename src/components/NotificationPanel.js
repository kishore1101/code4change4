import React from 'react';
import './NotificationPanel.css';

const NotificationPanel = ({ onClose }) => {
  const suggestions = [
    {
      id: 1,
      username: 'ai_detection_alert',
      avatar: 'https://via.placeholder.com/40',
      type: 'AI Creator',
      risk: 'High',
      reason: 'Synthetic content detected'
    },
    {
      id: 2,
      username: 'bot_network_42',
      avatar: 'https://via.placeholder.com/40',
      type: 'Bot Network',
      risk: 'High',
      reason: 'Coordinated activity detected'
    },
    {
      id: 3,
      username: 'deepfake_warning',
      avatar: 'https://via.placeholder.com/40',
      type: 'Deepfake',
      risk: 'Medium',
      reason: 'Face morphing detected'
    },
    {
      id: 4,
      username: 'verified_human',
      avatar: 'https://via.placeholder.com/40',
      type: 'Verified',
      risk: 'Low',
      reason: 'Authentic account'
    }
  ];

  return (
    <div className="notification-panel">
      <div className="panel-header">
        <h3 className="panel-title">Notifications & Suggestions</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="panel-content">
        <div className="suggestions-section">
          <h4 className="section-title">Suggested Accounts</h4>
          {suggestions.map((item) => (
            <div key={item.id} className="suggestion-item">
              <div className="suggestion-avatar">
                <img src={item.avatar} alt={item.username} />
                {item.risk === 'High' && <span className="risk-indicator high"></span>}
                {item.risk === 'Medium' && <span className="risk-indicator medium"></span>}
                {item.risk === 'Low' && <span className="risk-indicator low"></span>}
              </div>
              <div className="suggestion-details">
                <span className="suggestion-username">{item.username}</span>
                <span className="suggestion-reason">{item.reason}</span>
              </div>
              <button className="follow-btn">Follow</button>
            </div>
          ))}
        </div>

        <div className="alerts-section">
          <h4 className="section-title">AI Flags</h4>
          <div className="alert-item">
            <span className="alert-icon">🤖</span>
            <div className="alert-details">
              <span className="alert-title">Bot Network Detected</span>
              <span className="alert-time">2 min ago</span>
            </div>
            <span className="alert-badge new">NEW</span>
          </div>
          <div className="alert-item">
            <span className="alert-icon">🎭</span>
            <div className="alert-details">
              <span className="alert-title">Deepfake Content</span>
              <span className="alert-time">15 min ago</span>
            </div>
            <span className="alert-badge">1h</span>
          </div>
          <div className="alert-item">
            <span className="alert-icon">📢</span>
            <div className="alert-details">
              <span className="alert-title">Coordinated Campaign</span>
              <span className="alert-time">1 hour ago</span>
            </div>
            <span className="alert-badge">2h</span>
          </div>
        </div>

        <div className="stats-section">
          <h4 className="section-title">Detection Stats</h4>
          <div className="stat-item">
            <span className="stat-label">AI Accounts Found</span>
            <span className="stat-value">24</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Bot Networks</span>
            <span className="stat-value">8</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Deepfakes</span>
            <span className="stat-value">12</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;