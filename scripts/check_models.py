#!/usr/bin/env python3
"""
Check available Gemini models
"""

import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv('../.env.local')

def check_models():
    api_key = os.getenv('NEXT_PUBLIC_GEMINI_API_KEY') or os.getenv('GEMINI_API_KEY')
    if not api_key:
        print("❌ No API key found")
        return
    
    try:
        genai.configure(api_key=api_key)
        
        print("🔍 Available models:")
        for model in genai.list_models():
            if 'generateContent' in model.supported_generation_methods:
                print(f"✅ {model.name}")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    check_models()