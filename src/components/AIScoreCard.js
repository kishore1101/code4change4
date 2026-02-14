// src/components/AIScoreCard.js
import React from 'react';
import './AIScoreCard.css';

const AIScoreCard = ({ 
  aiScore, 
  amplificationRisk, 
  deepfakeRisk, 
  botScore,
  signals = [],
  confidence,
  label,
  tapDetail,
  geminiInsights,
  abnormalCount
}) => {
  
  const getRiskClass = (score) => {
    if (score >= 70) return 'risk-high';
    if (score >= 40) return 'risk-medium';
    return 'risk-low';
  };

  const getRiskLevel = (score) => {
    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
  };

  return (
    <div className="ai-score-card glass-effect">
      <h4 className="score-title">
        <span className="gradient-text">Backend AI Analysis</span>
      </h4>
      
      {abnormalCount !== undefined && (
        <div className="signal-count">
          <span className="count-badge">{abnormalCount}/6</span>
          <span className="count-label">Abnormal Signals Detected</span>
        </div>
      )}
      
      {label && (
        <div className="instagram-label">
          <span className="label-badge">{label}</span>
          {tapDetail && <p className="tap-detail">{tapDetail}</p>}
        </div>
      )}
      
      <div className="score-grid">
        <div className="score-item">
          <div className="score-label">
            <span>AI Generated Probability</span>
            <span className={`risk-badge ${getRiskClass(aiScore)}`}>
              {getRiskLevel(aiScore)}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className={`progress-fill ${getRiskClass(aiScore)}`}
              style={{ width: `${aiScore}%` }}
            />
          </div>
          <span className="score-value">{aiScore}%</span>
        </div>

        <div className="score-item">
          <div className="score-label">
            <span>Amplification Risk</span>
            <span className={`risk-badge ${getRiskClass(amplificationRisk)}`}>
              {getRiskLevel(amplificationRisk)}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className={`progress-fill ${getRiskClass(amplificationRisk)}`}
              style={{ width: `${amplificationRisk}%` }}
            />
          </div>
          <span className="score-value">{amplificationRisk}%</span>
        </div>

        <div className="score-item">
          <div className="score-label">
            <span>Bot Engagement</span>
            <span className={`risk-badge ${getRiskClass(botScore)}`}>
              {getRiskLevel(botScore)}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className={`progress-fill ${getRiskClass(botScore)}`}
              style={{ width: `${botScore}%` }}
            />
          </div>
          <span className="score-value">{botScore}%</span>
        </div>

        <div className="deepfake-status">
          <span className="status-label">Deepfake Risk:</span>
          <span className={`status-value ${(deepfakeRisk || 'Low').toLowerCase()}`}>
            {deepfakeRisk || 'Low'}
          </span>
        </div>

        {signals && signals.length > 0 && (
          <div className="signals-detected">
            <span className="signals-title">⚠️ Detected Patterns:</span>
            <ul className="signals-list">
              {signals.map((signal, index) => (
                <li key={index}>{signal}</li>
              ))}
            </ul>
          </div>
        )}

        {geminiInsights && (
          <div className="gemini-insights">
            <div className="insight-header">
              <span className="gemini-icon">🤖</span>
              <span className="gemini-title">Gemini AI Insights</span>
            </div>
            {geminiInsights.summary && (
              <div className="insight-item">
                <span>{geminiInsights.summary}</span>
              </div>
            )}
            {geminiInsights.risk_factors && (
              <div className="insight-item risk">
                <span>⚠️ {geminiInsights.risk_factors}</span>
              </div>
            )}
            {geminiInsights.recommendation && (
              <div className="insight-item recommendation">
                <span>💡 {geminiInsights.recommendation}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="score-footer">
        <div className="neon-indicator"></div>
        <span>Real-time Backend Analysis • {confidence ? `${confidence}% confidence` : 'Powered by ML'}</span>
      </div>
    </div>
  );
};

export default AIScoreCard;