# Portfolio Website Backend Setup Guide

## Overview

Your portfolio website now has a full Node.js/Express backend with the following features:

✅ Contact form handling with validation  
✅ Email notifications (optional)  
✅ Portfolio data API  
✅ CORS support for frontend integration  
✅ File-based data persistence  

## Backend Structure

```
backend/
├── server.js              # Main Express application
├── package.json           # Dependencies
├── .env.example          # Environment template
├── .env                  # Your configuration (create from example)
├── .gitignore            # Git ignore rules
├── README.md             # Backend documentation
└── data/
    ├── contacts.json     # Submitted contact forms
    └── portfolio.json    # Portfolio information
```

## Quick Start

### 1. First Time Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (already done)
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### 2. Run the Backend

**Development mode** (with auto-reload):
```bash
cd backend && npm run dev
```

**Production mode:**
```bash
cd backend && npm start
```

Server will be available at: `http://localhost:5000`

## API Endpoints

### 1. Get Portfolio Data
```
GET /api/portfolio
```
Returns your skills, experience, and education.

### 2. Submit Contact Form
```
POST /api/contacts
```
**Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "subject": "Project Inquiry",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "contactId": 1234567890
}
```

### 3. Get All Contacts (Admin)
```
GET /api/contacts
```
Returns all submitted contact forms.

### 4. Health Check
```
GET /api/health
```
Returns server status.

## Testing the Backend

### Test with cURL

```bash
# Test health check
curl http://localhost:5000/api/health

# Get portfolio data
curl http://localhost:5000/api/portfolio

# Submit contact form
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Your Name",
    "email": "your@email.com",
    "phone": "9876543210",
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

### Test in Browser

Visit `http://localhost:5000/api/health` to check if backend is running.

## Email Configuration (Optional)

To enable email notifications:

### For Gmail:

1. **Enable 2-Factor Authentication** in Google Account settings
2. **Create an App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password

3. **Update .env file:**
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

4. **Restart the backend** - emails will now be sent on form submissions

### For Other Providers:

Check [Nodemailer SMTP Documentation](https://nodemailer.com/smtp/)

## Data Management

### View Submitted Contacts

```bash
# See all contacts submitted
cat backend/data/contacts.json
```

### Edit Portfolio Information

Edit `backend/data/portfolio.json`:

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "email": "your@email.com",
  "skills": [
    { "name": "Skill Name", "proficiency": 85 }
  ],
  "experience": [
    {
      "role": "Job Title",
      "company": "Company Name",
      "duration": "Month Year - Month Year"
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "school": "School Name",
      "year": "Year Range"
    }
  ]
}
```

## Validation Rules

When submitting the contact form, the backend validates:

- **Full Name:** Required, non-empty
- **Email:** Required, valid email format
- **Phone:** Required, 10-digit number
- **Subject:** Required, non-empty
- **Message:** Required, non-empty

## Frontend Integration

Your frontend (`script.js`) already has integration configured:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

The contact form and portfolio loading will work automatically once the backend is running.

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 npm start
```

### CORS errors
- Ensure frontend is accessing `http://localhost:5000/api`
- Check browser console for specific error messages
- Backend has CORS enabled for all origins

### Emails not sending
- Verify EMAIL_USER and EMAIL_PASSWORD in .env
- For Gmail: Use App Password, not regular password
- Check email spam folder
- Restart backend after updating .env

### Data not persisting
- Check that `backend/data/` directory exists
- Ensure write permissions on the data directory
- Check file size limits

## Deployment

For production deployment:

1. **Use a proper database** (MongoDB, PostgreSQL)
2. **Deploy to a hosting service:**
   - Heroku
   - Railway
   - Render
   - AWS
   - DigitalOcean

3. **Update frontend API URL:**
```javascript
const API_BASE_URL = 'https://your-production-backend.com/api';
```

4. **Add security:**
   - Rate limiting for contact form
   - Input sanitization
   - Environment variable validation
   - HTTPS only

## File Locations

| File | Purpose |
|------|---------|
| `backend/server.js` | Main application logic |
| `backend/package.json` | Dependencies list |
| `backend/.env` | Configuration (create from .env.example) |
| `backend/data/contacts.json` | Submitted contacts |
| `backend/data/portfolio.json` | Portfolio data |

## Next Steps

1. ✅ Backend is created and installed
2. 📝 Create `.env` file from `.env.example`
3. 🔧 Configure email (optional)
4. 🚀 Run `npm run dev` to start server
5. 🌐 Open your portfolio frontend
6. 📨 Test the contact form

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend logs in terminal
3. Check browser console for frontend errors
4. Verify .env configuration

Good luck with your portfolio! 🚀
