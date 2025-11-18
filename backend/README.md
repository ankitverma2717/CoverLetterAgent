# CoverCraft AI - Node.js Backend

This is the Node.js/Express backend for CoverCraft AI, migrated from the Java Spring Boot implementation.

## 🚀 Features

- **Google OAuth 2.0** - Secure authentication with JWT tokens
- **AI-Powered Generation** - Integrates with Google Gemini API
- **Google Docs & Drive API** - Create and export documents
- **PDF Processing** - Extract text from resume PDFs
- **RESTful API** - Clean, well-structured endpoints
- **Security** - Helmet, CORS, authentication middleware
- **Error Handling** - Comprehensive error handling and logging

## 📋 Prerequisites

- Node.js 18+ 
- npm 9+
- Google Cloud Platform account with:
  - OAuth 2.0 credentials
  - Google Docs API enabled
  - Google Drive API enabled
- Gemini API key

## ⚙️ Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy the template and fill in your credentials:

```bash
cp .env.template .env
```

Edit `.env` file:

```env
PORT=8080
NODE_ENV=development

GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:8080/api/v1/auth/google/callback

JWT_SECRET=your_super_secret_jwt_key_minimum_512_bits_long
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:3000

GOOGLE_SCOPES=openid,email,profile,https://www.googleapis.com/auth/documents,https://www.googleapis.com/auth/drive.readonly

AI_PROVIDER_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
```

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on `http://localhost:8080`

## 📡 API Endpoints

### Authentication

#### `GET /api/v1/auth/google`
Initiates Google OAuth flow

#### `GET /api/v1/auth/google/callback`
OAuth callback endpoint

#### `POST /api/v1/auth/refresh`
Refresh JWT token
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `{ "token": "new_jwt_token" }`

#### `POST /api/v1/auth/logout`
Logout user
- **Headers:** `Authorization: Bearer <token>`

#### `GET /api/v1/auth/profile`
Get user profile
- **Headers:** `Authorization: Bearer <token>`

### Cover Letter

#### `POST /api/v1/cover-letter/generate-content`
Generate cover letter content
- **Headers:** `Authorization: Bearer <token>`
- **Body (multipart/form-data):**
  - `resumes`: PDF files (max 5)
  - `jobDescription`: Job description text
  - `apiKey`: User's Gemini API key
- **Response:** `{ "content": "generated content" }`

#### `POST /api/v1/cover-letter/create-document`
Create Google Doc
- **Headers:** 
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "title": "Cover Letter - Company",
    "content": "[H1]Name\n..."
  }
  ```
- **Response:** `{ "documentId": "doc_id" }`

#### `POST /api/v1/cover-letter/preview`
Preview content
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "content": "text" }`

### Documents

#### `GET /api/v1/document/:documentId/download`
Download document as PDF
- **Headers:** `Authorization: Bearer <token>` (optional if token in query)
- **Query:** `?token=jwt_token` (alternative auth)
- **Response:** PDF file

#### `GET /api/v1/document/:documentId/info`
Get document information
- **Headers:** `Authorization: Bearer <token>`

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── jwt.js              # JWT token utilities
│   │   └── passport.js         # Passport Google OAuth config
│   ├── controllers/
│   │   ├── authController.js        # Auth endpoints
│   │   ├── coverLetterController.js # Cover letter generation
│   │   └── documentController.js    # Document management
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication
│   │   ├── errorHandler.js    # Global error handler
│   │   └── upload.js           # File upload config
│   ├── routes/
│   │   ├── authRoutes.js       # Auth routes
│   │   ├── coverLetterRoutes.js # Cover letter routes
│   │   └── documentRoutes.js   # Document routes
│   ├── services/
│   │   ├── authService.js      # Auth business logic
│   │   ├── geminiService.js    # AI service
│   │   ├── googleDocsService.js # Google Docs/Drive
│   │   └── pdfService.js       # PDF processing
│   └── server.js               # Main entry point
├── .env.template               # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Key Differences from Java Version

### Dependencies
- **Express.js** replaces Spring Boot
- **Passport.js** replaces Spring Security OAuth2
- **jsonwebtoken** replaces Spring JWT
- **pdf-parse** replaces Apache PDFBox
- **googleapis** (Node client) replaces Java Google API clients

### Architecture
- Service-oriented architecture maintained
- RESTful API structure preserved
- Middleware pattern for authentication and error handling
- ES6 modules for modern JavaScript

### Configuration
- `.env` file replaces `application.properties`
- Environment variables for all configuration
- No need for Gradle or Maven

## 🧪 Testing the Migration

1. **Start the backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Test health endpoint:**
   ```bash
   curl http://localhost:8080/health
   ```

3. **Test with frontend:**
   - Update frontend API URLs to point to Node.js backend
   - Both should work identically

## 🚀 Deployment

### Heroku
```bash
heroku login
heroku create covercraft-api-nodejs
heroku config:set GOOGLE_CLIENT_ID=your_id
heroku config:set GOOGLE_CLIENT_SECRET=your_secret
heroku config:set JWT_SECRET=your_secret
heroku config:set FRONTEND_URL=https://yourfrontend.com
git push heroku main
```

### AWS / Azure
1. Build the application
2. Set environment variables
3. Start with `npm start`
4. Ensure Node.js 18+ runtime

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change PORT in .env file or:
PORT=3001 npm start
```

**Module not found errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**JWT token issues:**
- Ensure JWT_SECRET is at least 64 characters
- Check token expiration times

**Google API errors:**
- Verify credentials in .env
- Check OAuth redirect URI in Google Console
- Ensure APIs are enabled

## 📝 License

MIT License - Same as the original Java version

## 🙏 Credits

Migrated from Java Spring Boot to Node.js Express
Original author: Ankit Verma
