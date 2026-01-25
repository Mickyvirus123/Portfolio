# Portfolio Website - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT SIDE (Browser)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Frontend (HTML/CSS/JavaScript)                          │  │
│  │  - index.html (Markup)                                   │  │
│  │  - style.css (Styling)                                   │  │
│  │  - script.js (Interactivity & API calls)                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
         │
         │ HTTP Requests
         │ (CORS Enabled)
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SERVER SIDE (Node.js/Express)               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Express Server (server.js)                              │  │
│  │  ├── GET    /api/portfolio     → Fetch portfolio data   │  │
│  │  ├── PUT    /api/portfolio     → Update portfolio       │  │
│  │  ├── POST   /api/contacts      → Submit contact form    │  │
│  │  ├── GET    /api/contacts      → Get all contacts       │  │
│  │  ├── GET    /api/contacts/:id  → Get single contact     │  │
│  │  ├── PUT    /api/contacts/:id  → Mark as read           │  │
│  │  ├── DELETE /api/contacts/:id  → Delete contact         │  │
│  │  └── GET    /api/health        → Check status           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
         │
         │ Query Database
         │ (Mongoose ODM)
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  DATABASE LAYER (MongoDB)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐      ┌──────────────────┐               │
│  │  contacts        │      │  portfolios      │               │
│  │  Collection      │      │  Collection      │               │
│  │ ─────────────    │      │ ─────────────    │               │
│  │ _id              │      │ _id              │               │
│  │ fullName         │      │ name             │               │
│  │ email            │      │ title            │               │
│  │ phone            │      │ skills []        │               │
│  │ subject          │      │ experience []    │               │
│  │ message          │      │ education []     │               │
│  │ read             │      │ updatedAt        │               │
│  │ createdAt        │      │                  │               │
│  └──────────────────┘      └──────────────────┘               │
│                                                                 │
│  Data Storage Location:                                         │
│  - Local: MongoDB on localhost:27017                            │
│  - Cloud: MongoDB Atlas                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### Contact Form Submission Flow

```
User fills form
    ↓
JavaScript validates form
    ↓
script.js calls: POST /api/contacts
    ↓
Express server receives request
    ↓
server.js validates data
    ↓
Mongoose saves to MongoDB
    ↓
Email notification sent (optional)
    ↓
Response sent to browser
    ↓
Success message displayed
```

### Portfolio Data Retrieval Flow

```
Page loads
    ↓
script.js calls: GET /api/portfolio
    ↓
Express queries MongoDB
    ↓
If no data: Create default portfolio
    ↓
Return portfolio data as JSON
    ↓
JavaScript updates page content
```

## Technology Stack

```
Frontend
├── HTML5 (Structure)
├── CSS3 (Styling)
│   └── Responsive design
│   └── CSS animations
└── Vanilla JavaScript (Interactivity)
    └── Fetch API (HTTP requests)

Backend
├── Node.js (Runtime)
├── Express.js (Web framework)
├── Mongoose (ODM)
├── Nodemailer (Email)
└── CORS (Cross-origin requests)

Database
├── MongoDB (Document database)
├── Local or Cloud (Atlas)
└── Collections: contacts, portfolios
```

## File Structure

```
Portfolio/
├── index.html              ← Frontend markup
├── style.css              ← Frontend styling
├── script.js              ← Frontend logic & API calls
├── images/                ← Image assets
│
└── backend/
    ├── server.js          ← Main Express app
    ├── package.json       ← Dependencies
    ├── .env              ← Configuration (MONGODB_URI)
    ├── .env.example      ← Config template
    ├── .gitignore        ← Git ignore rules
    ├── README.md         ← Backend docs
    ├── DATABASE_SETUP.md ← Database guide
    │
    ├── config/
    │   └── database.js    ← MongoDB connection
    │
    ├── models/
    │   ├── Contact.js     ← Contact schema
    │   └── Portfolio.js   ← Portfolio schema
    │
    ├── data/              ← Old (file-based storage)
    │   ├── contacts.json
    │   └── portfolio.json
    │
    └── node_modules/      ← Installed packages
```

## Component Interactions

