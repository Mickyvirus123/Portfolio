# 📋 Backend Quick Reference

## 🚀 Start Backend
```bash
cd backend
npm install        # First time only
npm run dev        # Start server
```

## 📍 API Base URL
```
http://localhost:5000/api
```

## 🔗 Key Endpoints

### Health Check
```
GET /health
```

### Contact Form
```
POST /contacts
```

### Portfolio
```
GET /portfolio
PUT /portfolio
POST /portfolio/skills
POST /portfolio/experience
POST /portfolio/education
```

## 🛠️ Configuration

### `.env` File Variables
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@portfolio.com
EMAIL_TO=your_email@gmail.com
FRONTEND_URL=http://localhost:3000
```

## 📦 Project Structure
```
backend/
├── config/          # Database & email config
├── controllers/     # Business logic
├── middleware/      # Validation & CORS
├── models/          # Database schemas
├── routes/          # API endpoints
├── .env.example     # Environment template
├── package.json     # Dependencies
└── server.js        # Main server
```

## 🧪 Test Contact Form
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "subject": "Test",
    "message": "This is a test message"
  }'
```

## 📊 Database Models

### Contact
- fullName (required, 2-50 chars)
- email (required, valid email)
- phone (required, 10+ digits)
- subject (required, 5-100 chars)
- message (required, 10-1000 chars)
- status (new/read/replied)

### Portfolio
- name, title, bio
- email, phone, location
- profileImage
- skills (name + proficiency)
- experience (title, company, period, description)
- education (degree, institution, year, details)
- socialLinks (facebook, instagram, twitter, linkedin)

## ✅ Frontend Integration

### Contact Form Submission
```javascript
const API_BASE_URL = 'http://localhost:5000/api';

fetch(`${API_BASE_URL}/contacts`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    fullName, email, phone, subject, message
  })
})
```

## 🔐 Security Features
- ✅ Input validation
- ✅ Email sanitization  
- ✅ CORS protection
- ✅ Request size limits
- ✅ Error handling

## 🚀 Deployment Checklist
- [ ] MongoDB URI (local or Atlas)
- [ ] Gmail app password
- [ ] Environment variables set
- [ ] CORS URLs configured
- [ ] Email credentials verified
- [ ] Backend running locally
- [ ] Contact form tested
- [ ] No sensitive data in code

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | Change PORT in .env |
| DB connection failed | Start MongoDB or check URI |
| CORS error | Add URL to FRONTEND_URL |
| Email not sending | Verify app password |
| Module not found | Run npm install |

## 📚 Documentation
- [Setup Guide](./BACKEND_SETUP.md)
- [Testing Guide](./TESTING_GUIDE.md)
- [Full README](./backend/README.md)

## 🎯 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server  
npm start

# Check server health
curl http://localhost:5000/api/health

# Get portfolio data
curl http://localhost:5000/api/portfolio

# View backend logs
# Check terminal where npm run dev is running
```

## 📝 Notes
- Backend runs on port 5000 by default
- Frontend should be on different port (3000, 8080, etc.)
- MongoDB must be running (local or Atlas)
- Environment variables required before starting
- Email setup requires Gmail 2FA + app password

---

**Save this file for quick reference! 📌**
