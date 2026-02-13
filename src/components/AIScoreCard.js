import React from 'react';
import './AIScoreCard.css';

const AIScoreCard = ({ 
  aiScore, 
  amplificationRisk, 
  deepfakeRisk, 
  botScore 
}) => {
  const getRiskLevel = (score) => {
    if (score >= 70) return { level: 'High', class: 'risk-high' };
    if (score >= 40) return { level: 'Medium', class: 'risk-medium' };
    return { level: 'Low', class: 'risk-low' };
  };

  const aiRisk = getRiskLevel(aiScore);
  const ampRisk = getRiskLevel(amplificationRisk);
  const botRisk = getRiskLevel(botScore);

  return (
    <div className="ai-score-card glass-effect">
      <h4 className="score-title">
        <span className="gradient-text">AI Detection Analysis</span>
      </h4>
      
      <div className="score-grid">
        <div className="score-item">
          <div className="score-label">
            <span>AI Generated</span>
            <span className={`risk-badge ${aiRisk.class}`}>
              {aiRisk.level}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className={`progress-fill ${aiRisk.class}`}
              style={{ width: `${aiScore}%` }}
            />
          </div>
          <span className="score-value">{aiScore}%</span>
        </div>

        <div className="score-item">
          <div className="score-label">
            <span>Amplification Risk</span>
            <span className={`risk-badge ${ampRisk.class}`}>
              {ampRisk.level}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className={`progress-fill ${ampRisk.class}`}
              style={{ width: `${amplificationRisk}%` }}
            />
          </div>
          <span className="score-value">{amplificationRisk}%</span>
        </div>

        <div className="score-item">
          <div className="score-label">
            <span>Bot Engagement</span>
            <span className={`risk-badge ${botRisk.class}`}>
              {botRisk.level}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className={`progress-fill ${botRisk.class}`}
              style={{ width: `${botScore}%` }}
            />
          </div>
          <span className="score-value">{botScore}%</span>
        </div>

        <div className="deepfake-status">
          <span className="status-label">Deepfake Risk:</span>
          <span className={`status-value ${deepfakeRisk.toLowerCase()}`}>
            {deepfakeRisk}
          </span>
        </div>
      </div>

      <div className="score-footer">
        <div className="neon-indicator"></div>
        <span>Real-time AI Analysis</span>
      </div>
    </div>
  );
};

export default AIScoreCard;