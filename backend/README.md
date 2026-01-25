# Ali's Portfolio Backend

A simple Express.js backend API for the portfolio website that handles contact form submissions and serves portfolio data.

## Features

- ✅ Contact form submission with validation
- 📧 Email notifications (optional)
- 📦 Portfolio data management
- 🔒 Input validation
- 🚀 CORS enabled for frontend integration
- 💾 File-based data storage

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```
PORT=5000

# Optional: Email notifications
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Email Setup (Optional):**
- For Gmail: Use [App Password](https://support.google.com/accounts/answer/185833)
- For other providers: Check [nodemailer documentation](https://nodemailer.com/smtp/)

### 3. Run the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Portfolio Data
- **GET** `/api/portfolio`
  - Returns portfolio information, skills, experience, and education

### Contact Form
- **POST** `/api/contacts`
  - Submits a contact form
  - **Required fields:** fullName, email, phone, subject, message
  - **Phone format:** 10 digits (can include formatting)

- **GET** `/api/contacts`
  - Returns all submitted contacts (admin view)

### Health Check
- **GET** `/api/health`
  - Returns server status

## Request Examples

### Submit Contact Form

```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "subject": "Hello Ali",
    "message": "I would like to work with you"
  }'
```

### Get Portfolio Data

```bash
curl http://localhost:5000/api/portfolio
```

## File Structure

```
backend/
├── server.js           # Main server file
├── package.json        # Dependencies
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore file
├── data/
│   ├── contacts.json  # Stored contact submissions
│   └── portfolio.json # Portfolio data
└── README.md          # This file
```

## Data Storage

- **Contacts:** Stored in `data/contacts.json`
- **Portfolio:** Stored in `data/portfolio.json`

Data persists between server restarts.

## Customization

Edit `data/portfolio.json` to update your portfolio information:

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "email": "your@email.com",
  "skills": [...],
  "experience": [...],
  "education": [...]
}
```

## Production Deployment

For production, consider:

1. Use a proper database (MongoDB, PostgreSQL)
2. Deploy to a hosting service (Heroku, Railway, Vercel)
3. Use environment variables for all configuration
4. Add rate limiting for contact form
5. Add proper error logging
6. Use a reverse proxy (Nginx)

## Troubleshooting

**Port already in use:**
```bash
# Kill the process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port
PORT=3001 npm start
```

**Email not sending:**
- Verify EMAIL_USER and EMAIL_PASSWORD in `.env`
- For Gmail: Ensure App Password is used (not regular password)
- Check email service provider's requirements

**CORS errors:**
- Ensure frontend is calling `http://localhost:5000/api`
- Check browser console for specific error messages

## License

MIT
