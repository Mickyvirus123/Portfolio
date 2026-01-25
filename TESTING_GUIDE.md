# Example Usage & Testing Guide

## 🧪 Testing All Endpoints

### Prerequisites
- Backend running: `npm run dev` (from backend folder)
- MongoDB running locally or using Atlas connection

---

## 1️⃣ Test Health Endpoint

**Via cURL:**
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-25T10:30:45.123Z"
}
```

---

## 2️⃣ Submit Contact Form

### Valid Submission

**Via cURL:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "subject": "Website Inquiry",
    "message": "This is a test message from the contact form"
  }'
```

**Expected Response:**
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

### Invalid Submission (Missing Email)

**Request:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "phone": "9876543210",
    "subject": "Website Inquiry",
    "message": "This is a test message"
  }'
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Invalid value"
    }
  ]
}
```

### Invalid Phone Number

**Request:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "123",
    "subject": "Website Inquiry",
    "message": "This is a test message"
  }'
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "phone",
      "message": "Please provide a valid phone number (at least 10 digits)"
    }
  ]
}
```

### Message Too Short

**Request:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "subject": "Website Inquiry",
    "message": "Hi"
  }'
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "message",
      "message": "Message must be at least 10 characters"
    }
  ]
}
```

---

## 3️⃣ Get All Contacts (Admin)

**Via cURL:**
```bash
curl http://localhost:5000/api/contacts
```

**Expected Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "subject": "Website Inquiry",
      "message": "This is a test message",
      "status": "new",
      "createdAt": "2026-01-25T10:30:45.123Z",
      "updatedAt": "2026-01-25T10:30:45.123Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "fullName": "Jane Smith",
      "email": "jane@example.com",
      "phone": "9876543211",
      "subject": "Project Proposal",
      "message": "I have an interesting project proposal for you",
      "status": "read",
      "createdAt": "2026-01-25T11:15:30.456Z",
      "updatedAt": "2026-01-25T11:15:30.456Z"
    }
  ]
}
```

---

## 4️⃣ Get Specific Contact

**Via cURL:**
```bash
curl http://localhost:5000/api/contacts/507f1f77bcf86cd799439011
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "subject": "Website Inquiry",
    "message": "This is a test message",
    "status": "new",
    "createdAt": "2026-01-25T10:30:45.123Z",
    "updatedAt": "2026-01-25T10:30:45.123Z"
  }
}
```

---

## 5️⃣ Update Contact Status

**Via cURL:**
```bash
curl -X PUT http://localhost:5000/api/contacts/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "replied"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Contact status updated",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "subject": "Website Inquiry",
    "message": "This is a test message",
    "status": "replied",
    "createdAt": "2026-01-25T10:30:45.123Z",
    "updatedAt": "2026-01-25T10:31:00.789Z"
  }
}
```

---

## 6️⃣ Delete Contact

