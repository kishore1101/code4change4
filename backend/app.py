#!/usr/bin/env python3
"""
Flask Backend for Instagram AI Confidence Labeler
FINAL FIXED VERSION - Each video gets UNIQUE analysis
"""

import os
import sys
import pandas as pd
import numpy as np
import json
import hashlib
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from src.loader import InteractionDataLoader
    from src.detector import InstagramAIConfidenceLabeler
    print("✅ Successfully imported backend modules")
except ImportError as e:
    print(f"⚠️ Import error: {e}")
    sys.exit(1)

app = Flask(__name__)
CORS(app)

# Disable all caching
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

def get_labeler():
    gemini_key = os.getenv('GEMINI_API_KEY')
    return InstagramAIConfidenceLabeler(gemini_api_key=gemini_key)

def generate_deterministic_interactions(video_id, video_num):
    """
    Generate UNIQUE and DETERMINISTIC interactions based on video ID
    Same video ID will ALWAYS get the same pattern
    Different video IDs will get DIFFERENT patterns
    """
    
    # Use video_id to create a deterministic seed
    seed_value = int(hashlib.md5(str(video_id).encode()).hexdigest()[:8], 16)
    random_state = np.random.RandomState(seed_value)
    
    base_time = datetime.now() - timedelta(hours=2)
    interactions = []
    
    # Define DIFFERENT patterns for different video numbers
    if video_num in [1, 5, 9]:  # PATTERN A: Bot Network (High AI scores)
        print(f"   📊 Pattern A (Bot Network) for video {video_id}")
        users = [f"bot_{i:03d}" for i in range(1, 11)]
        base_minute = 0
        
        for i in range(45):  # 45 interactions
            user_idx = i % 10
            minute_offset = base_minute + (i // 3)  # Very regular timing
            
            # Create synchronized timestamps (within same second)
            second_offset = random_state.choice([0, 1, 2])
            timestamp = (base_time + timedelta(minutes=minute_offset, seconds=second_offset)).strftime('%Y-%m-%d %H:%M:%S')
            
            # Action distribution skewed towards shares/reposts
            action_rand = random_state.random()
            if action_rand < 0.3:
                action = 'like'
            elif action_rand < 0.6:
                action = 'share'
            elif action_rand < 0.8:
                action = 'repost'
            else:
                action = 'comment'
            
            interactions.append({
                'user_id': users[user_idx],
                'timestamp': timestamp,
                'action_type': action
            })
    
    elif video_num in [2, 6, 10]:  # PATTERN B: Real Human (Low AI scores)
        print(f"   📊 Pattern B (Real Human) for video {video_id}")
        # 25 different real users
        minute_offsets = []
        for i in range(25):
            # Natural random distribution
            minute_offsets.append(random_state.uniform(5, 120))
        
        minute_offsets.sort()
        
        for i, minute_offset in enumerate(minute_offsets[:25]):
            user_id = f"user_{1000 + i + (video_num * 100)}"
            timestamp = (base_time + timedelta(minutes=minute_offset)).strftime('%Y-%m-%d %H:%M:%S')
            
            # Natural action distribution (mostly likes)
            action_rand = random_state.random()
            if action_rand < 0.7:
                action = 'like'
            elif action_rand < 0.85:
                action = 'comment'
            elif action_rand < 0.95:
                action = 'share'
            else:
                action = 'repost'
            
            interactions.append({
                'user_id': user_id,
                'timestamp': timestamp,
                'action_type': action
            })
    
    elif video_num in [3, 7]:  # PATTERN C: Coordinated Attack (Very High AI)
        print(f"   📊 Pattern C (Coordinated Attack) for video {video_id}")
        users = [f"attacker_{i:03d}" for i in range(1, 8)]
        
        for i in range(35):
            user_idx = i % 7
            # Extremely fast: all within 10 minutes
            minute_offset = i * 0.3  # Every 18 seconds!
            timestamp = (base_time + timedelta(minutes=minute_offset)).strftime('%Y-%m-%d %H:%M:%S')
            
            # Almost all are shares/reposts (amplification)
            action_rand = random_state.random()
            if action_rand < 0.2:
                action = 'like'
            elif action_rand < 0.6:
                action = 'share'
            elif action_rand < 0.9:
                action = 'repost'
            else:
                action = 'comment'
            
            interactions.append({
                'user_id': users[user_idx],
                'timestamp': timestamp,
                'action_type': action
            })
    
    elif video_num in [4, 8]:  # PATTERN D: Organic Spread (Low AI)
        print(f"   📊 Pattern D (Organic Spread) for video {video_id}")
        # Many unique users, spread over time
        for i in range(30):
            user_id = f"organic_{2000 + i + (video_num * 50)}"
            minute_offset = random_state.uniform(10, 180)  # Spread over 3 hours
            timestamp = (base_time + timedelta(minutes=minute_offset)).strftime('%Y-%m-%d %H:%M:%S')
            
            # Natural distribution
            action_rand = random_state.random()
            if action_rand < 0.8:
                action = 'like'
            elif action_rand < 0.9:
                action = 'comment'
            else:
                action = 'share'
            
            interactions.append({
                'user_id': user_id,
                'timestamp': timestamp,
                'action_type': action
            })
    
    else:  # Default pattern
        print(f"   📊 Default pattern for video {video_id}")
        for i in range(20):
            user_id = f"user_{3000 + i}"
            minute_offset = random_state.uniform(1, 60)
            timestamp = (base_time + timedelta(minutes=minute_offset)).strftime('%Y-%m-%d %H:%M:%S')
            
            interactions.append({
                'user_id': user_id,
                'timestamp': timestamp,
                'action_type': 'like' if random_state.random() < 0.7 else 'comment'
            })
    
    print(f"   Generated {len(interactions)} interactions for video {video_id}")
    return interactions

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/analyze/reel', methods=['POST'])
def analyze_reel():
    """Analyze a reel with UNIQUE patterns per video"""
    try:
        data = request.json
        reel_data = data.get('reel', {})
        frontend_interactions = data.get('interactions', [])
        
        # Get video ID
        video_id = reel_data.get('id', 'unknown')
        try:
            video_num = int(video_id)
        except:
            video_num = 1
        
        print(f"\n{'='*60}")
        print(f"🔍 ANALYZING VIDEO {video_id} at {datetime.now().strftime('%H:%M:%S')}")
        print(f"{'='*60}")
        
        # Create FRESH labeler
        labeler = get_labeler()
        
        # Use frontend interactions if provided, otherwise generate deterministic ones
        if frontend_interactions and len(frontend_interactions) > 0:
            print(f"📊 Using {len(frontend_interactions)} frontend-provided interactions")
            interactions = frontend_interactions
        else:
            print(f"📊 Generating deterministic interactions for video {video_id}")
            interactions = generate_deterministic_interactions(video_id, video_num)
        
        # Create DataFrame
        df = pd.DataFrame(interactions)
        df['post_id'] = f"reel_{video_id}_{datetime.now().timestamp()}"
        
        # Print sample for debugging
        print(f"\n📋 Sample interactions for video {video_id}:")
        for i, row in df.head(3).iterrows():
            print(f"   {row['timestamp']} - {row['user_id']} - {row['action_type']}")
        print(f"   ... and {len(df)-3} more")
        
        # Analyze
        result = labeler.analyze_post(f"reel_{video_id}", df, use_gemini=True)
        
        # Add metadata
        result['video_id'] = video_id
        result['reel_metadata'] = {
            'username': reel_data.get('username'),
            'caption': reel_data.get('caption')
        }
        
        # Log result
        print(f"\n✅ RESULT FOR VIDEO {video_id}:")
        print(f"   Confidence: {result.get('confidence', 0)}%")
        print(f"   Label: {result.get('label', 'No label')}")
        print(f"   Abnormal signals: {result.get('abnormal_signal_count', 0)}/6")
        if result.get('triggered_signals'):
            for signal in result['triggered_signals']:
                print(f"   • {signal}")
        
        # Convert types
        result = convert_numpy_types(result)
        
        # No-cache headers
        response = jsonify(result)
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        
        return response
    
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

def convert_numpy_types(obj):
    """Convert numpy types to Python native types"""
    if obj is None:
        return None
    if isinstance(obj, dict):
        return {key: convert_numpy_types(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_numpy_types(item) for item in obj]
    elif hasattr(obj, 'item'):
        return obj.item()
    elif isinstance(obj, (np.integer, np.int64, np.int32)):
        return int(obj)
    elif isinstance(obj, (np.floating, np.float64, np.float32)):
        return float(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    elif isinstance(obj, pd.Timestamp):
        return obj.strftime('%Y-%m-%d %H:%M:%S')
    elif pd.isna(obj):
        return None
    else:
        return obj

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 INSTAGRAM AI DETECTOR - FINAL FIXED VERSION")
    print("="*60)
    print("✅ Each video gets UNIQUE deterministic patterns")
    print("✅ No caching - fresh analysis every time")
    print("✅ Based on video ID: 1,5,9 → Bot Network (High AI)")
    print("✅ Based on video ID: 2,6,10 → Real Human (Low AI)")
    print("✅ Based on video ID: 3,7 → Coordinated Attack (Very High AI)")
    print("✅ Based on video ID: 4,8 → Organic Spread (Low AI)")
    print("="*60)
    app.run(debug=True, port=5000, threaded=True)