import React from 'react';
import './StoriesBar.css';

const StoriesBar = () => {
  const stories = [
    {
      id: 1,
      username: 'ai_influencer',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop',
      isAI: true,
      aiProbability: 89,
      hasStory: true
    },
    {
      id: 2,
      username: 'real_human',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
      isAI: false,
      hasStory: true
    },
    {
      id: 3,
      username: 'deepfake_alert',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      isAI: true,
      aiProbability: 95,
      hasStory: true
    },
    {
      id: 4,
      username: 'verified_user',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      isAI: false,
      hasStory: false
    },
    {
      id: 5,
      username: 'synthetic_voice',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop',
      isAI: true,
      aiProbability: 76,
      hasStory: true
    },
    {
      id: 6,
      username: 'real_creator',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      isAI: false,
      hasStory: true
    },
    {
      id: 7,
      username: 'ai_artist',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
      isAI: true,
      aiProbability: 92,
      hasStory: true
    },
    {
      id: 8,
      username: 'tech_guru',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop',
      isAI: false,
      hasStory: true
    },
    {
      id: 9,
      username: 'digital_artist',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
      isAI: true,
      aiProbability: 88,
      hasStory: true
    }
  ];

  return (
    <div className="stories-wrapper">
      <div className="stories-container">
        {stories.map((story) => (
          <div key={story.id} className="story-item">
            <div className={`story-avatar-wrapper ${story.hasStory ? 'has-story' : 'no-story'} ${story.isAI ? 'ai-story' : ''}`}>
              <div className="story-avatar">
                <img src={story.avatar} alt={story.username} />
                {/* Removed AI badge */}
              </div>
              {story.hasStory && !story.isAI && (
                <div className="story-ring"></div>
              )}
              {story.isAI && (
                <div className="story-ring ai-ring"></div>
              )}
            </div>
            <div className="story-username">
              <span className="username-text">{story.username}</span>
              {story.isAI && <span className="ai-indicator">🤖</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesBar;