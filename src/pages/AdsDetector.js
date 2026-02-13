import React from 'react';
import AdDetectionCard from '../components/AdDetectionCard';
import { dummyAds } from '../data/dummyData';
import './AdsDetector.css';

const AdsDetector = () => {
  const stats = {
    totalAds: dummyAds.length,
    highRisk: dummyAds.filter(ad => ad.ai_probability >= 70).length,
    mediumRisk: dummyAds.filter(ad => ad.ai_probability >= 40 && ad.ai_probability < 70).length,
    lowRisk: dummyAds.filter(ad => ad.ai_probability < 40).length
  };

  return (
    <div className="ads-detector-page">
      <div className="ads-header">
        <h1 className="page-title">AI Advertisement Detector</h1>
        <p className="page-subtitle">Detect fake AI-generated ads and scams</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{stats.totalAds}</span>
          <span className="stat-label">Total Ads</span>
        </div>
        <div className="stat-card risk-high">
          <span className="stat-number">{stats.highRisk}</span>
          <span className="stat-label">High Risk</span>
        </div>
        <div className="stat-card risk-medium">
          <span className="stat-number">{stats.mediumRisk}</span>
          <span className="stat-label">Medium Risk</span>
        </div>
        <div className="stat-card risk-low">
          <span className="stat-number">{stats.lowRisk}</span>
          <span className="stat-label">Low Risk</span>
        </div>
      </div>

      <div className="ads-grid">
        {dummyAds.map((ad) => (
          <AdDetectionCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default AdsDetector;