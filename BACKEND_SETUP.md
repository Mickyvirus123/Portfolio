# Portfolio Website - Full Stack Setup Guide

## 🎯 Overview

Your portfolio now has a complete backend system with:
- ✅ Express.js API server
- ✅ MongoDB database
- ✅ Contact form handling with validation
- ✅ Email notifications
- ✅ Portfolio data management
- ✅ CORS-enabled frontend integration

---

## 📁 Project Structure

```
Portfolio/
├── frontend files (index.html, style.css, script.js)
├── images/
└── backend/
    ├── config/
    │   ├── database.js
    │   └── email.js
    ├── controllers/
    │   ├── contactController.js
    │   └── portfolioController.js
    ├── middleware/
    │   ├── cors.js
    │   └── validation.js
    ├── models/
    │   ├── Contact.js
    │   └── Portfolio.js
    ├── routes/
    │   ├── contactRoutes.js
    │   └── portfolioRoutes.js
    ├── .env.example
    ├── package.json
    ├── README.md
    └── server.js
```

---

## 🚀 Quick Start

### Step 1: Backend Setup

1. **Install MongoDB** (choose one):
   - Local: Download from https://www.mongodb.com/try/download/community
   - Cloud: Create account on https://www.mongodb.com/cloud/atlas (free tier available)

2. **Configure Backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. **Update `.env` file** with your settings:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   # OR use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password_here
   EMAIL_TO=your_email@gmail.com
   FRONTEND_URL=http://localhost:3000
   ```

4. **Setup Gmail for Email Notifications**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Generate app password (16 characters)
   - Use this password in `.env` as `EMAIL_PASSWORD`

5. **Start Backend Server**:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Step 2: Frontend Setup

1. **Start a local server** for the frontend:
   ```bash
   cd /workspaces/Portfolio
   npx http-server
   # Or use Python: python -m http.server 3000
   ```
   Server will run on `http://localhost:3000` (or the port shown)

2. **Update API URL if needed** in `script.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:5000/api';
   ```

---

## 📝 API Endpoints Reference

### Health Check
```
GET /api/health
```
Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-25T..."
}
```

### Contact Form - Submit
```
POST /api/contacts
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "subject": "Project Discussion",
  "message": "I'd like to discuss a potential project..."
}
```

Response:
```json
{
  "success": true,
  "message": "Message sent successfully! I will get back to you soon.",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

### Get Portfolio Data
```
GET /api/portfolio
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "Mohammad Ali Khan",
    "title": "Frontend Developer",
    "bio": "...",
    "skills": [...],
    "experience": [...],
    "education": [...],
    "socialLinks": {...}
  }
}
```

### Update Portfolio (Admin)
```
PUT /api/portfolio
Content-Type: application/json

{
  "name": "Mohammad Ali Khan",
  "title": "Full Stack Developer",
  "bio": "Updated bio..."
}
```

### Add Skill
```
POST /api/portfolio/skills
Content-Type: application/json

{
  "name": "React",
  "proficiency": 85
}
```

---

## ✅ Testing the Backend

### Using cURL

**Test Health Endpoint:**
```bash
curl http://localhost:5000/api/health
```

**Submit Contact Form:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@gmail.com",
    "phone": "9876543210",
    "subject": "Test Subject",
    "message": "This is a test message for the backend"
  }'
```

### Using Postman
1. Download Postman from https://www.postman.com/downloads/
2. Create new request
3. Set method to POST
4. Set URL to `http://localhost:5000/api/contacts`
5. Go to "Body" tab, select "raw" and "JSON"
6. Paste the contact form data
7. Click "Send"

---

## 🔐 Security Features

Your backend includes:

✅ **Input Validation**
- Email validation
- Phone number validation (10+ digits)
- Message length limits (10-1000 chars)
- Name validation (2-50 chars)

✅ **CORS Protection**
- Only specified domains can access API
- Prevents unauthorized cross-origin requests

✅ **Error Handling**
- Graceful error messages
- No sensitive data in responses
- Centralized error middleware

✅ **Data Sanitization**
- Automatic trimming of whitespace
- Email normalization
- SQL injection prevention (via Mongoose)

---

## 📧 How Email Works

