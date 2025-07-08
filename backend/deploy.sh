#!/bin/bash

echo "🚀 Deploying Portfolio OS Backend to Vercel..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "npm install -g vercel"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "main.py" ]; then
    echo "❌ main.py not found. Please run this script from the backend directory."
    exit 1
fi

echo "📦 Preparing deployment..."

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod --yes

echo "✅ Deployment complete!"
echo "🔗 Your backend should be available at: https://agent-os-two.vercel.app"
echo "🧪 Test the API: https://agent-os-two.vercel.app/api/test" 