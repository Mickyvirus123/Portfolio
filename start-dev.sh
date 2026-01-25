#!/bin/bash

echo "🚀 Starting Ali's Portfolio Website (Development Mode)..."
echo ""

# Create .env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating .env file from template..."
    cp backend/.env.example backend/.env
    echo "✅ .env file created. Update it with your email credentials if needed."
    echo ""
fi

echo "Backend running on http://localhost:5000"
echo "Frontend available after opening index.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd backend
npm run dev
