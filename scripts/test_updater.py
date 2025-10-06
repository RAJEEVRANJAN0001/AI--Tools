#!/usr/bin/env python3
"""
Test script for AI Tools Updater

This script tests the basic functionality of the AI tools updater
including API connectivity and configuration loading.

Usage:
    python test_updater.py
"""

import os
import sys
from pathlib import Path

# Add the parent directory to the path so we can import the main script
sys.path.insert(0, str(Path(__file__).parent))

def test_environment():
    """Test environment setup"""
    print("🔧 Testing environment setup...")
    
    try:
        from dotenv import load_dotenv
        import google.generativeai as genai
        import requests
        print("✅ All required packages are installed")
    except ImportError as e:
        print(f"❌ Missing package: {e}")
        print("Please run: pip install -r requirements.txt")
        return False
    
    return True

def test_env_file():
    """Test .env.local file and API key"""
    print("\n🔑 Testing environment file...")
    
    env_file = Path(__file__).parent.parent / '.env.local'
    
    if not env_file.exists():
        print(f"❌ .env.local file not found at: {env_file}")
        return False
    
    print("✅ .env.local file found")
    
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv(env_file)
    
    api_key = os.getenv('NEXT_PUBLIC_GEMINI_API_KEY')
    if not api_key:
        print("❌ NEXT_PUBLIC_GEMINI_API_KEY not found in .env.local")
        return False
    
    if len(api_key) < 30:  # Basic validation
        print("❌ API key appears to be invalid (too short)")
        return False
    
    print("✅ Gemini API key found and appears valid")
    return True

def test_gemini_api():
    """Test Gemini API connection"""
    print("\n🌐 Testing Gemini API connection...")
    
    try:
        from dotenv import load_dotenv
        import google.generativeai as genai
        
        # Load API key
        env_file = Path(__file__).parent.parent / '.env.local'
        load_dotenv(env_file)
        api_key = os.getenv('NEXT_PUBLIC_GEMINI_API_KEY')
        
        # Configure and test API
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')  # Use available model
        
        # Simple test prompt
        response = model.generate_content("Hello! Please respond with 'API test successful'")
        
        if response and response.text:
            print("✅ Gemini API connection successful")
            print(f"📝 Response: {response.text.strip()}")
            return True
        else:
            print("❌ Gemini API returned empty response")
            return False
            
    except Exception as e:
        print(f"❌ Gemini API test failed: {e}")
        return False

def test_directory_structure():
    """Test directory structure"""
    print("\n📁 Testing directory structure...")
    
    project_root = Path(__file__).parent.parent
    required_dirs = [
        project_root / 'src' / 'data',
        project_root / 'scripts'
    ]
    
    all_good = True
    for directory in required_dirs:
        if directory.exists():
            print(f"✅ Directory exists: {directory.relative_to(project_root)}")
        else:
            print(f"❌ Directory missing: {directory.relative_to(project_root)}")
            all_good = False
    
    return all_good

def test_updater_import():
    """Test importing the main updater"""
    print("\n📦 Testing updater import...")
    
    try:
        from update_ai_tools import AIToolsUpdater, Config
        print("✅ Successfully imported AIToolsUpdater")
        
        # Test basic initialization (without API calls)
        config = Config()
        print("✅ Configuration class works")
        
        return True
    except Exception as e:
        print(f"❌ Failed to import updater: {e}")
        return False

def main():
    """Run all tests"""
    print("🧪 AI Tools Updater Test Suite")
    print("=" * 50)
    
    tests = [
        ("Environment", test_environment),
        ("Environment File", test_env_file),
        ("Directory Structure", test_directory_structure),
        ("Updater Import", test_updater_import),
        ("Gemini API", test_gemini_api),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        try:
            if test_func():
                passed += 1
        except Exception as e:
            print(f"❌ Test '{test_name}' crashed: {e}")
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! The updater is ready to use.")
        print("\nNext steps:")
        print("1. Run: python update_ai_tools.py")
        print("2. Check the output in src/data/aiToolsData_updated.json")
        print("3. Review logs in logs/ai_tools_update.log")
    else:
        print("⚠️  Some tests failed. Please fix the issues before running the updater.")
        
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)