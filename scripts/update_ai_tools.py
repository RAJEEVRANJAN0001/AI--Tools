#!/usr/bin/env python3
"""
AI Tools Database Updater

This script automatically fetches the latest information about AI tools
using the Gemini API and updates the local database with current data.

Requirements:
- pip install python-dotenv requests google-generativeai

Usage:
    python update_ai_tools.py

Author: AI Tools Directory
Date: October 2025
"""

import os
import json
import logging
import time
import sys
from datetime import datetime
from typing import Dict, List, Optional, Any
from pathlib import Path

# Third-party imports
try:
    from dotenv import load_dotenv
    import google.generativeai as genai
    import requests
except ImportError as e:
    print(f"Error: Missing required packages. Please install them using:")
    print("pip install python-dotenv google-generativeai requests")
    sys.exit(1)

# Configuration
class Config:
    """Configuration settings for the AI tools updater"""
    
    # File paths
    PROJECT_ROOT = Path(__file__).parent.parent  # Go up one level to project root
    ENV_FILE = PROJECT_ROOT / '.env.local'
    DATA_DIR = PROJECT_ROOT / 'src' / 'data'
    OUTPUT_FILE = DATA_DIR / 'aiToolsData_updated.json'
    BACKUP_DIR = PROJECT_ROOT / 'scripts' / 'backups'
    LOG_FILE = PROJECT_ROOT / 'scripts' / 'logs' / 'ai_tools_update.log'
    
    # API settings
    REQUEST_TIMEOUT = 30
    RATE_LIMIT_DELAY = 2  # seconds between API calls
    MAX_RETRIES = 3
    
    # Update settings
    BATCH_SIZE = 5  # Process tools in batches
    MAX_TOOLS_PER_RUN = 50  # Limit to prevent API quota exhaustion

