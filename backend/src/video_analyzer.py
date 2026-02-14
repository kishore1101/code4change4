"""
Video Analysis Module for AI Content Detection
Automatically analyzes videos for AI-generated content patterns
"""

import cv2
import numpy as np
import librosa
import os
import tempfile
from skimage.metrics import structural_similarity as ssim
from sklearn.ensemble import RandomForestClassifier
from PIL import Image
import moviepy.editor as mp
from typing import Dict, Tuple, List
import json

class VideoAIAnalyzer:
    """
    Analyzes videos for AI-generated content patterns using multiple signals:
    - Facial analysis (for deepfakes)
    - Audio analysis (for synthetic voice)
    - Temporal consistency (for frame artifacts)
    - Metadata analysis (for generation patterns)
    """
    
    def __init__(self):
        self.model = None
        self.thresholds = {
            'face_consistency': 0.75,  # Lower = more likely AI
            'audio_naturalness': 0.70,  # Lower = more synthetic
            'frame_artifact': 0.65,     # Higher = more artifacts
            'temporal_coherence': 0.80   # Lower = less coherent
        }
        
    def extract_frames(self, video_path: str, num_frames: int = 30) -> List[np.ndarray]:
        """Extract frames from video for analysis"""
        frames = []
        cap = cv2.VideoCapture(video_path)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        # Sample frames evenly
        indices = np.linspace(0, total_frames-1, num_frames, dtype=int)
        
        for idx in indices:
            cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
            ret, frame = cap.read()
            if ret:
                frames.append(frame)
        
        cap.release()
        return frames
    
    def analyze_facial_consistency(self, frames: List[np.ndarray]) -> float:
        """
        Analyze facial consistency across frames
        Low consistency suggests AI-generated or deepfake content
        """
        try:
            # Load pre-trained face detector
            face_cascade = cv2.CascadeClassifier(
                cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
            )
            
            face_scores = []
            
            for i in range(len(frames) - 1):
                # Detect faces in consecutive frames
                faces1 = face_cascade.detectMultiScale(frames[i])
                faces2 = face_cascade.detectMultiScale(frames[i + 1])
                
                if len(faces1) > 0 and len(faces2) > 0:
                    # Compare face regions
                    x1, y1, w1, h1 = faces1[0]
                    x2, y2, w2, h2 = faces2[0]
                    
                    face1 = frames[i][y1:y1+h1, x1:x1+w1]
                    face2 = frames[i+1][y2:y2+h2, x2:x2+w2]
                    
                    # Resize to same dimensions
                    face1 = cv2.resize(face1, (100, 100))
                    face2 = cv2.resize(face2, (100, 100))
                    
                    # Convert to grayscale
                    gray1 = cv2.cvtColor(face1, cv2.COLOR_BGR2GRAY)
                    gray2 = cv2.cvtColor(face2, cv2.COLOR_BGR2GRAY)
                    
                    # Calculate SSIM
                    score, _ = ssim(gray1, gray2, full=True)
                    face_scores.append(score)
            
            if face_scores:
                return np.mean(face_scores)
            return 0.8  # Default if no faces detected
            
        except Exception as e:
            print(f"Face analysis error: {e}")
            return 0.5
    
    def analyze_audio(self, video_path: str) -> Dict[str, float]:
        """
        Analyze audio for synthetic voice patterns
        """
        try:
            # Extract audio from video
            video = mp.VideoFileClip(video_path)
            if video.audio is None:
                return {'naturalness': 0.8, 'pitch_variance': 0.7, 'rhythm_regularity': 0.7}
            
            # Save audio temporarily
            with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp:
                audio_path = tmp.name
                video.audio.write_audiofile(audio_path, logger=None)
            
            # Load audio with librosa
            y, sr = librosa.load(audio_path)
            
            # Extract features
            # 1. Pitch variation (AI voices often have less variation)
            pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
            pitch_values = pitches[pitches > 0]
            pitch_variance = np.var(pitch_values) if len(pitch_values) > 0 else 0
            
            # 2. Rhythm regularity (AI often too regular)
            tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
            beat_intervals = np.diff(beats)
            rhythm_regularity = np.std(beat_intervals) if len(beat_intervals) > 0 else 0
            
            # 3. MFCC features (for voice naturalness)
            mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
            mfcc_mean = np.mean(mfccs)
            mfcc_std = np.std(mfccs)
            
            # Normalize scores
            naturalness = min(1.0, (mfcc_std / 10) if mfcc_std > 0 else 0.5)
            
            # Cleanup
            os.unlink(audio_path)
            video.close()
            
            return {
                'naturalness': float(naturalness),
                'pitch_variance': float(min(1.0, pitch_variance / 1000)),
                'rhythm_regularity': float(min(1.0, rhythm_regularity / 10))
            }
            
        except Exception as e:
            print(f"Audio analysis error: {e}")
            return {'naturalness': 0.5, 'pitch_variance': 0.5, 'rhythm_regularity': 0.5}
    
    def detect_frame_artifacts(self, frames: List[np.ndarray]) -> float:
        """
        Detect visual artifacts common in AI-generated content
        """
        artifact_scores = []
        
        for frame in frames:
            # Convert to grayscale
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            
            # 1. Check for unnatural sharpness
            laplacian = cv2.Laplacian(gray, cv2.CV_64F)
            sharpness = np.var(laplacian)
            
            # 2. Check for color distribution anomalies
            hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
            color_uniformity = np.std(hsv[:, :, 0]) / 180  # Normalize hue std
            
            # 3. Check for compression artifacts
            edges = cv2.Canny(gray, 50, 150)
            edge_density = np.sum(edges > 0) / edges.size
            
            # Combine scores
            artifact_score = (
                0.3 * min(1.0, sharpness / 1000) +
                0.3 * (1 - color_uniformity) +
                0.4 * edge_density
            )
            artifact_scores.append(artifact_score)
        
        return np.mean(artifact_scores) if artifact_scores else 0.5
    
    def analyze_temporal_coherence(self, frames: List[np.ndarray]) -> float:
        """
        Analyze how smoothly frames transition
        Low coherence suggests AI generation artifacts
        """
        coherence_scores = []
        
        for i in range(len(frames) - 1):
            # Convert to grayscale
            gray1 = cv2.cvtColor(frames[i], cv2.COLOR_BGR2GRAY)
            gray2 = cv2.cvtColor(frames[i + 1], cv2.COLOR_BGR2GRAY)
            
            # Calculate optical flow
            flow = cv2.calcOpticalFlowFarneback(
                gray1, gray2, None, 0.5, 3, 15, 3, 5, 1.2, 0
            )
            
            # Check flow consistency
            flow_magnitude = np.sqrt(flow[..., 0]**2 + flow[..., 1]**2)
            flow_consistency = 1 - (np.std(flow_magnitude) / (np.mean(flow_magnitude) + 1e-6))
            
            coherence_scores.append(max(0, min(1, flow_consistency)))
        
        return np.mean(coherence_scores) if coherence_scores else 0.7
    
    def analyze_video(self, video_path: str) -> Dict[str, float]:
        """
        Complete video analysis returning AI probability scores
        """
        print(f"\n🔍 Analyzing video: {video_path}")
        
        # Extract frames
        frames = self.extract_frames(video_path)
        
        if len(frames) < 5:
            return {
                'ai_probability': 50,
                'confidence': 30,
                'signals': ['Insufficient frames for analysis']
            }
        
        # Run all analyses
        facial_score = self.analyze_facial_consistency(frames)
        audio_features = self.analyze_audio(video_path)
        artifact_score = self.detect_frame_artifacts(frames)
        temporal_score = self.analyze_temporal_coherence(frames)
        
        # Calculate individual signal scores (0-100 where higher = more AI-like)
        signals = {
            'facial_anomaly': max(0, min(100, (1 - facial_score) * 100)),
            'audio_synthetic': max(0, min(100, (1 - audio_features['naturalness']) * 100)),
            'visual_artifacts': max(0, min(100, artifact_score * 100)),
            'temporal_incoherence': max(0, min(100, (1 - temporal_score) * 100))
        }
        
        # Weighted combination for final score
        weights = {
            'facial_anomaly': 0.3,
            'audio_synthetic': 0.3,
            'visual_artifacts': 0.2,
            'temporal_incoherence': 0.2
        }
        
        ai_probability = sum(signals[k] * weights[k] for k in weights)
        
        # Calculate confidence based on signal consistency
        signal_values = list(signals.values())
        signal_std = np.std(signal_values)
        confidence = max(30, min(95, 100 - signal_std))
        
        # Determine deepfake risk level
        if ai_probability >= 75:
            deepfake_risk = 'High'
        elif ai_probability >= 50:
            deepfake_risk = 'Medium'
        else:
            deepfake_risk = 'Low'
        
        result = {
            'ai_probability': round(ai_probability, 1),
            'confidence': round(confidence, 1),
            'deepfake_risk': deepfake_risk,
            'amplification_score': round(ai_probability * 0.8, 1),  # Correlated but not identical
            'bot_score': round(ai_probability * 0.7, 1),
            'signals': signals,
            'triggered_patterns': self.get_triggered_patterns(signals)
        }
        
        print(f"✅ Analysis complete: {result['ai_probability']}% AI probability")
        return result
    
    def get_triggered_patterns(self, signals: Dict[str, float]) -> List[str]:
        """Get human-readable descriptions of triggered patterns"""
        patterns = []
        
        if signals['facial_anomaly'] > 60:
            patterns.append("Facial inconsistency detected (common in deepfakes)")
        if signals['audio_synthetic'] > 60:
            patterns.append("Synthetic voice patterns detected")
        if signals['visual_artifacts'] > 60:
            patterns.append("AI generation artifacts visible in frames")
        if signals['temporal_incoherence'] > 60:
            patterns.append("Unnatural motion between frames")
        
        return patterns

# Singleton instance
video_analyzer = VideoAIAnalyzer()