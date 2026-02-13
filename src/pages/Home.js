import React from 'react';
import StoriesBar from '../components/StoriesBar';
import FeedPost from '../components/FeedPost';
import { dummyPosts } from '../data/dummyData';
import './Home.css';

const Home = () => {
  // Sample suggestions data
  const suggestions = [
    {
      id: 1,
      username: 'ai_artist',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop',
      bio: 'Digital artist',
      followers: '2.5M'
    },
    {
      id: 2,
      username: 'tech_reviewer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
      bio: 'Tech enthusiast',
      followers: '1.2M'
    },
    {
      id: 3,
      username: 'photo_daily',
      avatar: 'https://images.unsplash.com/photo-1494790108777-847ef5c6c6e5?w=40&h=40&fit=crop',
      bio: 'Photography',
      followers: '3.8M'
    },
    {
      id: 4,
      username: 'music_lover',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop',
      bio: 'Music producer',
      followers: '954K'
    },
    {
      id: 5,
      username: 'fitness_guru',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop',
      bio: 'Fitness coach',
      followers: '1.8M'
    }
  ];

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Main Feed Section */}
        <div className="feed-section">
          <StoriesBar />
          <div className="feed-posts">
            {dummyPosts.map((post) => (
              <FeedPost key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sticky Suggestions Panel */}
        <div className="suggestions-panel">
          <div className="suggestions-card">
            <div className="current-user">
              <div className="user-avatar">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop" alt="current user" />
              </div>
              <div className="user-info">
                <span className="username">current_user</span>
                <span className="user-fullname">Current User</span>
              </div>
              <button className="switch-btn">Switch</button>
            </div>

            <div className="suggestions-header">
              <span className="suggestions-title">Suggestions For You</span>
              <button className="see-all-btn">See All</button>
            </div>

            <div className="suggestions-list">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="suggestion-item">
                  <div className="suggestion-avatar">
                    <img src={suggestion.avatar} alt={suggestion.username} />
                  </div>
                  <div className="suggestion-info">
                    <span className="suggestion-username">{suggestion.username}</span>
                    <span className="suggestion-bio">{suggestion.bio}</span>
                    <span className="suggestion-followers">Followed by {suggestion.followers}</span>
                  </div>
                  <button className="follow-btn">Follow</button>
                </div>
              ))}
            </div>

            <div className="suggestions-footer">
              <p className="footer-links">
                About · Help · Press · API · Jobs · Privacy · Terms
              </p>
              <p className="copyright">© 2026 AI DETECTOR FROM META</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;