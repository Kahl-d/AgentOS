#!/bin/bash

BACKEND_URL="https://agent-os-two.vercel.app"

echo "🧪 Testing Portfolio OS Backend Deployment..."
echo "🔗 Backend URL: $BACKEND_URL"
echo ""

# Test root endpoint
echo "1️⃣ Testing root endpoint..."
curl -s "$BACKEND_URL/" | jq '.' 2>/dev/null || curl -s "$BACKEND_URL/"

echo ""
echo "2️⃣ Testing /api/test endpoint..."
curl -s "$BACKEND_URL/api/test" | jq '.' 2>/dev/null || curl -s "$BACKEND_URL/api/test"

echo ""
echo "3️⃣ Testing /api/health endpoint..."
curl -s "$BACKEND_URL/api/health" | jq '.' 2>/dev/null || curl -s "$BACKEND_URL/api/health"

echo ""
echo "4️⃣ Testing CORS headers..."
curl -s -I "$BACKEND_URL/api/test" | grep -i "access-control"

echo ""
echo "✅ Testing complete!" 