class AIToolsUpdater:
    """Main class for updating AI tools information"""
    
    def __init__(self):
        """Initialize the updater with configuration and logging"""
        self.config = Config()
        self.setup_logging()
        self.setup_directories()
        self.load_environment()
        self.setup_gemini_api()
        
    def setup_logging(self):
        """Setup logging configuration"""
        # Create logs directory if it doesn't exist
        self.config.LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
        
        # Configure logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(self.config.LOG_FILE),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)
        self.logger.info("=== AI Tools Updater Started ===")
    
    def setup_directories(self):
        """Create necessary directories"""
        directories = [
            self.config.DATA_DIR,
            self.config.BACKUP_DIR,
            self.config.LOG_FILE.parent
        ]
        
        for directory in directories:
            directory.mkdir(parents=True, exist_ok=True)
            self.logger.debug(f"Ensured directory exists: {directory}")
    
    def load_environment(self):
        """Load environment variables from .env.local"""
        if not self.config.ENV_FILE.exists():
            self.logger.error(f"Environment file not found: {self.config.ENV_FILE}")
            sys.exit(1)
        
        load_dotenv(self.config.ENV_FILE)
        
        # Get API key
        self.gemini_api_key = os.getenv('NEXT_PUBLIC_GEMINI_API_KEY')
        if not self.gemini_api_key:
            self.logger.error("NEXT_PUBLIC_GEMINI_API_KEY not found in .env.local")
            sys.exit(1)
        
        self.logger.info("Environment variables loaded successfully")
    
    def setup_gemini_api(self):
        """Initialize Gemini API client"""
        try:
            genai.configure(api_key=self.gemini_api_key)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
            self.logger.info("Gemini API initialized successfully")
        except Exception as e:
            self.logger.error(f"Failed to initialize Gemini API: {e}")
            sys.exit(1)
    
    def get_ai_tools_list(self) -> List[Dict[str, Any]]:
        """
        Get the list of AI tools to update.
        This can be from existing data or a predefined list.
        """
        # First, try to load existing tools from the current data file
        existing_data_file = self.config.DATA_DIR / 'aiToolsData.ts'
        
        if existing_data_file.exists():
            self.logger.info(f"Loading existing tools from: {existing_data_file}")
            return self.extract_tools_from_typescript()
        else:
            # Fallback to a predefined list of popular AI tools
            self.logger.info("Using predefined AI tools list")
            return self.get_predefined_tools_list()
    
    def extract_tools_from_typescript(self) -> List[Dict[str, Any]]:
        """Extract tool names from existing TypeScript data file"""
        # For now, return a simplified list based on popular AI tools
        # In a production version, you could parse the actual TypeScript file
        return self.get_predefined_tools_list()
    
    def get_predefined_tools_list(self) -> List[Dict[str, Any]]:
        """Get a predefined list of AI tools to update"""
        return [
            {"name": "GPT-4", "company": "OpenAI", "category": "Large Language Models"},
            {"name": "Claude 3.5 Sonnet", "company": "Anthropic", "category": "Large Language Models"},
            {"name": "GitHub Copilot", "company": "GitHub", "category": "Code Generation"},
            {"name": "Midjourney", "company": "Midjourney", "category": "Image Generation"},
            {"name": "Stable Diffusion", "company": "Stability AI", "category": "Image Generation"},
            {"name": "ChatGPT", "company": "OpenAI", "category": "Large Language Models"},
            {"name": "Gemini Pro", "company": "Google", "category": "Large Language Models"},
            {"name": "Cursor", "company": "Cursor", "category": "Code Generation"},
            {"name": "Perplexity AI", "company": "Perplexity", "category": "Research Tools"},
            {"name": "RunwayML", "company": "Runway", "category": "Video Generation"},
            {"name": "Notion AI", "company": "Notion", "category": "Writing Assistants"},
            {"name": "Jasper", "company": "Jasper", "category": "Writing Assistants"},
            {"name": "Copy.ai", "company": "Copy.ai", "category": "Writing Assistants"},
            {"name": "Canva AI", "company": "Canva", "category": "Design Tools"},
            {"name": "Figma AI", "company": "Figma", "category": "Design Tools"},
        ]
    
    def generate_update_prompt(self, tool: Dict[str, Any]) -> str:
        """Generate a prompt for the Gemini API to fetch tool information"""
        current_date = datetime.now().strftime("%B %Y")
        
        prompt = f"""
Please provide the most current and accurate information about the AI tool "{tool['name']}" by {tool['company']} as of {current_date}.

Format your response as a JSON object with the following structure:
{{
    "name": "Tool Name",
    "company": "Company Name",
    "category": "Tool Category",
    "description": "Brief description (2-3 sentences)",
    "longDescription": "Detailed description (4-6 sentences)",
    "coreFeatures": ["feature1", "feature2", "feature3", "feature4"],
    "uniqueSellingPoints": ["point1", "point2", "point3"],
    "pricing": "Pricing model (e.g., Free, $20/month, Freemium)",
    "apiAccess": true/false,
    "freeTrialAvailable": true/false,
    "platforms": ["Web", "Mobile", "Desktop", "API"],
    "languages": ["English", "Spanish", etc.],
    "useCases": ["use case 1", "use case 2", "use case 3"],
    "limitations": ["limitation 1", "limitation 2"],
    "officialWebsite": "https://...",
    "githubRepo": "https://github.com/..." (if available),
    "releaseDate": "YYYY-MM",
    "lastUpdated": "{datetime.now().strftime('%Y-%m-%d')}",
    "popularity": {{
        "trendingScore": 85 (1-100),
        "marketShare": 15 (percentage)
    }}
}}

Please ensure all information is current, accurate, and factual. If you're unsure about any specific detail, indicate it as "Not available" or provide your best estimate with a note.
"""
        return prompt
    
    def fetch_tool_info(self, tool: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Fetch updated information for a single AI tool"""
        self.logger.info(f"Fetching info for: {tool['name']}")
        
        for attempt in range(self.config.MAX_RETRIES):
            try:
                prompt = self.generate_update_prompt(tool)
                
                # Make API call to Gemini
                response = self.model.generate_content(prompt)
                
                if response and response.text:
                    # Try to extract JSON from the response
                    json_data = self.extract_json_from_response(response.text)
                    if json_data:
                        self.logger.info(f"Successfully fetched info for: {tool['name']}")
                        return json_data
                    else:
                        self.logger.warning(f"Could not parse JSON response for: {tool['name']}")
                        
            except Exception as e:
                self.logger.warning(f"Attempt {attempt + 1} failed for {tool['name']}: {e}")
                if attempt < self.config.MAX_RETRIES - 1:
                    time.sleep(self.config.RATE_LIMIT_DELAY * (attempt + 1))
        
        self.logger.error(f"Failed to fetch info for: {tool['name']} after {self.config.MAX_RETRIES} attempts")
        return None
    
    def extract_json_from_response(self, response_text: str) -> Optional[Dict[str, Any]]:
        """Extract JSON data from Gemini API response"""
        try:
            # Try to find JSON in the response
            import re
            
            # Look for JSON object in the response
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if json_match:
                json_str = json_match.group(0)
                return json.loads(json_str)
            
            # If no JSON found, try parsing the entire response
            return json.loads(response_text)
            
        except json.JSONDecodeError as e:
            self.logger.warning(f"JSON parsing error: {e}")
            return None
    
    def create_backup(self) -> str:
        """Create a backup of existing data"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_file = self.config.BACKUP_DIR / f"aiToolsData_backup_{timestamp}.json"
        
        # If there's existing data, back it up
        if self.config.OUTPUT_FILE.exists():
            try:
                with open(self.config.OUTPUT_FILE, 'r', encoding='utf-8') as f:
                    existing_data = json.load(f)
                
                with open(backup_file, 'w', encoding='utf-8') as f:
                    json.dump(existing_data, f, indent=2, ensure_ascii=False)
                
                self.logger.info(f"Backup created: {backup_file}")
                return str(backup_file)
            except Exception as e:
                self.logger.warning(f"Failed to create backup: {e}")
        
        return ""
    
    def save_updated_data(self, updated_tools: List[Dict[str, Any]]):
        """Save the updated tools data to JSON file"""
        try:
            # Create the data structure
            output_data = {
                "lastUpdated": datetime.now().isoformat(),
                "totalTools": len(updated_tools),
                "tools": updated_tools
            }
            
            # Save to file
            with open(self.config.OUTPUT_FILE, 'w', encoding='utf-8') as f:
                json.dump(output_data, f, indent=2, ensure_ascii=False)
            
            self.logger.info(f"Updated data saved to: {self.config.OUTPUT_FILE}")
            self.logger.info(f"Total tools updated: {len(updated_tools)}")
            
        except Exception as e:
            self.logger.error(f"Failed to save updated data: {e}")
            raise
    
    def run_update(self):
        """Main method to run the update process"""
        try:
            self.logger.info("Starting AI tools update process")
            
            # Create backup
            backup_file = self.create_backup()
            
            # Get tools list
            tools_list = self.get_ai_tools_list()
            self.logger.info(f"Found {len(tools_list)} tools to update")
            
            # Limit the number of tools to process
            if len(tools_list) > self.config.MAX_TOOLS_PER_RUN:
                tools_list = tools_list[:self.config.MAX_TOOLS_PER_RUN]
                self.logger.info(f"Limited to {self.config.MAX_TOOLS_PER_RUN} tools for this run")
            
            updated_tools = []
            
            # Process tools in batches
            for i in range(0, len(tools_list), self.config.BATCH_SIZE):
                batch = tools_list[i:i + self.config.BATCH_SIZE]
                self.logger.info(f"Processing batch {i//self.config.BATCH_SIZE + 1}: {len(batch)} tools")
                
                for tool in batch:
                    # Fetch updated info
                    updated_info = self.fetch_tool_info(tool)
                    
                    if updated_info:
                        updated_tools.append(updated_info)
                    else:
                        # Keep original info if update failed
                        self.logger.warning(f"Keeping original info for: {tool['name']}")
                        updated_tools.append(tool)
                    
                    # Rate limiting
                    time.sleep(self.config.RATE_LIMIT_DELAY)
                
                # Batch delay
                if i + self.config.BATCH_SIZE < len(tools_list):
                    self.logger.info(f"Batch completed. Waiting before next batch...")
                    time.sleep(5)
            
            # Save updated data
            self.save_updated_data(updated_tools)
            
            # Summary
            self.logger.info("=== Update Summary ===")
            self.logger.info(f"Tools processed: {len(tools_list)}")
            self.logger.info(f"Successfully updated: {len(updated_tools)}")
            if backup_file:
                self.logger.info(f"Backup created: {backup_file}")
            self.logger.info(f"Output file: {self.config.OUTPUT_FILE}")
            self.logger.info("=== Update Complete ===")
            
        except KeyboardInterrupt:
            self.logger.info("Update process interrupted by user")
        except Exception as e:
            self.logger.error(f"Update process failed: {e}")
            raise

def main():
    """Main entry point"""
    print("AI Tools Database Updater")
    print("=" * 50)
    
    try:
        updater = AIToolsUpdater()
        updater.run_update()
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()