```
┌─────────────────────────────────────────────────────────────┐
│ Browser (Frontend)                                          │
│                                                             │
│ script.js                                                   │
│ ├─ DOM manipulation                                         │
│ ├─ Form validation (client-side)                            │
│ ├─ API communication                                        │
│ │  ├─ loadPortfolioData()                                  │
│ │  └─ Form submission handler                              │
│ └─ Event listeners                                          │
│    ├─ Navigation clicks                                     │
│    ├─ Hamburger menu (mobile)                               │
│    └─ Form submit                                           │
└─────────────────────────────────────────────────────────────┘
           ↕ HTTP (JSON)
┌─────────────────────────────────────────────────────────────┐
│ Express Server (Backend)                                    │
│                                                             │
│ server.js                                                   │
│ ├─ Routes (/api/*)                                          │
│ ├─ Middleware (CORS, JSON parser)                           │
│ ├─ Validation logic                                         │
│ ├─ Email service (optional)                                 │
│ └─ Error handling                                           │
│                                                             │
│ Models (Mongoose)                                           │
│ ├─ Contact (schema + validation)                            │
│ └─ Portfolio (schema)                                       │
└─────────────────────────────────────────────────────────────┘
           ↕ Database Commands
┌─────────────────────────────────────────────────────────────┐
│ MongoDB                                                     │
│                                                             │
│ Database: ali-portfolio                                     │
│ ├─ Collection: contacts                                     │
│ │  └─ Documents: contact submissions                        │
│ │                                                           │
│ └─ Collection: portfolios                                   │
│    └─ Documents: portfolio information                      │
└─────────────────────────────────────────────────────────────┘
```

## Request-Response Cycle

### Example: Submit Contact Form

```
1. USER ACTION
   User fills form and clicks Submit
   
2. FRONTEND (script.js)
   - Prevents default submission
   - Gathers form data
   - Validates data (client-side)
   - Sends POST request to /api/contacts
   
3. NETWORK
   POST http://localhost:5000/api/contacts
   Content-Type: application/json
   Body: {fullName, email, phone, subject, message}
   
4. BACKEND (server.js)
   - Receives request
   - Validates data (server-side)
   - Creates new Contact document
   - Saves to MongoDB
   - Sends email notification (if configured)
   - Returns response: {success: true, contactId: ...}
   
5. NETWORK
   Response: 201 Created
   Body: {success: true, message: "...", contactId: "..."}
   
6. FRONTEND (script.js)
   - Receives response
   - Shows success message
   - Clears form
   - Re-enables submit button
```

## Security Layers

```
Frontend
├─ Client-side form validation
├─ HTTPS (in production)
└─ Input sanitization

Backend
├─ Server-side form validation
├─ Mongoose schema validation
├─ CORS filtering
├─ Email validation
├─ Phone validation
├─ MongoDB injection prevention
└─ Error handling (no sensitive data leak)

Database
├─ Connection authentication
├─ Network access control
├─ Encrypted connections
└─ Access permissions
```

## Performance Considerations

```
Optimization              Implementation
──────────────────────────────────────────────
Database Queries          → Indexed fields in MongoDB
Caching                   → Browser cache for assets
Compression               → Gzip compression
API Response Size         → Minimal JSON payloads
Database Connection       → Connection pooling (production)
Frontend Loading          → Lazy loading images
Error Handling            → Graceful error recovery
```

## Scalability Path

```
Current (Development)
    ↓
Phase 1: Add rate limiting
    ↓
Phase 2: Add authentication
    ↓
Phase 3: Deploy to cloud
    ↓
Phase 4: Add caching layer
    ↓
Phase 5: Add admin dashboard
    ↓
Production Ready
```

## Deployment Architecture (Production)

```
                    ┌──────────────────┐
                    │  Domain/DNS      │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │   HTTPS (SSL)    │
                    └────────┬─────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼────┐         ┌────▼────┐        ┌────▼────┐
    │Frontend  │         │Backend   │        │Database │
    │(Vercel)  │         │(Railway) │        │(Atlas)  │
    │- HTML    │         │- Node.js │        │- MongoDB│
    │- CSS     │         │- Express │        │- Cloud  │
    │- JS      │         │- Mongoose│        │         │
    └──────────┘         └──────────┘        └─────────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             │
                    ┌────────▼─────────┐
                    │  Monitoring      │
                    │  - Logs          │
                    │  - Alerts        │
                    │  - Performance   │
                    └──────────────────┘
```

## Development Workflow

```
1. Code changes
   ↓
2. Browser/curl testing
   ↓
3. Database verification
   ↓
4. Git commit
   ↓
5. Push to repository
   ↓
6. Deploy to production
```

---

**Architecture Summary:**
- **Frontend:** Vanilla JS + HTML/CSS (Single Page App)
- **Backend:** Express.js REST API
- **Database:** MongoDB (NoSQL)
- **Communication:** RESTful HTTP with JSON
- **Scalability:** Ready for cloud deployment

