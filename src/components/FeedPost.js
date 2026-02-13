import React, { useState } from 'react';
import { FaHeart, FaComment, FaShare, FaBookmark } from 'react-icons/fa';
import AIScoreCard from './AIScoreCard';
import './FeedPost.css';

const FeedPost = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showAIScore, setShowAIScore] = useState(false);

  const getRiskClass = (score) => {
    if (score >= 70) return 'risk-high';
    if (score >= 40) return 'risk-medium';
    return 'risk-low';
  };

  return (
    <div className="feed-post">
      <div className="post-header">
        <div className="post-user">
          <div className={`user-avatar ${post.isAI ? 'ai-avatar' : ''}`}>
            <img src={post.avatar} alt={post.username} />
            {post.isAI && <span className="ai-badge-small">AI</span>}
          </div>
          <div className="user-info">
            <span className="username">{post.username}</span>
            {post.isAI && (
              <span className={`ai-risk-badge ${getRiskClass(post.aiScore)}`}>
                AI Risk: {post.aiScore}%
              </span>
            )}
          </div>
        </div>
        <button 
          className="ai-score-toggle"
          onClick={() => setShowAIScore(!showAIScore)}
        >
          🔍 AI Analysis
        </button>
      </div>

      <div className="post-media">
        <img src={post.image} alt="Post content" />
        {showAIScore && (
          <div className="ai-overlay">
            <AIScoreCard 
              aiScore={post.aiScore}
              amplificationRisk={post.amplificationRisk}
              deepfakeRisk={post.deepfakeRisk}
              botScore={post.botScore}
            />
          </div>
        )}
      </div>

      <div className="post-actions">
        <div className="actions-left">
          <button 
            className={`action-btn ${liked ? 'liked' : ''}`}
            onClick={() => setLiked(!liked)}
          >
            <FaHeart />
          </button>
          <button className="action-btn">
            <FaComment />
          </button>
          <button className="action-btn">
            <FaShare />
          </button>
        </div>
        <button 
          className={`action-btn ${saved ? 'saved' : ''}`}
          onClick={() => setSaved(!saved)}
        >
          <FaBookmark />
        </button>
      </div>

      <div className="post-stats">
        <span className="likes">{post.likes} likes</span>
        <span className="caption">
          <span className="username">{post.username}</span> {post.caption}
        </span>
        <span className="comments">View all {post.comments} comments</span>
        <span className="timestamp">{post.timestamp}</span>
      </div>
    </div>
  );
};

export default FeedPost;