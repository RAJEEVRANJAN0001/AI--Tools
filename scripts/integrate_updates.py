#!/usr/bin/env python3
"""
Integrate Updated AI Tools Data

This script takes the updated JSON data from the updater and integrates it
into the main TypeScript aiToolsData.ts file, preserving the existing structure
and adding enhanced information.

Usage:
    python integrate_updates.py
"""

import json
import re
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional


class DataIntegrator:
    """Integrates updated AI tools data into the TypeScript file"""
    
    def __init__(self):
        self.project_root = Path(__file__).parent.parent
        self.data_dir = self.project_root / 'src' / 'data'
        self.ts_file = self.data_dir / 'aiToolsData.ts'
        self.json_file = self.data_dir / 'aiToolsData_updated.json'
        
    def load_updated_data(self) -> Dict[str, Any]:
        """Load the updated JSON data"""
        try:
            with open(self.json_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"❌ Updated data file not found: {self.json_file}")
            return {}
        except json.JSONDecodeError as e:
            print(f"❌ Error parsing JSON: {e}")
            return {}
    
    def load_existing_ts_data(self) -> str:
        """Load the existing TypeScript file"""
        try:
            with open(self.ts_file, 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            print(f"❌ TypeScript file not found: {self.ts_file}")
            return ""
    
    def extract_tool_objects(self, ts_content: str) -> List[Dict[str, Any]]:
        """Extract all tool objects from TypeScript content"""
        # Find the array start
        array_start = ts_content.find('export const aiToolsData: AITool[] = [')
        if array_start == -1:
            return []
        
        # Find individual tool objects
        tools = []
        current_pos = array_start
        
        # Look for tool objects by finding opening braces after id field
        pattern = r'\{\s*id:\s*[\'"]([^\'"]+)[\'"]'
        matches = re.finditer(pattern, ts_content)
        
        for match in matches:
            tool_id = match.group(1)
            start_pos = match.start()
            
            # Find the matching closing brace
            brace_count = 0
            end_pos = start_pos
            
            for i, char in enumerate(ts_content[start_pos:], start_pos):
                if char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        end_pos = i + 1
                        break
            
            if end_pos > start_pos:
                tool_content = ts_content[start_pos:end_pos]
                tools.append({
                    'id': tool_id,
                    'start': start_pos,
                    'end': end_pos,
                    'content': tool_content
                })
        
        return tools
    
    def create_enhanced_tool_object(self, original_tool: str, updated_data: Dict[str, Any]) -> str:
        """Create an enhanced tool object with updated data"""
        # Parse the original tool to extract key information
        lines = original_tool.split('\n')
        
        # Helper function to escape strings for TypeScript
        def escape_string(s: str) -> str:
            return s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n').replace('\r', '\\r')
        
        # Helper function to format array
        def format_array(arr: List[str], indent: int = 6) -> str:
            if not arr:
                return '[]'
            
            formatted_items = []
            for item in arr:
                escaped_item = escape_string(item)
                formatted_items.append(f"{'  ' * indent}'{escaped_item}'")
            
            return '[\n' + ',\n'.join(formatted_items) + '\n' + '  ' * (indent - 1) + ']'
        
        # Update description if available
        if 'description' in updated_data:
            new_desc = escape_string(updated_data['description'])
            original_tool = re.sub(
                r"description:\s*'[^']*'",
                f"description: '{new_desc}'",
                original_tool,
                flags=re.DOTALL
            )
        
        # Update longDescription if available
        if 'longDescription' in updated_data:
            new_long_desc = escape_string(updated_data['longDescription'])
            original_tool = re.sub(
                r"longDescription:\s*'[^']*'",
                f"longDescription: '{new_long_desc}'",
                original_tool,
                flags=re.DOTALL
            )
        
        # Update coreFeatures if available
        if 'coreFeatures' in updated_data and updated_data['coreFeatures']:
            new_features = format_array(updated_data['coreFeatures'])
            original_tool = re.sub(
                r"coreFeatures:\s*\[[^\]]*\]",
                f"coreFeatures: {new_features}",
                original_tool,
                flags=re.DOTALL
            )
        
        # Update uniqueSellingPoints if available
        if 'uniqueSellingPoints' in updated_data and updated_data['uniqueSellingPoints']:
            new_usps = format_array(updated_data['uniqueSellingPoints'])
            original_tool = re.sub(
                r"uniqueSellingPoints:\s*\[[^\]]*\]",
                f"uniqueSellingPoints: {new_usps}",
                original_tool,
                flags=re.DOTALL
            )
        
        # Update lastUpdated
        current_date = datetime.now().strftime('%Y-%m-%d')
        original_tool = re.sub(
            r"lastUpdated:\s*'[^']*'",
            f"lastUpdated: '{current_date}'",
            original_tool
        )
        
        # Add a comment indicating the update
        if '  {' in original_tool:
            original_tool = original_tool.replace('  {', f'  {{ // Updated on {current_date}', 1)
        
        return original_tool
    
    def backup_original_file(self):
        """Create a backup of the original file"""
        backup_dir = self.project_root / 'scripts' / 'backups'
        backup_dir.mkdir(exist_ok=True)
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_file = backup_dir / f'aiToolsData_ts_backup_{timestamp}.ts'
        
        try:
            ts_content = self.load_existing_ts_data()
            with open(backup_file, 'w', encoding='utf-8') as f:
                f.write(ts_content)
            print(f"✅ Backup created: {backup_file}")
            return True
        except Exception as e:
            print(f"❌ Failed to create backup: {e}")
            return False
    
    def integrate_updates(self) -> bool:
        """Main integration process"""
        print("🔄 Starting data integration...")
        
        # Load data
        updated_data = self.load_updated_data()
        if not updated_data or 'tools' not in updated_data:
            print("❌ No updated data to integrate")
            return False
        
        ts_content = self.load_existing_ts_data()
        if not ts_content:
            print("❌ Failed to load TypeScript file")
            return False
        
        # Create backup
        if not self.backup_original_file():
            print("❌ Failed to create backup, aborting")
            return False
        
        # Extract existing tool objects
        existing_tools = self.extract_tool_objects(ts_content)
        print(f"📊 Found {len(existing_tools)} existing tools")
        
        # Create a mapping of tool names to updated data
        updated_tools_map = {}
        for tool_data in updated_data['tools']:
            tool_name = tool_data.get('name', '')
            if tool_name:
                updated_tools_map[tool_name.lower()] = tool_data
        
        print(f"� Found {len(updated_tools_map)} updated tools")
        
        # Process updates
        updated_content = ts_content
        tools_updated = 0
        offset = 0  # Track position changes due to content replacement
        
        for tool in existing_tools:
            # Extract tool name from the content
            name_match = re.search(r"name:\s*'([^']+)'", tool['content'])
            if not name_match:
                continue
            
            tool_name = name_match.group(1)
            tool_name_lower = tool_name.lower()
            
            if tool_name_lower in updated_tools_map:
                print(f"🔄 Updating: {tool_name}")
                
                # Create enhanced tool object
                enhanced_tool = self.create_enhanced_tool_object(
                    tool['content'], 
                    updated_tools_map[tool_name_lower]
                )
                
                # Calculate actual positions with offset
                actual_start = tool['start'] + offset
                actual_end = tool['end'] + offset
                
                # Replace the content
                updated_content = (
                    updated_content[:actual_start] +
                    enhanced_tool +
                    updated_content[actual_end:]
                )
                
                # Update offset
                offset += len(enhanced_tool) - (tool['end'] - tool['start'])
                
                tools_updated += 1
                print(f"✅ Updated: {tool_name}")
        
        # Save the updated file
        try:
            with open(self.ts_file, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            
            print(f"\n✅ Integration complete!")
            print(f"📊 Tools updated: {tools_updated}")
            print(f"📁 File updated: {self.ts_file}")
            
            # Create a summary file
            self.create_update_summary(updated_data, tools_updated)
            
            return True
            
        except Exception as e:
            print(f"❌ Failed to save updated file: {e}")
            return False
    
    def create_update_summary(self, updated_data: Dict[str, Any], tools_updated: int):
        """Create a summary of the updates"""
        summary_file = self.project_root / 'UPDATE_SUMMARY.md'
        
        summary_content = f"""# AI Tools Data Update Summary

**Update Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## Statistics
- **Total tools in update:** {len(updated_data.get('tools', []))}
- **Tools successfully integrated:** {tools_updated}
- **Last API update:** {updated_data.get('lastUpdated', 'Unknown')}

## Updated Tools
"""
        
        for tool_data in updated_data.get('tools', []):
            tool_name = tool_data.get('name', 'Unknown')
            summary_content += f"- **{tool_name}** ({tool_data.get('company', 'Unknown Company')})\n"
        
        summary_content += f"""
## Changes Made
- Updated descriptions and longDescriptions with latest information
- Refreshed core features and unique selling points
- Updated lastUpdated timestamps
- Enhanced tool information based on current market data

## Files Modified
- `src/data/aiToolsData.ts` - Main data file updated
- Backup created in `scripts/backups/`

## Next Steps
1. Review the updated data in the application
2. Test the application: `npm run dev`
3. Verify TypeScript compilation: `npm run type-check`
4. Deploy updates if everything looks good
"""
        
        try:
            with open(summary_file, 'w', encoding='utf-8') as f:
                f.write(summary_content)
            print(f"📄 Update summary created: {summary_file}")
        except Exception as e:
            print(f"⚠️  Could not create summary file: {e}")


def main():
    """Main function"""
    print("🔄 AI Tools Data Integration")
    print("=" * 50)
    
    integrator = DataIntegrator()
    success = integrator.integrate_updates()
    
    if success:
        print("\n🎉 Data integration successful!")
        print("\nNext steps:")
        print("1. Review the updated src/data/aiToolsData.ts file")
        print("2. Test the application: npm run dev")
        print("3. Check for any TypeScript errors: npm run type-check")
        print("4. Review UPDATE_SUMMARY.md for details")
    else:
        print("\n❌ Data integration failed!")
        print("Please check the logs and try again.")
    
    return success


if __name__ == "__main__":
    import sys
    success = main()
    sys.exit(0 if success else 1)