// src/data/interactionPatterns.js
// REALISTIC interaction patterns for each video

export const videoPatterns = {
  // Video 1 - AI Generated Influencer (should show HIGH AI scores)
  "1": {
    pattern: "bot_network",
    interactions: [
      // Pattern 1: Very fast, synchronized interactions (bot-like)
      { user_id: "bot_101", timestamp: "2026-02-14 10:00:01", action_type: "like" },
      { user_id: "bot_102", timestamp: "2026-02-14 10:00:01", action_type: "like" },
      { user_id: "bot_103", timestamp: "2026-02-14 10:00:02", action_type: "comment" },
      { user_id: "bot_104", timestamp: "2026-02-14 10:00:02", action_type: "share" },
      { user_id: "bot_105", timestamp: "2026-02-14 10:00:03", action_type: "like" },
      { user_id: "bot_101", timestamp: "2026-02-14 10:00:03", action_type: "comment" },
      { user_id: "bot_102", timestamp: "2026-02-14 10:00:04", action_type: "share" },
      { user_id: "bot_106", timestamp: "2026-02-14 10:00:04", action_type: "like" },
      { user_id: "bot_103", timestamp: "2026-02-14 10:00:05", action_type: "like" },
      { user_id: "bot_104", timestamp: "2026-02-14 10:00:05", action_type: "comment" },
      { user_id: "bot_107", timestamp: "2026-02-14 10:00:06", action_type: "share" },
      { user_id: "bot_105", timestamp: "2026-02-14 10:00:06", action_type: "like" },
      { user_id: "bot_108", timestamp: "2026-02-14 10:00:07", action_type: "comment" },
      { user_id: "bot_106", timestamp: "2026-02-14 10:00:07", action_type: "share" },
      { user_id: "bot_109", timestamp: "2026-02-14 10:00:08", action_type: "like" },
      // More interactions showing bot patterns
      { user_id: "bot_110", timestamp: "2026-02-14 10:00:09", action_type: "like" },
      { user_id: "bot_107", timestamp: "2026-02-14 10:00:09", action_type: "comment" },
      { user_id: "bot_108", timestamp: "2026-02-14 10:00:10", action_type: "share" },
      { user_id: "bot_111", timestamp: "2026-02-14 10:00:10", action_type: "like" },
    ]
  },

  // Video 2 - Real Human Video (should show LOW AI scores)
  "2": {
    pattern: "organic",
    interactions: [
      // Pattern 2: Natural, spread out interactions (real human behavior)
      { user_id: "user_201", timestamp: "2026-02-14 14:23:15", action_type: "like" },
      { user_id: "user_202", timestamp: "2026-02-14 14:25:42", action_type: "comment" },
      { user_id: "user_203", timestamp: "2026-02-14 14:28:03", action_type: "like" },
      { user_id: "user_204", timestamp: "2026-02-14 14:32:18", action_type: "share" },
      { user_id: "user_205", timestamp: "2026-02-14 14:36:54", action_type: "like" },
      { user_id: "user_201", timestamp: "2026-02-14 14:41:22", action_type: "comment" },
      { user_id: "user_206", timestamp: "2026-02-14 14:47:33", action_type: "like" },
      { user_id: "user_207", timestamp: "2026-02-14 14:52:17", action_type: "repost" },
      { user_id: "user_202", timestamp: "2026-02-14 14:58:46", action_type: "like" },
      { user_id: "user_208", timestamp: "2026-02-14 15:05:09", action_type: "comment" },
      { user_id: "user_203", timestamp: "2026-02-14 15:12:31", action_type: "share" },
      { user_id: "user_209", timestamp: "2026-02-14 15:18:55", action_type: "like" },
      { user_id: "user_204", timestamp: "2026-02-14 15:25:14", action_type: "like" },
      { user_id: "user_210", timestamp: "2026-02-14 15:32:42", action_type: "comment" },
      { user_id: "user_205", timestamp: "2026-02-14 15:38:27", action_type: "like" },
    ]
  },

  // Video 3 - AI Synthetic Voice (should show HIGH AI scores)
  "3": {
    pattern: "organic",
    interactions: [
      // Pattern 2: Natural, spread out interactions (real human behavior)
      { user_id: "user_201", timestamp: "2026-02-14 14:23:15", action_type: "like" },
      { user_id: "user_202", timestamp: "2026-02-14 14:25:42", action_type: "comment" },
      { user_id: "user_203", timestamp: "2026-02-14 14:28:03", action_type: "like" },
      { user_id: "user_204", timestamp: "2026-02-14 14:32:18", action_type: "share" },
      { user_id: "user_205", timestamp: "2026-02-14 14:36:54", action_type: "like" },
      { user_id: "user_201", timestamp: "2026-02-14 14:41:22", action_type: "comment" },
      { user_id: "user_206", timestamp: "2026-02-14 14:47:33", action_type: "like" },
      { user_id: "user_207", timestamp: "2026-02-14 14:52:17", action_type: "repost" },
      { user_id: "user_202", timestamp: "2026-02-14 14:58:46", action_type: "like" },
      { user_id: "user_208", timestamp: "2026-02-14 15:05:09", action_type: "comment" },
      { user_id: "user_203", timestamp: "2026-02-14 15:12:31", action_type: "share" },
      { user_id: "user_209", timestamp: "2026-02-14 15:18:55", action_type: "like" },
      { user_id: "user_204", timestamp: "2026-02-14 15:25:14", action_type: "like" },
      { user_id: "user_210", timestamp: "2026-02-14 15:32:42", action_type: "comment" },
      { user_id: "user_205", timestamp: "2026-02-14 15:38:27", action_type: "like" },
    ]
  },

  // Video 4 - Real Dance Video (should show LOW AI scores)
  "4": {
    pattern: "regular_intervals",
    interactions: [
      // Pattern 3: Very regular intervals (bot-like)
      { user_id: "bot_301", timestamp: "2026-02-14 09:00:00", action_type: "like" },
      { user_id: "bot_302", timestamp: "2026-02-14 09:00:05", action_type: "like" },
      { user_id: "bot_303", timestamp: "2026-02-14 09:00:10", action_type: "comment" },
      { user_id: "bot_304", timestamp: "2026-02-14 09:00:15", action_type: "share" },
      { user_id: "bot_305", timestamp: "2026-02-14 09:00:20", action_type: "like" },
      { user_id: "bot_301", timestamp: "2026-02-14 09:00:25", action_type: "comment" },
      { user_id: "bot_302", timestamp: "2026-02-14 09:00:30", action_type: "share" },
      { user_id: "bot_306", timestamp: "2026-02-14 09:00:35", action_type: "like" },
      { user_id: "bot_303", timestamp: "2026-02-14 09:00:40", action_type: "like" },
      { user_id: "bot_304", timestamp: "2026-02-14 09:00:45", action_type: "comment" },
    ]

  },

  // Video 5 - AI Deepfake (should show VERY HIGH AI scores)
  "5": {
    pattern: "coordinated_attack",
    interactions: [
     { user_id: "user_201", timestamp: "2026-02-14 14:23:15", action_type: "like" },
      { user_id: "user_202", timestamp: "2026-02-14 14:25:42", action_type: "comment" },
      { user_id: "user_203", timestamp: "2026-02-14 14:28:03", action_type: "like" },
      { user_id: "user_204", timestamp: "2026-02-14 14:32:18", action_type: "share" },
      { user_id: "user_205", timestamp: "2026-02-14 14:36:54", action_type: "like" },
      { user_id: "user_201", timestamp: "2026-02-14 14:41:22", action_type: "comment" },
      { user_id: "user_206", timestamp: "2026-02-14 14:47:33", action_type: "like" },
      { user_id: "user_207", timestamp: "2026-02-14 14:52:17", action_type: "repost" },
      { user_id: "user_202", timestamp: "2026-02-14 14:58:46", action_type: "like" },
      { user_id: "user_208", timestamp: "2026-02-14 15:05:09", action_type: "comment" },
      { user_id: "user_203", timestamp: "2026-02-14 15:12:31", action_type: "share" },
      { user_id: "user_209", timestamp: "2026-02-14 15:18:55", action_type: "like" },
      { user_id: "user_204", timestamp: "2026-02-14 15:25:14", action_type: "like" },
      { user_id: "user_210", timestamp: "2026-02-14 15:32:42", action_type: "comment" },
      { user_id: "user_205", timestamp: "2026-02-14 15:38:27", action_type: "like" },
    ]
  },

  // Video 6 - Real Cooking Video (LOW AI scores)
  "6": {
    pattern: "afternoon_cooking",
    interactions: [
      { user_id: "user_601", timestamp: "2026-02-14 12:05:23", action_type: "like" },
      { user_id: "user_602", timestamp: "2026-02-14 12:08:47", action_type: "comment" },
      { user_id: "user_603", timestamp: "2026-02-14 12:12:15", action_type: "like" },
      { user_id: "user_604", timestamp: "2026-02-14 12:18:32", action_type: "share" },
      { user_id: "user_605", timestamp: "2026-02-14 12:24:56", action_type: "like" },
    ]
  },

  // Video 7 - AI Anime (HIGH AI scores)
  "7": {
    pattern: "anime_fans",
    interactions: [
      { user_id: "user_201", timestamp: "2026-02-14 14:23:15", action_type: "like" },
      { user_id: "user_202", timestamp: "2026-02-14 14:25:42", action_type: "comment" },
      { user_id: "user_203", timestamp: "2026-02-14 14:28:03", action_type: "like" },
      { user_id: "user_204", timestamp: "2026-02-14 14:32:18", action_type: "share" },
      { user_id: "user_205", timestamp: "2026-02-14 14:36:54", action_type: "like" },
      { user_id: "user_201", timestamp: "2026-02-14 14:41:22", action_type: "comment" },
      { user_id: "user_206", timestamp: "2026-02-14 14:47:33", action_type: "like" },
      { user_id: "user_207", timestamp: "2026-02-14 14:52:17", action_type: "repost" },
      { user_id: "user_202", timestamp: "2026-02-14 14:58:46", action_type: "like" },
      { user_id: "user_208", timestamp: "2026-02-14 15:05:09", action_type: "comment" },
      { user_id: "user_203", timestamp: "2026-02-14 15:12:31", action_type: "share" },
      { user_id: "user_209", timestamp: "2026-02-14 15:18:55", action_type: "like" },
      { user_id: "user_204", timestamp: "2026-02-14 15:25:14", action_type: "like" },
      { user_id: "user_210", timestamp: "2026-02-14 15:32:42", action_type: "comment" },
      { user_id: "user_205", timestamp: "2026-02-14 15:38:27", action_type: "like" },
    ]
  },

  // Video 8 - Real Fitness (LOW AI scores)
  "8": {
    pattern: "morning_workout",
    interactions: [
      { user_id: "bot_101", timestamp: "2026-02-14 10:00:01", action_type: "like" },
      { user_id: "bot_102", timestamp: "2026-02-14 10:00:01", action_type: "like" },
      { user_id: "bot_103", timestamp: "2026-02-14 10:00:02", action_type: "comment" },
      { user_id: "bot_104", timestamp: "2026-02-14 10:00:02", action_type: "share" },
      { user_id: "bot_105", timestamp: "2026-02-14 10:00:03", action_type: "like" },
      { user_id: "bot_101", timestamp: "2026-02-14 10:00:03", action_type: "comment" },
      { user_id: "bot_102", timestamp: "2026-02-14 10:00:04", action_type: "share" },
      { user_id: "bot_106", timestamp: "2026-02-14 10:00:04", action_type: "like" },
      { user_id: "bot_103", timestamp: "2026-02-14 10:00:05", action_type: "like" },
      { user_id: "bot_104", timestamp: "2026-02-14 10:00:05", action_type: "comment" },
      { user_id: "bot_107", timestamp: "2026-02-14 10:00:06", action_type: "share" },
      { user_id: "bot_105", timestamp: "2026-02-14 10:00:06", action_type: "like" },
      { user_id: "bot_108", timestamp: "2026-02-14 10:00:07", action_type: "comment" },
      { user_id: "bot_106", timestamp: "2026-02-14 10:00:07", action_type: "share" },
      { user_id: "bot_109", timestamp: "2026-02-14 10:00:08", action_type: "like" },
      
    ]
  },

  // Video 9 - AI Business (MEDIUM-HIGH AI scores)
  "9": {
    pattern: "business_bots",
    interactions: [
      { user_id: "bot_901", timestamp: "2026-02-14 11:00:03", action_type: "like" },
      { user_id: "bot_902", timestamp: "2026-02-14 11:00:06", action_type: "comment" },
      { user_id: "bot_903", timestamp: "2026-02-14 11:00:09", action_type: "share" },
      { user_id: "bot_904", timestamp: "2026-02-14 11:00:12", action_type: "like" },
      { user_id: "user_905", timestamp: "2026-02-14 11:05:18", action_type: "like" },
      { user_id: "user_906", timestamp: "2026-02-14 11:12:34", action_type: "comment" },
    ]
  },

  // Video 10 - Real Pet (LOW AI scores)
  "10": {
    pattern: "cute_pets",
    interactions: [
      { user_id: "user_201", timestamp: "2026-02-14 14:23:15", action_type: "like" },
      { user_id: "user_202", timestamp: "2026-02-14 14:25:42", action_type: "comment" },
      { user_id: "user_203", timestamp: "2026-02-14 14:28:03", action_type: "like" },
      { user_id: "user_204", timestamp: "2026-02-14 14:32:18", action_type: "share" },
      { user_id: "user_205", timestamp: "2026-02-14 14:36:54", action_type: "like" },
      { user_id: "user_201", timestamp: "2026-02-14 14:41:22", action_type: "comment" },
      { user_id: "user_206", timestamp: "2026-02-14 14:47:33", action_type: "like" },
      { user_id: "user_207", timestamp: "2026-02-14 14:52:17", action_type: "repost" },
      { user_id: "user_202", timestamp: "2026-02-14 14:58:46", action_type: "like" },
      { user_id: "user_208", timestamp: "2026-02-14 15:05:09", action_type: "comment" },
      { user_id: "user_203", timestamp: "2026-02-14 15:12:31", action_type: "share" },
      { user_id: "user_209", timestamp: "2026-02-14 15:18:55", action_type: "like" },
      { user_id: "user_204", timestamp: "2026-02-14 15:25:14", action_type: "like" },
      { user_id: "user_210", timestamp: "2026-02-14 15:32:42", action_type: "comment" },
      { user_id: "user_205", timestamp: "2026-02-14 15:38:27", action_type: "like" },
    ]
  }
};

// Function to get interactions for a specific video
export const getInteractionsForVideo = (videoId) => {
  const videoPattern = videoPatterns[videoId];
  
  if (videoPattern) {
    console.log(`📊 Using ${videoPattern.pattern} pattern for video ${videoId}`);
    return videoPattern.interactions;
  }
  
  // Default fallback - mix of patterns
  console.log(`⚠️ No pattern found for video ${videoId}, using default`);
  return videoPatterns["2"].interactions; // Default to organic pattern
};