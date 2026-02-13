import React from 'react';
import './AdDetectionCard.css';

const AdDetectionCard = ({ ad }) => {
  const getRiskClass = (score) => {
    if (score >= 70) return 'risk-high';
    if (score >= 40) return 'risk-medium';
    return 'risk-low';
  };

  const getScamLevel = (score) => {
    if (score >= 70) return 'High ⚠️';
    if (score >= 40) return 'Medium ⚠️';
    return 'Low ✓';
  };

  return (
    <div className="ad-card">
      <div className="ad-media">
        <img src={ad.ad_media} alt={ad.brand_name} />
        <div className={`ai-badge ${getRiskClass(ad.ai_probability)}`}>
          AI: {ad.ai_probability}%
        </div>
      </div>

      <div className="ad-content">
        <div className="ad-header">
          <h4 className="brand-name">{ad.brand_name}</h4>
          <span className={`scam-risk ${getRiskClass(ad.scam_risk)}`}>
            {getScamLevel(ad.scam_risk)}
          </span>
        </div>

        <p className="ad-text">{ad.ad_text}</p>

        <div className="ad-stats">
          <div className="stat-item">
            <span className="stat-label">AI Probability</span>
            <div className="progress-bar">
              <div 
                className={`progress-fill ${getRiskClass(ad.ai_probability)}`}
                style={{ width: `${ad.ai_probability}%` }}
              />
            </div>
          </div>

          <div className="stat-item">
            <span className="stat-label">Scam Risk</span>
            <div className="progress-bar">
              <div 
                className={`progress-fill ${getRiskClass(ad.scam_risk)}`}
                style={{ width: `${ad.scam_risk}%` }}
              />
            </div>
          </div>
        </div>

        <div className="ad-footer">
          <span className="authenticity-badge">
            {ad.ai_probability > 50 ? '⚠️ Suspicious' : '✅ Verified'}
          </span>
          <button className="report-btn">Report Ad</button>
        </div>
      </div>
    </div>
  );
};

export default AdDetectionCard;