# AI Tools Database Updater

This Python script automatically fetches the latest information about AI tools using the Gemini API and updates your local database with current data.

## 🚀 Features

- **Automated Updates**: Fetches latest AI tool information from the web
- **Gemini API Integration**: Uses Google's Gemini Pro model for accurate data
- **Rate Limiting**: Respects API limits with configurable delays
- **Error Handling**: Robust error handling with retry mechanisms
- **Backup Creation**: Automatically backs up existing data before updates
- **Batch Processing**: Processes tools in configurable batches
- **Comprehensive Logging**: Detailed logs for monitoring and debugging
- **Configurable**: Easy to customize via configuration files

## 📋 Requirements

- Python 3.8 or higher
- Gemini API key (Google AI Studio)
- Internet connection

## 🔧 Installation

1. **Install Python dependencies:**
   ```bash
   cd scripts
   pip install -r requirements.txt
   ```

2. **Set up your Gemini API key:**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add it to your `.env.local` file in the project root:
   ```bash
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

## 🚀 Usage

### Basic Usage

Run the script from the project root or scripts directory:

```bash
# From project root
python scripts/update_ai_tools.py

# From scripts directory
cd scripts
python update_ai_tools.py
```

### Command Line Options

```bash
# Run with default settings
python update_ai_tools.py

# The script will automatically:
# 1. Load your API key from .env.local
# 2. Create necessary directories
# 3. Backup existing data
# 4. Fetch updated information for AI tools
# 5. Save results to aiToolsData_updated.json
```

## 📁 Output Files

The script creates several files:

- **`src/data/aiToolsData_updated.json`**: Updated AI tools data
- **`backups/aiToolsData_backup_YYYYMMDD_HHMMSS.json`**: Backup of previous data
- **`logs/ai_tools_update.log`**: Detailed execution logs

## 🔧 Configuration

### Environment Variables (.env.local)

```bash
# Required
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Optional
LOG_LEVEL=INFO
MAX_TOOLS_PER_RUN=50
RATE_LIMIT_DELAY=2
```

### Configuration File (config.ini)

The script uses `scripts/config.ini` for detailed configuration:

```ini
[api]
rate_limit_delay = 2          # Seconds between API calls
request_timeout = 30          # Request timeout in seconds
max_retries = 3              # Maximum retry attempts

[processing]
batch_size = 5               # Tools processed per batch
max_tools_per_run = 50       # Maximum tools per execution

[output]
create_backup = true         # Create backup before updating
output_format = json         # Output file format
include_timestamp = true     # Include timestamps in output
```

## 📊 Tool Categories

The script updates tools across these categories:

- **Large Language Models**: GPT-4, Claude, Gemini Pro
- **Code Generation**: GitHub Copilot, Cursor, CodeT5
- **Image Generation**: Midjourney, Stable Diffusion, DALL-E
- **Writing Assistants**: Jasper, Copy.ai, Notion AI
- **Design Tools**: Canva AI, Figma AI, Adobe Sensei
- **Video Generation**: RunwayML, Pika Labs
- **Research Tools**: Perplexity AI, Consensus
- **Automation Tools**: Zapier AI, Make.com

## 🔍 Data Structure

Each tool entry includes:

```json
{
  "name": "Tool Name",
  "company": "Company Name",
  "category": "Tool Category",
  "description": "Brief description",
  "longDescription": "Detailed description",
  "coreFeatures": ["feature1", "feature2"],
  "uniqueSellingPoints": ["point1", "point2"],
  "pricing": "Pricing model",
  "apiAccess": true,
  "freeTrialAvailable": true,
  "platforms": ["Web", "Mobile"],
  "languages": ["English", "Spanish"],
  "useCases": ["use case 1", "use case 2"],
  "limitations": ["limitation 1"],
  "officialWebsite": "https://...",
  "githubRepo": "https://github.com/...",
  "releaseDate": "YYYY-MM",
  "lastUpdated": "YYYY-MM-DD",
  "popularity": {
    "trendingScore": 85,
    "marketShare": 15
  }
}
```

## 🛠 Customization

### Adding New Tools

Edit the `get_predefined_tools_list()` method in the script:

```python
def get_predefined_tools_list(self) -> List[Dict[str, Any]]:
    return [
        {"name": "New AI Tool", "company": "Company", "category": "Category"},
        # Add more tools here...
    ]
```

### Modifying Data Fields

Update the `generate_update_prompt()` method to change the JSON structure:

```python
def generate_update_prompt(self, tool: Dict[str, Any]) -> str:
    # Modify the JSON template in the prompt
    # Add or remove fields as needed
```

## 📝 Logging

The script provides detailed logging:

- **INFO**: General progress information
- **WARNING**: Non-critical issues (failed requests, parsing errors)
- **ERROR**: Critical errors that stop execution
- **DEBUG**: Detailed debugging information

Log files are saved to `logs/ai_tools_update.log` with rotation.

## ⚠️ API Usage Notes

### Rate Limits

- **Default**: 2-second delay between requests
- **Gemini API**: 60 requests per minute (free tier)
- **Batch processing**: 5 tools per batch with 5-second delays

### Best Practices

1. **Start small**: Test with a few tools first
2. **Monitor logs**: Check for API errors or rate limiting
3. **Backup data**: Always backup before major updates
4. **Regular updates**: Run weekly or monthly for best results

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**:
   ```
   Error: NEXT_PUBLIC_GEMINI_API_KEY not found in .env.local
   ```
   **Solution**: Add your Gemini API key to `.env.local`

2. **JSON Parsing Error**:
   ```
   Warning: Could not parse JSON response
   ```
   **Solution**: The AI response format may vary. Check logs for details.

3. **Rate Limit Exceeded**:
   ```
   Warning: API call failed - rate limit
   ```
   **Solution**: Increase `rate_limit_delay` in configuration.

4. **Network Timeout**:
   ```
   Error: Request timeout
   ```
   **Solution**: Check internet connection or increase `request_timeout`.

### Debug Mode

Run with environment variable for verbose logging:

```bash
LOG_LEVEL=DEBUG python update_ai_tools.py
```

## 🤝 Contributing

To contribute to the script:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This script is part of the AI Tools Directory project and follows the same license terms.

## 🆘 Support

For support or questions:

1. Check the logs for detailed error information
2. Review this README for common solutions
3. Open an issue in the project repository
4. Contact the development team

---

**Last Updated**: October 2025
**Version**: 1.0.0