# Quick Command Reference

## Setup & Installation

```bash
# Navigate to backend
cd /workspaces/Portfolio/backend

# Install dependencies (already done)
npm install

# Install Mongoose for MongoDB (already done)
npm install mongoose

# Create .env from template
cp .env.example .env

# Edit configuration
nano .env          # or use VS Code
```

## Running the Backend

```bash
# Development mode (auto-reload on changes)
npm run dev

# Production mode
npm start

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Use different port
PORT=3001 npm run dev
```

## Testing API Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Get portfolio data
curl http://localhost:5000/api/portfolio

# Submit contact form
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "subject": "Hello",
    "message": "Testing the API"
  }'

# Get all contacts
curl http://localhost:5000/api/contacts

# Get specific contact
curl http://localhost:5000/api/contacts/CONTACT_ID

# Mark contact as read
curl -X PUT http://localhost:5000/api/contacts/CONTACT_ID

# Delete contact
curl -X DELETE http://localhost:5000/api/contacts/CONTACT_ID
```

## MongoDB Management

### Local MongoDB

```bash
# Start MongoDB (Linux)
sudo systemctl start mongodb
sudo systemctl stop mongodb
sudo systemctl status mongodb

# Start MongoDB (macOS)
brew services start mongodb-community
brew services stop mongodb-community
brew services restart mongodb-community

# Access MongoDB shell
mongosh
# or (older versions)
mongo

# List databases
show databases

# Switch to portfolio database
use ali-portfolio

# Show collections
show collections

# View contacts
db.contacts.find()

# View portfolio
db.portfolios.find()

# Count documents
db.contacts.countDocuments()

# Delete all contacts
db.contacts.deleteMany({})
```

### MongoDB Atlas (Cloud)

```bash
# Check connection in .env
cat .env

# Test connection
curl http://localhost:5000/api/health
```

## NPM Scripts

```bash
# Run scripts from package.json
npm run dev       # Development with nodemon
npm start         # Production

# List available scripts
npm run

# Check installed versions
npm list
npm list mongoose
npm list express
```

## Project Navigation

```bash
# Go to backend
cd /workspaces/Portfolio/backend

# Go to frontend
cd /workspaces/Portfolio

# List backend files
ls -la backend/

# View backend structure
tree backend/ -L 2 -I node_modules

# Check .env configuration
cat backend/.env

# View server.js
cat backend/server.js

# View models
cat backend/models/Contact.js
cat backend/models/Portfolio.js
```

## Environment Variables

```bash
# View current .env
cat backend/.env

# Edit .env
nano backend/.env
# or open in VS Code

# Check specific variable
grep MONGODB_URI backend/.env

# Create from example
cp backend/.env.example backend/.env

# Update MONGODB_URI (example)
# For Atlas: mongodb+srv://user:pass@cluster.mongodb.net/database
# For Local: mongodb://localhost:27017/ali-portfolio
```

## Git Commands

```bash
# Check git status
git status

# Add backend files
git add backend/

# Commit changes
git commit -m "Add MongoDB database backend"

# View recent commits
git log --oneline -5

# Check remote
git remote -v
```

## Debugging

```bash
# Check if port 5000 is in use
lsof -i :5000
netstat -an | grep 5000

# Check if MongoDB is running
ps aux | grep mongod

# View backend logs (in separate terminal while running)
npm run dev 2>&1 | tee backend.log

# Test connection to MongoDB
mongosh "your_connection_string"

# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB version (if installed)
mongosh --version
mongo --version
```

## Performance Monitoring

```bash
# Check Node.js memory usage
ps aux | grep node

# Monitor in real-time
top
# Then find node process and press 'q' to quit

# Check disk usage
df -h

# Check MongoDB size
du -sh /var/lib/mongodb
```

## File Operations

```bash
# Create backup of .env
cp backend/.env backend/.env.backup

# Create backup of database config
cp backend/config/database.js backend/config/database.js.backup

# Remove backup files
rm backend/.env.backup

# Find all .env files
find . -name ".env*"

# View file sizes
du -h backend/

# List all node_modules
ls -la backend/node_modules | head -20
```

## Docker (Optional - for production)

```bash
# Check if Docker is installed
docker --version

# Build Docker image
docker build -t ali-portfolio-backend .

# Run Docker container
docker run -p 5000:5000 ali-portfolio-backend

# Stop Docker container
docker stop CONTAINER_ID
```

## Common Issues & Solutions

```bash
# Port 5000 already in use
lsof -ti:5000 | xargs kill -9

# MongoDB connection error
# 1. Check if MongoDB is running:
brew services list

# 2. Start MongoDB:
brew services start mongodb-community

# 3. Test connection:
mongosh "mongodb://localhost:27017/ali-portfolio"

# Module not found errors
npm install mongoose
npm install express
npm install cors
npm install nodemailer

# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Update all packages
npm update
```

## Useful URLs

```
http://localhost:5000                # Backend server
http://localhost:5000/api            # API base
http://localhost:5000/api/health     # Health check
http://localhost:5000/api/portfolio  # Portfolio data
http://localhost:5000/api/contacts   # All contacts

MongoDB Atlas: https://www.mongodb.com/cloud/atlas
Mongoose Docs: https://mongoosejs.com
Express Docs: https://expressjs.com
Node.js Docs: https://nodejs.org
```

## File Locations

```
Main Project:
/workspaces/Portfolio/

Backend Files:
/workspaces/Portfolio/backend/
/workspaces/Portfolio/backend/server.js
/workspaces/Portfolio/backend/package.json
/workspaces/Portfolio/backend/.env
/workspaces/Portfolio/backend/config/database.js
/workspaces/Portfolio/backend/models/Contact.js
/workspaces/Portfolio/backend/models/Portfolio.js

Documentation:
/workspaces/Portfolio/DATABASE_BACKEND_GUIDE.md
/workspaces/Portfolio/backend/DATABASE_SETUP.md
/workspaces/Portfolio/backend/README.md
/workspaces/Portfolio/SETUP_COMPLETE.md
/workspaces/Portfolio/QUICK_COMMANDS.md (this file)
```

---

**Start Backend:**
```bash
cd /workspaces/Portfolio/backend && npm run dev
```

**Test Connection:**
```bash
curl http://localhost:5000/api/health
```

**Submit Test Form:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","email":"test@test.com","phone":"1234567890","subject":"Test","message":"Testing"}'
```

---

Good luck! 🚀
