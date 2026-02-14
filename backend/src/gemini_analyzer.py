"""
Gemini API integration with quota handling.
"""

import os
import time
import google.generativeai as genai
from typing import Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

class GeminiPostAnalyzer:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv('GEMINI_API_KEY')
        self.model = None
        self.is_available = False
        self.quota_exceeded = False
        
        if self.api_key:
            try:
                genai.configure(api_key=self.api_key)
                
                # Try models in order of preference
                models_to_try = [
                    'gemini-2.5-flash',
                    'gemini-2.0-flash',
                    'gemini-flash-latest',
                    'gemini-pro-latest'
                ]
                
                print("\n🔍 Initializing Gemini...")
                
                for model_name in models_to_try:
                    try:
                        self.model = genai.GenerativeModel(model_name)
                        # Very quick test
                        response = self.model.generate_content("OK", generation_config={"max_output_tokens": 1})
                        self.is_available = True
                        print(f"✅ Gemini ready with {model_name}")
                        break
                    except Exception as e:
                        if '429' in str(e):
                            self.quota_exceeded = True
                            print(f"⚠️ Quota exceeded for {model_name}")
                            break
                        continue
                
            except Exception as e:
                print(f"⚠️ Gemini init failed: {e}")
    
    def generate_post_insights(self, post_data: Dict[str, Any]) -> Dict[str, str]:
        """Generate insights with quota handling."""
        
        if self.quota_exceeded:
            return {
                'summary': '⚠️ API quota exceeded. Try again later.',
                'risk_factors': '• Rate limit reached\n• Wait 60 seconds',
                'recommendation': 'Use without Gemini for now'
            }
        
        if not self.is_available:
            return {
                'summary': 'Gemini unavailable',
                'risk_factors': '',
                'recommendation': 'Continue with basic analysis'
            }
        
        try:
            # Add small delay to avoid quota issues
            time.sleep(1)
            
            prompt = f"""
            Briefly analyze this post (1 sentence each):
            
            Post: {post_data.get('post_id', 'Unknown')}
            Confidence: {post_data.get('confidence', 0)}%
            Patterns: {len(post_data.get('triggered_signals', []))} detected
            
            SUMMARY:
            RISK:
            ACTION:
            """
            
            response = self.model.generate_content(prompt)
            
            # Parse response
            lines = response.text.split('\n')
            result = {
                'summary': '',
                'risk_factors': '',
                'recommendation': ''
            }
            
            for line in lines:
                if line.startswith('SUMMARY:'):
                    result['summary'] = line[8:].strip()
                elif line.startswith('RISK:'):
                    result['risk_factors'] = line[5:].strip()
                elif line.startswith('ACTION:'):
                    result['recommendation'] = line[7:].strip()
            
            return result
            
        except Exception as e:
            if '429' in str(e):
                self.quota_exceeded = True
                return {
                    'summary': 'Quota exceeded',
                    'risk_factors': 'Rate limit reached',
                    'recommendation': 'Try again in 60 seconds'
                }
            return {
                'summary': f'Error: {str(e)[:50]}',
                'risk_factors': '',
                'recommendation': ''
            }