#!/bin/bash

echo "🚀 Starting Ali's Portfolio Website..."
echo ""

# Create .env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating .env file from template..."
    cp backend/.env.example backend/.env
    echo "✅ .env file created. Update it with your email credentials if needed."
    echo ""
fi

echo "🖥️  Backend server starting on port 5000..."
cd backend
npm start

