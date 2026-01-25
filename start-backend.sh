#!/bin/bash

echo "════════════════════════════════════════════════════════════"
echo "  Ali's Portfolio - Database Backend Setup"
echo "════════════════════════════════════════════════════════════"
echo ""

# Check if .env exists
if [ ! -f backend/.env ]; then
    echo "📝 Creating .env file from template..."
    cp backend/.env.example backend/.env
    echo "✅ .env file created"
    echo ""
fi

# Check if MONGODB_URI is set
if grep -q "MONGODB_URI=mongodb://localhost:27017" backend/.env; then
    echo "⚠️  MONGODB_URI not configured properly!"
    echo ""
    echo "Please edit backend/.env and set MONGODB_URI to:"
    echo ""
    echo "For Local MongoDB:"
    echo "  MONGODB_URI=mongodb://localhost:27017/ali-portfolio"
    echo ""
    echo "For MongoDB Atlas (Recommended):"
    echo "  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ali-portfolio"
    echo ""
    echo "See DATABASE_SETUP.md for detailed instructions"
    echo ""
fi

echo "🚀 Starting Portfolio Backend..."
echo ""
echo "📊 Database Type: MongoDB"
echo "🖥️  Server: http://localhost:5000"
echo "📧 API Base: http://localhost:5000/api"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd backend
npm run dev
