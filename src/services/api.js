// src/services/api.js
import { getInteractionsForVideo } from '../data/interactionPatterns';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  async analyzeReel(reelData) {
    try {
      // Get REAL interaction pattern for this specific video
      const interactions = getInteractionsForVideo(reelData.id);
      
      console.log(`🎬 Analyzing video ${reelData.id} at ${new Date().toISOString()}`);
      
      // Add timestamp to prevent caching
      const response = await fetch(`${API_BASE_URL}/analyze/reel?_=${Date.now()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({
          reel: {
            ...reelData,
            _timestamp: Date.now() // Add timestamp to force fresh analysis
          },
          interactions: interactions,
          use_gemini: true
        }),
      });
      
      const result = await response.json();
      console.log(`✅ Analysis for video ${reelData.id}: ${result.confidence}%`);
      return result;
    } catch (error) {
      console.error('❌ Analysis failed:', error);
      throw error;
    }
  }
};

export default api;