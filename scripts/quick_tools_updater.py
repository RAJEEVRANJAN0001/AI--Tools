#!/usr/bin/env python3
"""
Quick AI Tools Information Updater
Fetch current information for key AI tools
"""

import os
import json
import time
from datetime import datetime
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv('../.env.local')

def get_tool_info(tool_name: str):
    """Get current info for a specific tool"""
    api_key = os.getenv('NEXT_PUBLIC_GEMINI_API_KEY') or os.getenv('GEMINI_API_KEY')
    if not api_key:
        print("❌ GEMINI_API_KEY not found")
        return None
    
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    prompt = f"""
    Provide current information about {tool_name} as of October 2025 in JSON format:
    {{
        "name": "{tool_name}",
        "company": "Company name",
        "description": "Brief description",
        "pricing": "Pricing model",
        "status": "Current status",
        "keyFeatures": ["Feature 1", "Feature 2", "Feature 3"],
        "website": "Official website URL",
        "lastUpdated": "2025-10-06"
    }}
    Keep it concise and accurate.
    """
    
    try:
        print(f"🔍 Fetching info for: {tool_name}")
        response = model.generate_content(prompt)
        
        # Extract JSON from response
        import re
        json_match = re.search(r'\{.*\}', response.text, re.DOTALL)
        if json_match:
            data = json.loads(json_match.group())
            print(f"✅ Got info for: {tool_name}")
            return data
        else:
            print(f"❌ No JSON found for: {tool_name}")
            return None
            
    except Exception as e:
        print(f"❌ Error for {tool_name}: {str(e)}")
        return None

def main():
    """Main function"""
    tools = [
        "GPT-4 Turbo",
        "Claude 3.5 Sonnet", 
        "Gemini Pro",
        "DeepSeek V3",
        "Minimax Voice-01"
    ]
    
    results = []
    
    print("🚀 Fetching current AI tools information...")
    
    for tool in tools:
        info = get_tool_info(tool)
        if info:
            results.append(info)
        time.sleep(2)  # Rate limiting
    
    # Save results
    output = {
        "lastUpdated": datetime.now().isoformat(),
        "totalTools": len(results),
        "tools": results
    }
    
    with open('quick_tools_update.json', 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"✅ Completed! Updated {len(results)} tools")
    print("📁 Results saved to: quick_tools_update.json")

if __name__ == "__main__":
    main()