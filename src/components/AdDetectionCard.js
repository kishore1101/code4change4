import React, { useState } from 'react';
import api from '../services/api';
import './AdDetectionCard.css';

const AdDetectionCard = ({ ad }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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

  const analyzeAd = async () => {
    setLoading(true);
    try {
      const result = await api.analyzeAd(ad, true);
      setAnalysis(result);
      setShowDetails(true);
    } catch (error) {
      console.error('Ad analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use analysis if available, otherwise use ad data
  const displayData = analysis || ad;

  return (
    <div className="ad-card">
      <div className="ad-media">
        <img src={ad.ad_media || ad.image} alt={ad.brand_name} />
        <div className={`ai-badge ${getRiskClass(ad.ai_probability || ad.aiProbability || 0)}`}>
          AI: {ad.ai_probability || ad.aiProbability || 0}%
        </div>
      </div>

      <div className="ad-content">
        <div className="ad-header">
          <h4 className="brand-name">{ad.brand_name}</h4>
          <span className={`scam-risk ${getRiskClass(ad.scam_risk || 0)}`}>
            {getScamLevel(ad.scam_risk || 0)}
          </span>
        </div>

        <p className="ad-text">{ad.ad_text}</p>

        <div className="ad-stats">
          <div className="stat-item">
            <span className="stat-label">AI Probability</span>
            <div className="progress-bar">
              <div 
                className={`progress-fill ${getRiskClass(ad.ai_probability || ad.aiProbability || 0)}`}
                style={{ width: `${ad.ai_probability || ad.aiProbability || 0}%` }}
              />
            </div>
          </div>

          <div className="stat-item">
            <span className="stat-label">Scam Risk</span>
            <div className="progress-bar">
              <div 
                className={`progress-fill ${getRiskClass(ad.scam_risk || 0)}`}
                style={{ width: `${ad.scam_risk || 0}%` }}
              />
            </div>
          </div>
        </div>

        {analysis?.signals_detected && analysis.signals_detected.length > 0 && (
          <div className="signals-section">
            <span className="signals-title">⚠️ Detected Signals:</span>
            <ul className="signals-list">
              {analysis.signals_detected.map((signal, index) => (
                <li key={index}>{signal}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis?.gemini_insights?.summary && (
          <div className="gemini-note">
            <span className="gemini-icon">🤖</span>
            <span className="gemini-text">{analysis.gemini_insights.summary}</span>
          </div>
        )}

        <div className="ad-footer">
          <span className={`authenticity-badge ${ad.authenticity || 'suspicious'}`}>
            {ad.authenticity === 'verified' ? '✅ Verified' : '⚠️ Suspicious'}
          </span>
          {!analysis && (
            <button 
              className="analyze-btn" 
              onClick={analyzeAd}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : '🔍 Deep Analysis'}
            </button>
          )}
          {analysis && (
            <button 
              className="report-btn"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdDetectionCard;  // ← Make sure this is default export