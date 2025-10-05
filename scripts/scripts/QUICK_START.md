# 🤖 AI Tools Auto-Updater

**Automatically fetch the latest information about AI tools using the Gemini API**

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd scripts
./setup.sh
```

### 2. Run the Updater
```bash
python3 update_ai_tools.py
```

### 3. Check Results
- **Updated Data**: `src/data/aiToolsData_updated.json`
- **Backup**: `backups/aiToolsData_backup_YYYYMMDD_HHMMSS.json`
- **Logs**: `logs/ai_tools_update.log`

## 📁 Files Overview

| File | Purpose |
|------|---------|
| `update_ai_tools.py` | Main updater script |
| `test_updater.py` | Test script to verify setup |
| `setup.sh` | Automated setup script |
| `requirements.txt` | Python dependencies |
| `config.ini` | Configuration settings |
| `README.md` | Detailed documentation |

## ⚙️ Configuration

Edit `.env.local` in project root:
```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

## 🔧 Advanced Usage

### Custom Tool List
Edit the `get_predefined_tools_list()` method in `update_ai_tools.py`:

```python
def get_predefined_tools_list(self) -> List[Dict[str, Any]]:
    return [
        {"name": "Your AI Tool", "company": "Company", "category": "Category"},
        # Add more tools here...
    ]
```

### Rate Limiting
Adjust in `config.ini`:
```ini
[api]
rate_limit_delay = 2    # Seconds between requests
max_retries = 3         # Retry attempts
```

### Batch Size
Control processing in `config.ini`:
```ini
[processing]
batch_size = 5          # Tools per batch
max_tools_per_run = 50  # Total tools per run
```

## 📊 Output Format

Each tool includes:
- **Basic Info**: Name, company, category, description
- **Features**: Core features, unique selling points
- **Pricing**: Pricing model, free trial availability
- **Technical**: API access, platforms, languages
- **Metadata**: Release date, last updated, popularity metrics

## 🛠 Troubleshooting

### Common Issues

1. **Missing API Key**
   ```bash
   Error: NEXT_PUBLIC_GEMINI_API_KEY not found
   ```
   **Fix**: Add API key to `.env.local`

2. **Package Not Found**
   ```bash
   ImportError: No module named 'google.generativeai'
   ```
   **Fix**: Run `./setup.sh` or `pip install -r requirements.txt`

3. **Rate Limit Errors**
   ```bash
   Warning: API call failed - rate limit
   ```
   **Fix**: Increase `rate_limit_delay` in `config.ini`

### Debug Mode
```bash
LOG_LEVEL=DEBUG python3 update_ai_tools.py
```

## 🔄 Automation

### Cron Job (Daily Updates)
```bash
# Add to crontab (crontab -e)
0 2 * * * cd /path/to/AI--Tools/scripts && python3 update_ai_tools.py
```

### GitHub Actions
```yaml
name: Update AI Tools
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.8'
      - name: Install dependencies
        run: pip install -r scripts/requirements.txt
      - name: Update AI tools
        env:
          NEXT_PUBLIC_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
        run: python scripts/update_ai_tools.py
```

## 📈 Monitoring

### Check Status
```bash
# View recent logs
tail -f logs/ai_tools_update.log

# Check last update
python3 -c "import json; data=json.load(open('../src/data/aiToolsData_updated.json')); print(f'Last updated: {data[\"lastUpdated\"]} - {data[\"totalTools\"]} tools')"
```

### Success Metrics
- **Update Success Rate**: Check logs for failed tools
- **API Usage**: Monitor Gemini API quota
- **Data Quality**: Review updated tool information

## 🎯 Best Practices

1. **Start Small**: Test with 5-10 tools first
2. **Regular Updates**: Run weekly for best results  
3. **Monitor Logs**: Check for API errors
4. **Backup Data**: Automatic backups are created
5. **Review Output**: Manually verify critical tool updates

---

**Need Help?** Check `README.md` for detailed documentation or run `python3 test_updater.py` to diagnose issues.