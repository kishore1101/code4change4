// src/components/ReelPlayer.js
import React, { useRef, useEffect, useState } from 'react';
import { FaHeart, FaComment, FaShare, FaBookmark, FaPlay } from 'react-icons/fa';
import AIScoreCard from './AIScoreCard';
import api from '../services/api';
import './ReelPlayer.css';

const ReelPlayer = ({ reel, isActive }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAIScore, setShowAIScore] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isActive && videoRef.current && !videoError) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive, videoError]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setVideoError(true));
      }
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  const analyzeVideo = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`🔍 Analyzing video ${reel.id} with backend...`);
      const result = await api.analyzeReel(reel);
      setAnalysis(result);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('Failed to analyze video');
    } finally {
      setLoading(false);
    }
  };

  const toggleAIScore = async () => {
    if (!showAIScore && !analysis) {
      await analyzeVideo();
    }
    setShowAIScore(!showAIScore);
  };

  return (
    <div className="reel-player">
      {!videoError ? (
        <video
          ref={videoRef}
          src={reel.video_url}
          loop
          playsInline
          onClick={togglePlay}
          className="reel-video"
          onError={handleVideoError}
        />
      ) : (
        <div className="video-error-placeholder">
          <div className="error-content">
            <span className="error-icon">🎥</span>
            <p>Video failed to load</p>
            <button className="retry-btn" onClick={() => setVideoError(false)}>
              Retry
            </button>
          </div>
        </div>
      )}
      
      {!isPlaying && !videoError && (
        <div className="play-overlay" onClick={togglePlay}>
          <FaPlay className="play-icon" />
        </div>
      )}

      <div className="reel-overlay">
        <div className="reel-user-info">
          <div className="user-avatar">
            <img src={reel.avatar} alt={reel.username} />
          </div>
          <div className="user-details">
            <span className="username">{reel.username}</span>
            <span className="caption">{reel.caption}</span>
          </div>
        </div>

        <div className="reel-actions">
          <button 
            className={`action-btn ${liked ? 'liked' : ''}`}
            onClick={() => setLiked(!liked)}
          >
            <FaHeart />
            <span>{reel.likes}</span>
          </button>
          <button className="action-btn">
            <FaComment />
            <span>{reel.comments}</span>
          </button>
          <button className="action-btn">
            <FaShare />
          </button>
          <button 
            className={`action-btn ${saved ? 'saved' : ''}`}
            onClick={() => setSaved(!saved)}
          >
            <FaBookmark />
          </button>
          <button 
            className="action-btn ai-btn"
            onClick={toggleAIScore}
          >
            🔍
            <span>AI</span>
          </button>
        </div>
      </div>

      {showAIScore && (
        <div className="reel-ai-overlay">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Analyzing video patterns...</p>
              <small>Checking 6 behavioral signals</small>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>❌ {error}</p>
              <button onClick={analyzeVideo} className="retry-btn">
                Retry Analysis
              </button>
            </div>
          ) : (
            <AIScoreCard 
              aiScore={analysis?.confidence || 0}
              amplificationRisk={analysis?.amplification_score || 0}
              deepfakeRisk={analysis?.deepfake_risk || 'Unknown'}
              botScore={analysis?.bot_score || 0}
              signals={analysis?.triggered_signals}
              confidence={analysis?.confidence}
              label={analysis?.label}
              tapDetail={analysis?.tap_detail}
              geminiInsights={analysis?.gemini_insights}
              abnormalCount={analysis?.abnormal_signal_count}
            />
          )}
          <button className="close-ai-btn" onClick={toggleAIScore}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ReelPlayer;