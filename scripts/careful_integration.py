#!/usr/bin/env python3
"""
Careful AI Tools Data Integration Script

This script carefully integrates updated AI tool data from JSON into the TypeScript
file while preserving the exact TypeScript interface structure.
"""

import json
import re
import os
from datetime import datetime
from typing import Dict, Any, List

class CarefulDataIntegrator:
    def __init__(self):
        self.script_dir = os.path.dirname(os.path.abspath(__file__))
        self.project_root = os.path.dirname(self.script_dir)
        self.ts_file_path = os.path.join(self.project_root, 'src/data/aiToolsData.ts')
        self.json_file_path = os.path.join(self.script_dir, 'ai_tools_updated.json')
        
        # Fields that exist in the TypeScript interface
        self.valid_fields = {
            'id', 'name', 'company', 'category', 'subCategory', 'description', 
            'longDescription', 'coreFeatures', 'uniqueSellingPoints', 'features',
            'modelType', 'contextWindow', 'languages', 'platforms', 'pricing',
            'apiAccess', 'freeTrialAvailable', 'pricingDetails', 'capabilities',
            'useCases', 'limitations', 'performance', 'integrations', 'sdks',
            'installation', 'officialWebsite', 'documentation', 'apiDocs',
            'githubRepo', 'communityForum', 'communityResources', 'tutorials',
            'releaseDate', 'lastUpdated', 'version', 'popularity', 'status',
            'userCount', 'tags'
        }
        
    def load_updated_data(self) -> Dict[str, Any]:
        """Load the updated data from JSON file"""
        if not os.path.exists(self.json_file_path):
            print(f"❌ Updated data file not found: {self.json_file_path}")
            return {}
            
        with open(self.json_file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def clean_tool_data(self, tool_data: Dict[str, Any]) -> Dict[str, Any]:
        """Remove fields that don't exist in the TypeScript interface"""
        cleaned = {}
        for key, value in tool_data.items():
            if key in self.valid_fields:
                cleaned[key] = value
            else:
                print(f"⚠️  Skipping invalid field: {key}")
        return cleaned
    
    def format_value_for_ts(self, value: Any, indent: int = 0) -> str:
        """Format a Python value for TypeScript syntax"""
        spaces = '  ' * indent
        
        if value is None:
            return 'undefined'
        elif isinstance(value, bool):
            return 'true' if value else 'false'
        elif isinstance(value, (int, float)):
            return str(value)
        elif isinstance(value, str):
            # Escape single quotes and wrap in single quotes
            escaped = value.replace("'", "\\'").replace('\n', '\\n')
            return f"'{escaped}'"
        elif isinstance(value, list):
            if not value:
                return '[]'
            items = []
            for item in value:
                if isinstance(item, dict):
                    items.append(self.format_object_for_ts(item, indent + 1))
                else:
                    items.append(self.format_value_for_ts(item, 0))
            
            if all(not isinstance(item, dict) for item in value):
                # Simple array on one line
                return '[' + ', '.join(items) + ']'
            else:
                # Complex array with line breaks
                formatted_items = [f"{spaces}  {item}" for item in items]
                return '[\n' + ',\n'.join(formatted_items) + f'\n{spaces}]'
        elif isinstance(value, dict):
            return self.format_object_for_ts(value, indent)
        else:
            return f"'{str(value)}'"
    
    def format_object_for_ts(self, obj: Dict[str, Any], indent: int = 0) -> str:
        """Format a dictionary as TypeScript object syntax"""
        spaces = '  ' * indent
        if not obj:
            return '{}'
        
        items = []
        for key, value in obj.items():
            formatted_value = self.format_value_for_ts(value, indent + 1)
            items.append(f"{spaces}  {key}: {formatted_value}")
        
        return '{\n' + ',\n'.join(items) + f'\n{spaces}' + '}'
    
    def update_tool_in_ts(self, ts_content: str, tool_id: str, updated_tool: Dict[str, Any]) -> str:
        """Update a specific tool in the TypeScript content"""
        # Find the tool object in the array
        pattern = rf"(\s*\{{\s*id:\s*['\"]({re.escape(tool_id)})['\"],.*?\}}\s*,?)"
        
        # Use a more sophisticated approach to find the complete object
        lines = ts_content.split('\n')
        start_line = -1
        end_line = -1
        brace_count = 0
        found_tool = False
        
        for i, line in enumerate(lines):
            if f"id: '{tool_id}'" in line or f'id: "{tool_id}"' in line:
                start_line = i
                # Find the opening brace for this object
                for j in range(i, -1, -1):
                    if '{' in lines[j]:
                        start_line = j
                        found_tool = True
                        break
                break
        
        if not found_tool:
            print(f"⚠️  Tool {tool_id} not found in TypeScript file")
            return ts_content
        
        # Find the end of this object
        brace_count = 0
        for i in range(start_line, len(lines)):
            line = lines[i]
            brace_count += line.count('{') - line.count('}')
            if brace_count == 0 and i > start_line:
                end_line = i
                break
        
        if end_line == -1:
            print(f"⚠️  Could not find end of object for tool {tool_id}")
            return ts_content
        
        # Clean the tool data
        cleaned_tool = self.clean_tool_data(updated_tool)
        
        # Generate the new tool object
        new_tool_content = self.format_object_for_ts(cleaned_tool, 1)
        
        # Replace the old content with new content
        new_lines = lines[:start_line] + [f"  {new_tool_content},"] + lines[end_line + 1:]
        
        return '\n'.join(new_lines)
    
    def integrate_updates(self):
        """Main integration function"""
        print("🔄 Starting careful data integration...")
        
        # Load updated data
        updated_data = self.load_updated_data()
        if not updated_data:
            print("❌ No updated data to integrate")
            return
        
        # Create backup
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_path = os.path.join(self.script_dir, 'backups', f'aiToolsData_careful_backup_{timestamp}.ts')
        os.makedirs(os.path.dirname(backup_path), exist_ok=True)
        
        # Read current TypeScript file
        if not os.path.exists(self.ts_file_path):
            print(f"❌ TypeScript file not found: {self.ts_file_path}")
            return
        
        with open(self.ts_file_path, 'r', encoding='utf-8') as f:
            original_content = f.read()
        
        # Create backup
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(original_content)
        print(f"💾 Backup created: {backup_path}")
        
        # Process each updated tool
        updated_content = original_content
        tools_updated = 0
        
        for tool_id, tool_data in updated_data.items():
            print(f"🔄 Updating tool: {tool_id}")
            try:
                updated_content = self.update_tool_in_ts(updated_content, tool_id, tool_data)
                tools_updated += 1
                print(f"✅ Updated: {tool_id}")
            except Exception as e:
                print(f"❌ Failed to update {tool_id}: {str(e)}")
        
        # Write the updated content back
        with open(self.ts_file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"\n📊 Integration complete!")
        print(f"✅ Tools updated: {tools_updated}")
        print(f"💾 Backup saved: {backup_path}")
        
        # Generate summary
        summary_path = os.path.join(self.project_root, 'CAREFUL_INTEGRATION_SUMMARY.md')
        with open(summary_path, 'w', encoding='utf-8') as f:
            f.write(f"# Careful AI Tools Data Integration Summary\n\n")
            f.write(f"**Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            f.write(f"## Results\n\n")
            f.write(f"- **Tools processed:** {len(updated_data)}\n")
            f.write(f"- **Tools updated:** {tools_updated}\n")
            f.write(f"- **Backup location:** `{backup_path}`\n\n")
            f.write(f"## Updated Tools\n\n")
            
            for tool_id in updated_data.keys():
                f.write(f"- {tool_id}\n")
            
            f.write(f"\n## Next Steps\n\n")
            f.write(f"1. Run `npm run type-check` to verify TypeScript compilation\n")
            f.write(f"2. Test the application with `npm run dev`\n")
            f.write(f"3. Review the updated data in the browser\n")
        
        print(f"📋 Summary saved: {summary_path}")

if __name__ == "__main__":
    integrator = CarefulDataIntegrator()
    integrator.integrate_updates()