**Via cURL:**
```bash
curl -X DELETE http://localhost:5000/api/contacts/507f1f77bcf86cd799439011
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

---

## 7️⃣ Get Portfolio Data

**Via cURL:**
```bash
curl http://localhost:5000/api/portfolio
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "name": "Mohammad Ali Khan",
    "title": "Frontend Developer",
    "bio": "Passionate frontend developer with expertise in HTML, CSS, and JavaScript",
    "email": "ali@example.com",
    "phone": null,
    "location": null,
    "profileImage": "/images/about.png",
    "skills": [
      {
        "name": "HTML",
        "proficiency": 90
      },
      {
        "name": "CSS",
        "proficiency": 85
      },
      {
        "name": "JavaScript",
        "proficiency": 80
      }
    ],
    "experience": [
      {
        "title": "Frontend Developer Intern",
        "company": "Codesquadz",
        "period": "August 2023 - March 2024",
        "description": "Developed responsive web applications"
      }
    ],
    "education": [
      {
        "degree": "Bachelor of Technology",
        "institution": "Gurugram University",
        "year": "2021 - 2025",
        "details": "Computer Science"
      }
    ],
    "socialLinks": {
      "facebook": "https://www.facebook.com/ali.khan.977986",
      "instagram": "https://www.instagram.com/salaar_sikander_315",
      "twitter": "https://x.com/AliKhan19982258",
      "linkedin": "https://www.linkedin.com/in/mohammad-ali-khan-72b34a285"
    }
  }
}
```

---

## 8️⃣ Add New Skill

**Via cURL:**
```bash
curl -X POST http://localhost:5000/api/portfolio/skills \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React",
    "proficiency": 75
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Skill added successfully",
  "data": [
    {
      "name": "HTML",
      "proficiency": 90
    },
    {
      "name": "CSS",
      "proficiency": 85
    },
    {
      "name": "React",
      "proficiency": 75
    }
  ]
}
```

---

## 9️⃣ Add New Experience

**Via cURL:**
```bash
curl -X POST http://localhost:5000/api/portfolio/experience \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Frontend Developer",
    "company": "Tech Startup",
    "period": "April 2024 - Present",
    "description": "Building responsive web applications using React and Node.js"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Experience added successfully",
  "data": [
    {
      "title": "Frontend Developer Intern",
      "company": "Codesquadz",
      "period": "August 2023 - March 2024",
      "description": "Developed responsive web applications"
    },
    {
      "title": "Frontend Developer",
      "company": "Tech Startup",
      "period": "April 2024 - Present",
      "description": "Building responsive web applications using React and Node.js"
    }
  ]
}
```

---

## 🔟 Add New Education

**Via cURL:**
```bash
curl -X POST http://localhost:5000/api/portfolio/education \
  -H "Content-Type: application/json" \
  -d '{
    "degree": "Full Stack Development Bootcamp",
    "institution": "Coding Academy",
    "year": "2024",
    "details": "Completed intensive full stack development course"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Education added successfully",
  "data": [
    {
      "degree": "Bachelor of Technology",
      "institution": "Gurugram University",
      "year": "2021 - 2025",
      "details": "Computer Science"
    },
    {
      "degree": "Full Stack Development Bootcamp",
      "institution": "Coding Academy",
      "year": "2024",
      "details": "Completed intensive full stack development course"
    }
  ]
}
```

---

## 🎯 Frontend Form Submission

When you fill out the contact form on your portfolio website and click "Send Message":

**Form Data Captured:**
- Full Name: "Visitor Name"
- Email: "visitor@example.com"
- Phone: "1234567890"
- Subject: "Let's Work Together"
- Message: "I'm interested in working on a project with you..."

**JavaScript Function Called:**
```javascript
fetch('http://localhost:5000/api/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    fullName: "Visitor Name",
    email: "visitor@example.com",
    phone: "1234567890",
    subject: "Let's Work Together",
    message: "I'm interested in working on a project with you..."
  }),
})
```

**Result:**
- ✅ Message saved to MongoDB
- ✅ Confirmation email sent to visitor
- ✅ Notification email sent to portfolio owner
- ✅ Success message displayed to user

---

## 📊 Using Postman for Testing

### Import Collection

1. Open Postman
2. Click "Import"
3. Select "Raw Text" tab
4. Paste this configuration:

```json
{
  "info": {
    "name": "Portfolio API",
    "description": "Testing collection for portfolio backend"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/health"
      }
    },
    {
      "name": "Submit Contact",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "url": "http://localhost:5000/api/contacts",
        "body": {
          "mode": "raw",
          "raw": "{\"fullName\": \"John Doe\", \"email\": \"john@example.com\", \"phone\": \"9876543210\", \"subject\": \"Test\", \"message\": \"This is a test message\"}"
        }
      }
    },
    {
      "name": "Get Contacts",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/contacts"
      }
    },
    {
      "name": "Get Portfolio",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/portfolio"
      }
    }
  ]
}
```

---

## ✅ Common Status Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid data/validation failed |
| 404 | Not Found | Resource not found |
| 500 | Internal Error | Server error |

---

**Start testing your backend API! 🚀**
