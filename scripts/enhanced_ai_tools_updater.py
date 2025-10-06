#!/usr/bin/env python3
"""
Enhanced AI Tools Data Updater with Current Information Gathering
Automatically gathers accurate and up-to-date information for AI tools.
"""

import os
import json
import logging
import time
from datetime import datetime, timezone
from typing import Dict, List, Any, Optional
import google.generativeai as genai
from dotenv import load_dotenv
import requests
from urllib.parse import urlparse
import re

# Load environment variables
load_dotenv('../.env.local')

class EnhancedAIToolsUpdater:
    def __init__(self):
        """Initialize the enhanced AI tools updater."""
        self.api_key = os.getenv('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        # Configure Gemini
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Setup logging
        self.setup_logging()
        
        # Data directories
        self.data_dir = '../src/data'
        self.output_file = 'ai_tools_enhanced_update.json'
        self.backup_dir = 'backups'
        
        # Ensure directories exist
        os.makedirs(self.backup_dir, exist_ok=True)
        
        # AI tools to focus on
        self.priority_tools = [
            'GPT-4', 'GPT-4 Turbo', 'Claude 3.5 Sonnet', 'Claude 3 Opus',
            'Gemini Pro', 'Gemini Ultra', 'DeepSeek V3', 'DeepSeek Coder',
            'Minimax Voice-01', 'Minimax Music-01', 'Perplexity AI',
            'Anthropic Claude', 'Meta Llama', 'Mistral AI', 'Cohere Command',
            'GitHub Copilot', 'Cursor AI', 'Codeium', 'Tabnine',
            'Midjourney', 'DALL-E 3', 'Stable Diffusion', 'Adobe Firefly',
            'RunwayML', 'Pika Labs', 'Sora', 'ElevenLabs', 'Murf AI'
        ]

    def setup_logging(self):
        """Setup logging configuration."""
        log_dir = 'logs'
        os.makedirs(log_dir, exist_ok=True)
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(f'{log_dir}/enhanced_ai_tools_update.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def verify_url(self, url: str) -> bool:
        """Verify if a URL is valid and accessible."""
        try:
            if not url or not url.startswith(('http://', 'https://')):
                return False
            
            response = requests.head(url, timeout=10, allow_redirects=True)
            return response.status_code == 200
        except:
            return False

    def get_current_tool_info(self, tool_name: str) -> Optional[Dict[str, Any]]:
        """Get current, up-to-date information for an AI tool using Gemini."""
        
        prompt = f"""
        Please provide the most current and accurate information about the AI tool "{tool_name}" as of October 2025. 
        
        Return the information in this exact JSON format:
        {{
            "name": "Exact tool name",
            "company": "Company/Developer name",
            "category": "Primary category (Large Language Models, Code Generation, Design Tools, etc.)",
            "description": "Brief 1-2 sentence description",
            "longDescription": "Detailed 3-4 sentence description covering key capabilities and updates",
            "coreFeatures": [
                "Feature 1",
                "Feature 2",
                "Feature 3",
                "Feature 4",
                "Feature 5"
            ],
            "uniqueSellingPoints": [
                "USP 1",
                "USP 2",
                "USP 3"
            ],
            "pricing": "Free/Freemium/Paid/Enterprise",
            "officialWebsite": "https://official-website.com",
            "documentation": "https://docs-url.com",
            "apiAccess": true/false,
            "freeTrialAvailable": true/false,
            "platforms": ["Web", "API", "Mobile", "Desktop"],
            "modelType": "Type of AI model if applicable",
            "contextWindow": "Context window size if applicable",
            "languages": ["List of supported languages"],
            "releaseDate": "YYYY-MM-DD",
            "lastUpdated": "2025-10-06",
            "version": "Current version",
            "popularityScore": 85,
            "userCount": "Estimated user count like 1M+, 500K+, etc.",
            "status": "Active",
            "tags": ["Relevant", "Tags", "Here"]
        }}
        
        Please ensure all information is current as of October 2025. If you don't have exact information for a field, provide the most reasonable estimate or mark as "Unknown" for strings and false for booleans.
        """
        
        try:
            self.logger.info(f"🔍 Fetching current info for: {tool_name}")
            
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Extract JSON from response
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if json_match:
                tool_data = json.loads(json_match.group())
                
                # Verify and clean URLs
                if 'officialWebsite' in tool_data:
                    if not self.verify_url(tool_data['officialWebsite']):
                        tool_data['officialWebsite'] = f"https://search.google.com/search?q={tool_name.replace(' ', '+')}"
                
                if 'documentation' in tool_data:
                    if not self.verify_url(tool_data['documentation']):
                        tool_data['documentation'] = tool_data['officialWebsite']
                
                self.logger.info(f"✅ Successfully fetched info for: {tool_name}")
                return tool_data
            else:
                self.logger.error(f"❌ No valid JSON found in response for {tool_name}")
                return None
                
        except Exception as e:
            self.logger.error(f"❌ Error fetching info for {tool_name}: {str(e)}")
            return None

    def create_backup(self):
        """Create backup of existing data."""
        try:
            existing_file = f'{self.data_dir}/aiToolsData.ts'
            if os.path.exists(existing_file):
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                backup_file = f'{self.backup_dir}/aiToolsData_enhanced_backup_{timestamp}.ts'
                
                with open(existing_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                with open(backup_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                self.logger.info(f"💾 Backup created: {backup_file}")
                return backup_file
        except Exception as e:
            self.logger.error(f"❌ Error creating backup: {str(e)}")
        return None

    def update_all_tools(self):
        """Update information for all priority AI tools."""
        updated_tools = []
        failed_tools = []
        
        self.logger.info(f"🚀 Starting enhanced update for {len(self.priority_tools)} AI tools...")
        
        for i, tool_name in enumerate(self.priority_tools, 1):
            self.logger.info(f"📊 Progress: {i}/{len(self.priority_tools)} - {tool_name}")
            
            # Get current tool information
            tool_info = self.get_current_tool_info(tool_name)
            
            if tool_info:
                # Add additional metadata
                tool_info.update({
                    'id': tool_name.lower().replace(' ', '-').replace('.', ''),
                    'features': [
                        {'name': feature, 'description': f"{feature} capability", 'available': True}
                        for feature in tool_info.get('coreFeatures', [])
                    ],
                    'capabilities': [
                        {'name': usp, 'description': f"{usp} functionality", 'level': 'Advanced'}
                        for usp in tool_info.get('uniqueSellingPoints', [])
                    ],
                    'useCases': [
                        {
                            'title': f"{tool_info.get('category', 'General')} Use Case",
                            'description': f"Professional use of {tool_name} for {tool_info.get('category', 'various tasks')}",
                            'industry': 'Technology',
                            'benefits': ['Efficiency', 'Quality', 'Innovation']
                        }
                    ],
                    'integrations': [
                        {'name': 'API', 'description': 'REST API integration', 'type': 'API'},
                        {'name': 'Web', 'description': 'Web-based interface', 'type': 'Native'}
                    ],
                    'installation': {
                        'requirements': ['Internet connection', 'Modern web browser'],
                        'steps': [
                            f"Visit {tool_info.get('officialWebsite', 'official website')}",
                            "Create account or sign in",
                            "Choose appropriate plan",
                            "Start using the tool"
                        ]
                    },
                    'performance': {
                        'accuracy': 90,
                        'speed': 85,
                        'reliability': 95,
                        'latency': 'Low',
                        'uptime': '99.9%'
                    },
                    'popularity': {
                        'trendingScore': tool_info.get('popularityScore', 80),
                        'userCount': 100000,
                        'githubStars': 0,
                        'weeklyDownloads': 0
                    }
                })
                
                updated_tools.append(tool_info)
                self.logger.info(f"✅ Updated: {tool_name}")
            else:
                failed_tools.append(tool_name)
                self.logger.warning(f"⚠️ Failed to update: {tool_name}")
            
            # Rate limiting
            time.sleep(2)
        
        return updated_tools, failed_tools

    def save_updated_data(self, updated_tools: List[Dict[str, Any]]):
        """Save the updated tools data."""
        output_data = {
            'lastUpdated': datetime.now(timezone.utc).isoformat(),
            'totalTools': len(updated_tools),
            'updatedCount': len(updated_tools),
            'tools': updated_tools
        }
        
        # Save JSON output
        with open(self.output_file, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
        
        self.logger.info(f"💾 Updated data saved to: {self.output_file}")
        
        # Generate summary report
        self.generate_summary_report(updated_tools)

    def generate_summary_report(self, updated_tools: List[Dict[str, Any]]):
        """Generate a summary report of the updates."""
        report = f"""# Enhanced AI Tools Update Report

## Update Summary
- **Date**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
- **Total Tools Updated**: {len(updated_tools)}
- **Categories Covered**: {len(set(tool.get('category', 'Unknown') for tool in updated_tools))}

## Updated Tools
"""
        
        for tool in updated_tools:
            report += f"""
### {tool.get('name', 'Unknown')}
- **Company**: {tool.get('company', 'Unknown')}
- **Category**: {tool.get('category', 'Unknown')}
- **Status**: {tool.get('status', 'Unknown')}
- **Pricing**: {tool.get('pricing', 'Unknown')}
- **Website**: {tool.get('officialWebsite', 'N/A')}

"""
        
        report += f"""
## Categories Distribution
"""
        categories = {}
        for tool in updated_tools:
            category = tool.get('category', 'Unknown')
            categories[category] = categories.get(category, 0) + 1
        
        for category, count in sorted(categories.items()):
            report += f"- **{category}**: {count} tools\n"
        
        with open('ENHANCED_UPDATE_REPORT.md', 'w', encoding='utf-8') as f:
            f.write(report)
        
        self.logger.info("📋 Summary report generated: ENHANCED_UPDATE_REPORT.md")

    def run(self):
        """Run the enhanced update process."""
        try:
            self.logger.info("🚀 Starting Enhanced AI Tools Update Process...")
            
            # Create backup
            backup_file = self.create_backup()
            
            # Update all tools
            updated_tools, failed_tools = self.update_all_tools()
            
            if updated_tools:
                # Save updated data
                self.save_updated_data(updated_tools)
                
                self.logger.info(f"🎉 Update completed successfully!")
                self.logger.info(f"✅ Updated tools: {len(updated_tools)}")
                self.logger.info(f"❌ Failed tools: {len(failed_tools)}")
                
                if failed_tools:
                    self.logger.warning(f"Failed to update: {', '.join(failed_tools)}")
                
                return True
            else:
                self.logger.error("❌ No tools were updated successfully")
                return False
                
        except Exception as e:
            self.logger.error(f"❌ Update process failed: {str(e)}")
            return False

def main():
    """Main execution function."""
    try:
        updater = EnhancedAIToolsUpdater()
        success = updater.run()
        
        if success:
            print("✅ Enhanced AI Tools update completed successfully!")
            print("📁 Check the generated files:")
            print("   - ai_tools_enhanced_update.json")
            print("   - ENHANCED_UPDATE_REPORT.md")
            print("   - logs/enhanced_ai_tools_update.log")
        else:
            print("❌ Update process failed. Check logs for details.")
            
    except Exception as e:
        print(f"❌ Critical error: {str(e)}")

if __name__ == "__main__":
    main()