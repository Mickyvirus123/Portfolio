# Portfolio Backend API

A robust Node.js/Express backend for the portfolio website with MongoDB integration.

## 🚀 Features

- **Contact Form API** - Submit and manage contact messages
- **Portfolio Management** - Store and manage portfolio data (skills, experience, education)
- **Email Notifications** - Automatic email confirmations and notifications
- **Input Validation** - Comprehensive form validation
- **Error Handling** - Centralized error handling
- **CORS Support** - Secure cross-origin requests
- **Environment Configuration** - Secure environment-based config

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🔧 Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Update `.env` file with your settings:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

## 🏃 Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Contact Endpoints

- **POST** `/api/contacts` - Submit contact form
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "subject": "Project Inquiry",
    "message": "I'd like to discuss a project..."
  }
  ```

- **GET** `/api/contacts` - Get all contacts (admin)
- **GET** `/api/contacts/:id` - Get specific contact (admin)
- **PUT** `/api/contacts/:id` - Update contact status (admin)
- **DELETE** `/api/contacts/:id` - Delete contact (admin)

### Portfolio Endpoints

- **GET** `/api/portfolio` - Get portfolio data
- **PUT** `/api/portfolio` - Update portfolio (admin)
- **POST** `/api/portfolio/skills` - Add skill (admin)
- **POST** `/api/portfolio/experience` - Add experience (admin)
- **POST** `/api/portfolio/education` - Add education (admin)

### Health Check

- **GET** `/api/health` - Server health status

## 🗄️ Database Models

### Contact Model
```javascript
{
  fullName: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: 'new' | 'read' | 'replied',
  createdAt: Date,
  updatedAt: Date
}
```

### Portfolio Model
```javascript
{
  name: String,
  title: String,
  bio: String,
  email: String,
  phone: String,
  location: String,
  profileImage: String,
  skills: Array,
  experience: Array,
  education: Array,
  socialLinks: Object,
  updatedAt: Date
}
```

## 🔐 Security Features

- Input validation with `express-validator`
- CORS protection
- Environment variable encryption
- Email validation and sanitization
- Phone number validation
- Request size limits

## 📧 Email Setup (Gmail)

1. Enable 2FA on your Gmail account
2. Generate an app password: https://myaccount.google.com/apppasswords
3. Add credentials to `.env`:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_16_character_app_password
   ```

## 🚀 Deployment

### Heroku
```bash
heroku login
heroku create portfolio-api
git push heroku main
heroku config:set MONGODB_URI="your_mongodb_uri"
```

### Railway/Render
- Push code to GitHub
- Connect repository to Railway/Render
- Set environment variables
- Deploy

## 📝 Frontend Integration

Update your frontend contact form to call:

```javascript
fetch('http://localhost:5000/api/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    fullName: form.fullName.value,
    email: form.email.value,
    phone: form.phone.value,
    subject: form.subject.value,
    message: form.message.value,
  }),
})
```

## 🧪 Testing the API

Use Postman or cURL:

```bash
# Test health
curl http://localhost:5000/api/health

# Submit contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "subject": "Test",
    "message": "This is a test message"
  }'
```

## 📦 Project Structure

```
backend/
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

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or provide valid Atlas URI
- Check `MONGODB_URI` in `.env`

**Email Not Sending:**
- Verify app password is correct
- Enable "Less secure app access" if using regular password
- Check spam folder

**CORS Errors:**
- Add frontend URL to `FRONTEND_URL` in `.env`
- Update allowed origins in `middleware/cors.js`

## 📄 License

MIT

## 👨‍💻 Author

Mohammad Ali Khan

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Happy Coding! 🎉**
