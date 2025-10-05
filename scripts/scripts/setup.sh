#!/bin/bash
# AI Tools Updater Setup Script
# This script sets up the Python environment for the AI tools updater

echo "🚀 Setting up AI Tools Updater..."
echo "=================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip3."
    exit 1
fi

echo "✅ pip3 found: $(pip3 --version)"

# Install required packages
echo ""
echo "📦 Installing required Python packages..."
pip3 install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✅ All packages installed successfully!"
else
    echo "❌ Failed to install some packages. Please check the error messages above."
    exit 1
fi

# Check if .env.local exists
echo ""
echo "🔑 Checking environment configuration..."
if [ -f "../.env.local" ]; then
    echo "✅ .env.local file found"
    
    # Check if API key exists
    if grep -q "NEXT_PUBLIC_GEMINI_API_KEY" "../.env.local"; then
        echo "✅ Gemini API key found in .env.local"
    else
        echo "⚠️  Gemini API key not found in .env.local"
        echo "Please add your API key:"
        echo "NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here"
    fi
else
    echo "⚠️  .env.local file not found in project root"
    echo "Please create .env.local with your Gemini API key:"
    echo "NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here"
fi

# Create necessary directories
echo ""
echo "📁 Creating necessary directories..."
mkdir -p ../src/data
mkdir -p ../backups
mkdir -p ../logs
echo "✅ Directories created"

# Run test script
echo ""
echo "🧪 Running tests..."
python3 test_updater.py

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure your Gemini API key is in .env.local"
echo "2. Run: python3 update_ai_tools.py"
echo "3. Check the output in ../src/data/aiToolsData_updated.json"