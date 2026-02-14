import React from 'react';
import AdDetectionCard from '../components/AdDetectionCard';
import { dummyAds } from '../data/dummyData';
import './AdsDetector.css';

const AdsDetector = () => {
  // Calculate stats safely
  const totalAds = dummyAds?.length || 0;
  
  const highRisk = dummyAds?.filter(ad => {
    const score = ad.ai_probability || ad.aiProbability || 0;
    return score >= 70;
  }).length || 0;
  
  const mediumRisk = dummyAds?.filter(ad => {
    const score = ad.ai_probability || ad.aiProbability || 0;
    return score >= 40 && score < 70;
  }).length || 0;
  
  const lowRisk = dummyAds?.filter(ad => {
    const score = ad.ai_probability || ad.aiProbability || 0;
    return score < 40;
  }).length || 0;

  return (
    <div className="ads-detector-page">
      <div className="ads-header">
        <h1 className="page-title">AI Advertisement Detector</h1>
        <p className="page-subtitle">Detect fake AI-generated ads and scams</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{totalAds}</span>
          <span className="stat-label">Total Ads</span>
        </div>
        <div className="stat-card risk-high">
          <span className="stat-number">{highRisk}</span>
          <span className="stat-label">High Risk</span>
        </div>
        <div className="stat-card risk-medium">
          <span className="stat-number">{mediumRisk}</span>
          <span className="stat-label">Medium Risk</span>
        </div>
        <div className="stat-card risk-low">
          <span className="stat-number">{lowRisk}</span>
          <span className="stat-label">Low Risk</span>
        </div>
      </div>

      <div className="ads-grid">
        {dummyAds && dummyAds.length > 0 ? (
          dummyAds.map((ad) => (
            <AdDetectionCard key={ad.id} ad={ad} />
          ))
        ) : (
          <div className="no-ads">No advertisements to display</div>
        )}
      </div>
    </div>
  );
};

export default AdsDetector;