# Database Setup Guide

Your portfolio backend now uses **MongoDB** for data persistence. Here's how to set it up:

## Option 1: MongoDB Atlas (Cloud - Recommended for Beginners)

### Step 1: Create a Free MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email/Google/GitHub

### Step 2: Create a Cluster
1. After signup, click "Create Deployment"
2. Select "Free" tier
3. Choose your preferred cloud provider (AWS, Google Cloud, Azure)
4. Select a region (pick one close to you)
5. Click "Create Deployment"
6. Wait for cluster to be created (usually 5-10 minutes)

### Step 3: Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username (e.g., `ali_user`)
5. Generate or set a strong password
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (for development)
   - **Note:** For production, specify your actual IP
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Select "Drivers" 
4. Copy the connection string
5. It should look like:
```
mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
```

### Step 6: Update .env File
```bash
# In /workspaces/Portfolio/backend/.env

MONGODB_URI=mongodb+srv://ali_user:YOUR_PASSWORD@cluster.mongodb.net/ali-portfolio?retryWrites=true&w=majority
```

**Replace:**
- `ali_user` with your database user
- `YOUR_PASSWORD` with your password
- `cluster` with your actual cluster name

---

## Option 2: Local MongoDB Installation

### For Ubuntu/Linux:
```bash
# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb

# Start MongoDB service
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Verify installation
mongo --version
```

### For macOS (with Homebrew):
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

### For Windows:
1. Download from https://www.mongodb.com/try/download/community
2. Run the installer
3. MongoDB will start as a service automatically

### Update .env File for Local MongoDB:
```bash
# In /workspaces/Portfolio/backend/.env

MONGODB_URI=mongodb://localhost:27017/ali-portfolio
```

---

## Verify Your Setup

### Test Database Connection
```bash
cd /workspaces/Portfolio/backend

# Start the backend
npm run dev
```

You should see:
```
✅ MongoDB connected: <hostname>
✅ Backend server is running on http://localhost:5000
```

### Test API Connection
```bash
# In a new terminal
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Backend is running",
  "database": "connected",
  "timestamp": "..."
}
```

---

## Database Collections

Your MongoDB will have these collections:

### 1. **contacts**
Stores contact form submissions:
```json
{
  "_id": ObjectId,
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "subject": "Hello",
  "message": "Your message",
  "read": false,
  "createdAt": "2024-01-25T..."
}
```

### 2. **portfolios**
Stores your portfolio information:
```json
{
  "_id": ObjectId,
  "name": "Mohammad Ali Khan",
  "title": "Frontend Developer",
  "email": "ali@example.com",
  "skills": [
    { "name": "HTML", "proficiency": 90 }
  ],
  "experience": [...],
  "education": [...],
  "updatedAt": "2024-01-25T..."
}
```

---

## MongoDB Compass (Optional GUI)

To view your database visually:

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Open Compass
3. Paste your connection string
4. Click "Connect"
5. Browse your data visually

---

## Troubleshooting

### "MongoNetworkError: connect ECONNREFUSED"
- **Local MongoDB:** Ensure MongoDB service is running
  ```bash
  # Linux/Mac
  brew services start mongodb-community
  
  # Or restart
  sudo systemctl restart mongodb
  ```

### "MongoServerError: connect ENOTFOUND"
- Check your MONGODB_URI in .env
- Verify cluster name and region
- Test connection string in MongoDB Compass

### "Authentication failed"
- Verify username and password in connection string
- Make sure user exists in MongoDB Atlas
- Check special characters are URL-encoded

### Database not persisting data
- Verify MongoDB is actually running
- Check write permissions for local MongoDB
- Restart backend after connection string change

---

## API Endpoints with Database

Now your backend uses these database-backed endpoints:

### Portfolio
```
GET    /api/portfolio          # Get portfolio data
PUT    /api/portfolio          # Update portfolio data
```

### Contacts
```
POST   /api/contacts           # Submit contact form
GET    /api/contacts           # Get all contacts (admin)
GET    /api/contacts/:id       # Get single contact
PUT    /api/contacts/:id       # Mark contact as read
DELETE /api/contacts/:id       # Delete contact
```

### Health
```
GET    /api/health             # Check backend & database status
```

---

## Environment Variables

Required in `.env`:

```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=your_connection_string

# Optional (for email)
EMAIL_SERVICE=gmail
EMAIL_USER=your@email.com
EMAIL_PASSWORD=app_password
```

---

## Next Steps

1. ✅ Choose MongoDB (Atlas or Local)
2. ✅ Set up database and get connection string
3. ✅ Update `.env` file with connection string
4. ✅ Run backend: `npm run dev`
5. ✅ Test API endpoints
6. ✅ Open frontend and submit contact form

Your data will now persist in the database! 🎉

---

## Production Deployment

When deploying:

1. Use MongoDB Atlas (not local)
2. Configure network access to your server IP
3. Use strong passwords
4. Enable authentication
5. Consider backups and monitoring
6. Use connection pooling for scalability

For help, visit: https://docs.mongodb.com/manual/
