import React, { useRef, useEffect, useState } from 'react';
import { FaHeart, FaComment, FaShare, FaBookmark, FaPlay } from 'react-icons/fa';
import AIScoreCard from './AIScoreCard';
import './ReelPlayer.css';

const ReelPlayer = ({ reel, isActive }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAIScore, setShowAIScore] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoAspectRatio, setVideoAspectRatio] = useState('portrait');

  useEffect(() => {
    if (isActive && videoRef.current && !videoError) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.log('Video playback error:', error);
            setIsPlaying(false);
          });
      }
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive, videoError]);

  useEffect(() => {
    // Check video aspect ratio when metadata is loaded
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        const ratio = video.videoWidth / video.videoHeight;
        if (ratio > 1) {
          setVideoAspectRatio('landscape');
        } else if (ratio < 1) {
          setVideoAspectRatio('portrait');
        } else {
          setVideoAspectRatio('square');
        }
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.log('Video playback error:', error);
              setVideoError(true);
            });
        }
      }
    }
  };

  const handleVideoError = (e) => {
    console.log('Video failed to load:', reel.video_url, e);
    setVideoError(true);
  };

  const toggleAIScore = () => {
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
          className={`reel-video ${videoAspectRatio}`}
          onError={handleVideoError}
          preload="auto"
        />
      ) : (
        <div className="video-error-placeholder">
          <div className="error-content">
            <span className="error-icon">🎥</span>
            <p>Video failed to load</p>
            <small>{reel.video_url}</small>
            <button 
              className="retry-btn"
              onClick={() => setVideoError(false)}
            >
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
          <div className={`user-avatar ${reel.isAI ? 'ai-avatar' : ''}`}>
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
          <AIScoreCard 
            aiScore={reel.ai_score}
            amplificationRisk={reel.amplification_score}
            deepfakeRisk={reel.deepfake_risk}
            botScore={reel.bot_score}
          />
          <button 
            className="close-ai-btn"
            onClick={toggleAIScore}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ReelPlayer;