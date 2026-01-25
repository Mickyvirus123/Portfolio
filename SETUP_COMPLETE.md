# 🎉 Database Backend - Complete Setup

Your portfolio website now has a **MongoDB-backed Express backend**! Here's everything you need to know.

## ✅ What's Been Set Up

### Backend Structure
```
backend/
├── config/database.js           ← MongoDB connection
├── models/
│   ├── Contact.js              ← Contact schema with validation
│   └── Portfolio.js            ← Portfolio data schema
├── server.js                   ← Express app (upgraded to use DB)
├── package.json                ← Dependencies (mongoose added)
├── .env.example                ← Configuration template
└── DATABASE_SETUP.md           ← Detailed DB guide
```

### Technologies Used
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - Database ODM (Object Data Mapper)
- **Nodemailer** - Email service (optional)
- **CORS** - Cross-origin requests

## 🚀 Getting Started (3 Steps)

### Step 1: Choose MongoDB
Pick one option:

**A) MongoDB Atlas (Cloud - Recommended)**
```
1. Go to mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (free tier)
4. Create database user
5. Get connection string
```

**B) Local MongoDB**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb

# macOS
brew install mongodb-community
brew services start mongodb-community

# Windows
# Download and install from mongodb.com
```

### Step 2: Configure .env
```bash
cd backend
cp .env.example .env

# Edit .env:
# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ali-portfolio?retryWrites=true&w=majority

# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/ali-portfolio
```

### Step 3: Start Backend
```bash
cd backend
npm run dev
```

✅ You should see:
```
✅ MongoDB connected: <hostname>
✅ Backend server is running on http://localhost:5000
```

## 📡 API Endpoints

### Get Portfolio Data
```bash
GET /api/portfolio
```
Returns your skills, experience, education, and portfolio info.

### Submit Contact Form
```bash
POST /api/contacts
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "subject": "Project Inquiry",
  "message": "Let's work together!"
}
```

### Admin: View All Contacts
```bash
GET /api/contacts
```
Returns all contact submissions with timestamps.

### Admin: View Single Contact
```bash
GET /api/contacts/:id
```

### Admin: Mark Contact as Read
```bash
PUT /api/contacts/:id
```

### Admin: Delete Contact
```bash
DELETE /api/contacts/:id
```

### Check Backend Status
```bash
GET /api/health
```

## 🗄️ Database Schema

### Contacts Collection
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  read: Boolean,
  createdAt: Date
}
```

### Portfolios Collection
```javascript
{
  _id: ObjectId,
  name: String,
  title: String,
  email: String,
  skills: [{name: String, proficiency: Number}],
  experience: [{role, company, duration, description}],
  education: [{degree, school, year, description}],
  socialLinks: {facebook, instagram, twitter, linkedin},
  updatedAt: Date
}
```

## 🧪 Test It Out

### Terminal Testing
```bash
# Health check
curl http://localhost:5000/api/health

# Get portfolio
curl http://localhost:5000/api/portfolio

# Submit contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test",
    "email": "test@example.com",
    "phone": "1234567890",
    "subject": "Test",
    "message": "Testing database"
  }'

# View contacts
curl http://localhost:5000/api/contacts
```

### Browser Testing
1. Start backend: `npm run dev`
2. Open your portfolio website
3. Fill contact form and submit
4. Data saves to MongoDB automatically ✨

## 💾 Data Persistence

Your data is now stored in MongoDB and will:
- ✅ Survive server restarts
- ✅ Be queryable and sortable
- ✅ Have automatic timestamps
- ✅ Support complex filtering

## 🔧 Environment Variables

**Required:**
```
PORT=5000
MONGODB_URI=your_connection_string
```

**Optional (for email notifications):**
```
EMAIL_SERVICE=gmail
EMAIL_USER=your@email.com
EMAIL_PASSWORD=app_password
```

## 📚 Documentation Files

1. **DATABASE_SETUP.md** - Detailed database setup guide
2. **DATABASE_BACKEND_GUIDE.md** - Overview and troubleshooting
3. **README.md** - Backend API reference

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `connect ECONNREFUSED` | MongoDB not running. Start with: `brew services start mongodb-community` |
| `connect ENOTFOUND` | Check MONGODB_URI in .env file |
| `Authentication failed` | Verify username/password in connection string |
| Form not submitting | Check browser console for errors, ensure backend is running |
| Data not saving | Restart backend after changing .env |

For detailed help, see **DATABASE_SETUP.md**

## 🎯 Next Steps

### Immediate (To Get Running)
1. ✅ Set up MongoDB (Atlas or Local)
2. ✅ Create and configure .env
3. ✅ Run `npm run dev`
4. ✅ Test contact form

### Recommended (Enhance Project)
1. Set up email notifications (Gmail SMTP)
2. Create admin dashboard to view contacts
3. Add rate limiting to contact form
4. Set up database backups

### Advanced (For Production)
1. Deploy backend to cloud (Heroku, Railway, Render)
2. Use MongoDB Atlas (not local)
3. Set up SSL/TLS
4. Enable authentication
5. Configure monitoring

## 🚢 Deployment Checklist

- [ ] Using MongoDB Atlas (not local)
- [ ] Strong database password
- [ ] Network access configured
- [ ] Environment variables secured
- [ ] Backend deployed to production server
- [ ] Frontend API URL updated
- [ ] Database backups enabled
- [ ] Logging/monitoring set up

## 📞 Support Resources

- **MongoDB Docs:** https://docs.mongodb.com/
- **Mongoose Docs:** https://mongoosejs.com/
- **Express Docs:** https://expressjs.com/
- **Node.js Docs:** https://nodejs.org/docs/

## 🎉 You're All Set!

Your portfolio now has:
- ✅ Professional MongoDB database
- ✅ Scalable Express backend
- ✅ Data validation
- ✅ Persistent storage
- ✅ Admin-ready API

**Next: Start the backend and test your contact form!**

```bash
cd backend && npm run dev
```

Questions? Check the detailed guides:
- [DATABASE_SETUP.md](backend/DATABASE_SETUP.md)
- [README.md](backend/README.md)
- [DATABASE_BACKEND_GUIDE.md](DATABASE_BACKEND_GUIDE.md)
