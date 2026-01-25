# Portfolio Website - Backend Setup Guide

## 📋 Project Structure

```
Portfolio-main/
├── index.html
├── style.css
├── script.js
├── images/
└── backend/
    ├── server.js
    ├── package.json
    ├── .env.example
    ├── .gitignore
    └── README.md
```

## 🚀 Quick Start

### Step 1: Install Node.js
Download and install Node.js from [nodejs.org](https://nodejs.org/)

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install
```

### Step 3: Configure Email

1. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

2. **Setup Gmail (Recommended):**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Factor Authentication
   - Go to App Passwords and generate one for Mail
   - Update `.env`:
     ```
     PORT=5000
     EMAIL_SERVICE=gmail
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASSWORD=your_16_char_app_password
     OWNER_EMAIL=your_email@gmail.com
     ```

3. **Or use other email services:**
   - Gmail ✅
   - Outlook
   - Yahoo Mail
   - Custom SMTP servers

### Step 4: Start Backend

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

You should see:
```
✅ Server is running on http://localhost:5000
📧 Email service: gmail
```

### Step 5: Test the Backend

Open your browser and go to: `http://localhost:5000/api/health`

You should see:
```json
{
  "message": "Server is running successfully!"
}
```

## 📧 How It Works

1. **User fills contact form** on portfolio website
2. **Form data is sent** to `http://localhost:5000/api/contact`
3. **Backend validates** all inputs
4. **Two emails are sent:**
   - To portfolio owner (notification)
   - To visitor (auto-reply)
5. **Success message** shown to user

## 🔧 API Documentation

### Health Check
```
GET /api/health
```
Response: `{ "message": "Server is running successfully!" }`

### Contact Form Submission
```
POST /api/contact
```

**Request:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "subject": "Regarding Web Development",
  "message": "I would like to discuss a web project..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully! I will get back to you soon."
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [...]
}
```

## ✅ Validation Rules

| Field | Rules |
|-------|-------|
| fullName | Required, min 2 chars |
| email | Required, valid email format |
| phone | Required, min 10 digits |
| subject | Required, min 3 chars |
| message | Required, min 10 chars |

## 🌐 Deployment

### Deploy Backend to Heroku (Free)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-portfolio-backend

# Set environment variables
heroku config:set EMAIL_USER=your_email@gmail.com
heroku config:set EMAIL_PASSWORD=your_app_password
heroku config:set OWNER_EMAIL=your_email@gmail.com

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

**Update frontend after deployment:**
In `script.js`, change:
```javascript
const API_URL = 'https://your-portfolio-backend.herokuapp.com/api/contact';
```

### Deploy to Render.com

1. Push code to GitHub
2. Connect GitHub repo to Render
3. Set environment variables in Render dashboard
4. Deploy
5. Update API_URL in script.js

### Deploy to Railway.app

Similar to Render - connect GitHub and set env vars.

## 📱 Update Frontend for Production

After deploying backend, update `script.js`:

```javascript
// Change this line:
const API_URL = 'http://localhost:5000/api/contact';

// To your deployed backend URL:
const API_URL = 'https://your-deployed-backend.com/api/contact';
```

## 🐛 Troubleshooting

### Backend won't start
- Check if Node.js is installed: `node --version`
- Check if port 5000 is available
- Reinstall dependencies: `npm install`

### Emails not sending
- Verify `.env` file exists and has correct credentials
- Check Gmail App Password (16 characters)
- Enable "Less secure app access" if using regular Gmail password
- Check spam folder

### Frontend can't connect to backend
- Ensure backend is running on `http://localhost:5000`
- Check browser console (F12) for CORS errors
- Check if API_URL in script.js is correct

### CORS Errors
- Backend already has CORS enabled
- If using different domain, update `.env` FRONTEND_URL

## 📝 Environment Variables Reference

```
# Server
PORT=5000                           # Server port (default: 5000)

# Email Configuration
EMAIL_SERVICE=gmail                 # Service provider
EMAIL_USER=your_email@gmail.com     # Your email address
EMAIL_PASSWORD=app_password         # Gmail app password (16 chars)
OWNER_EMAIL=your_email@gmail.com   # Where to send notifications

# Frontend (optional)
FRONTEND_URL=http://localhost:3000  # For CORS
```

## 🎯 Next Steps

1. ✅ Backend is ready
2. ✅ Contact form is connected
3. 📊 (Optional) Add database to store messages
4. 🔐 (Optional) Add authentication
5. 📈 (Optional) Add analytics

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Heroku Deployment Guide](https://devcenter.heroku.com/)
- [Render.com Docs](https://render.com/docs)

## 💡 Tips

- Keep `.env` file in `.gitignore` (never commit sensitive data)
- Test locally before deploying
- Monitor your Gmail app password usage
- Backup your `.env` values securely
- Test contact form thoroughly before going live

## 🆘 Need Help?

Check the browser console (F12) for error messages
Check backend console for detailed error logs
Verify all environment variables are set correctly
Ensure backend is running before submitting forms

---

**Happy coding! 🚀**