When someone submits the contact form:

1. **Validation** - All fields are validated
2. **Storage** - Message saved to MongoDB
3. **Confirmation Email** - Sent to visitor
4. **Notification Email** - Sent to you (portfolio owner)

**Important**: Gmail requires app passwords for less secure apps.

---

## 🗄️ Database Structure

### Contact Collection
Each message stores:
- Full name
- Email address
- Phone number
- Subject
- Message content
- Status (new/read/replied)
- Timestamps

### Portfolio Collection
Stores your portfolio information:
- Personal details (name, title, bio)
- Skills with proficiency levels
- Work experience
- Education history
- Social media links

---

## 🐛 Troubleshooting

### Backend won't start
**Error: Cannot find module 'express'**
```bash
cd backend
npm install
```

### Database connection failed
**Error: connect ECONNREFUSED 127.0.0.1:27017**
- Start MongoDB: `mongod` (local installation)
- OR use MongoDB Atlas (cloud) - update `MONGODB_URI` in `.env`

### Contact form not working
**Error: CORS policy**
- Check `FRONTEND_URL` in `.env`
- Update `allowedOrigins` in `backend/middleware/cors.js`
- Restart backend server

### Emails not sending
**Error: Invalid login**
- Verify Gmail app password (not regular password)
- Check 2FA is enabled on Gmail
- Verify `EMAIL_USER` format in `.env`

**Error: 535-5.7.8 Username and Password not accepted**
- Make sure you generated an app password, not using regular Gmail password
- Regenerate app password and update `.env`

---

## 🚀 Deployment

### Deploy Backend to Heroku

1. **Create Heroku account**: https://www.heroku.com
2. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli
3. **Login to Heroku**:
   ```bash
   heroku login
   ```
4. **Create app**:
   ```bash
   heroku create your-portfolio-api
   ```
5. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_atlas_uri"
   heroku config:set EMAIL_USER="your_gmail@gmail.com"
   heroku config:set EMAIL_PASSWORD="your_app_password"
   ```
6. **Deploy**:
   ```bash
   git push heroku main
   ```

### Deploy Frontend to Netlify

1. **Sign up**: https://www.netlify.com
2. **Connect your Git repo** (if using GitHub)
3. **Build settings** - Leave as is (static site)
4. **Deploy**
5. **Update API URL** in `script.js` to your deployed backend URL

---

## 📱 Frontend Integration Status

✅ **Contact Form**
- The form now submits to the backend
- Displays success/error messages
- Form clears after submission

✅ **Portfolio Data**
- Backend API ready to serve portfolio data
- Can be extended to dynamically update skills, experience, education

✅ **Error Handling**
- Network errors caught
- Validation errors displayed
- User-friendly messages

---

## 🔧 Development Tips

### Monitor Backend Logs
```bash
cd backend
npm run dev
# Look for console.log messages
```

### Check MongoDB Data
```bash
# Using MongoDB Compass (GUI tool)
# Or using Mongo CLI:
mongosh
use portfolio
db.contacts.find()
```

### Frontend-Backend Communication
- Open browser DevTools (F12)
- Go to Network tab
- Submit the contact form
- See the POST request to your API
- Check Response tab for success/error

---

## 📚 Next Steps

1. **Add Authentication** - Protect admin endpoints
   - Implement JWT tokens
   - Secure portfolio editing

2. **Add File Uploads** - Allow profile pictures
   - Integrate Cloudinary or AWS S3
   - Store file URLs in database

3. **Add Blog Section** - Extend portfolio
   - Create Blog model
   - Add blog API endpoints
   - Display on frontend

4. **Analytics** - Track portfolio visits
   - Integrate Google Analytics
   - Track contact submissions

5. **Admin Dashboard** - Manage portfolio
   - Create separate admin UI
   - View/manage messages
   - Update portfolio content

---

## 📞 Support

For API documentation, see: [backend/README.md](./backend/README.md)

For issues or questions:
1. Check logs for error messages
2. Review `.env` configuration
3. Test endpoints with Postman
4. Check MongoDB connection

---

**Your portfolio backend is ready! 🎉**

Start the server with `npm run dev` and test the API endpoints.
