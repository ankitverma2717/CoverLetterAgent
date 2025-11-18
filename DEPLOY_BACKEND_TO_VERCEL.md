# 🚀 Deploy Node.js Backend to Vercel

## Overview

This guide will help you deploy your Node.js Express backend to Vercel alongside your Next.js frontend.

---

## 📋 Prerequisites

- ✅ Vercel account ([signup here](https://vercel.com/signup))
- ✅ Frontend already deployed on Vercel
- ✅ Google Cloud OAuth credentials
- ✅ Git repository (GitHub, GitLab, or Bitbucket)

---

## 🔧 Step 1: Prepare Backend for Vercel

### 1.1 Create `vercel.json` Configuration

Create this file in the **backend/** directory:

```bash
cd backend
```

Create `backend/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 1.2 Update `package.json`

Ensure your `backend/package.json` has the correct start script:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

### 1.3 Create API Entry Point (Optional)

If you want a cleaner URL structure, create `backend/api/index.js`:

```javascript
// This allows your backend to be accessed at /api/*
import app from '../src/server.js';

export default app;
```

Then update `vercel.json`:

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api"
    }
  ]
}
```

---

## 🌐 Step 2: Update CORS Configuration

Update `backend/src/server.js` to allow your Vercel frontend URL:

```javascript
// Before deployment, get your frontend URL from Vercel
// Example: https://your-app.vercel.app

app.use(cors({
    origin: [
        'http://localhost:3000',  // Local development
        'https://your-app.vercel.app',  // Your Vercel frontend URL
        'https://*.vercel.app'  // All Vercel preview deployments
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

Or use environment variable:

```javascript
const allowedOrigins = process.env.FRONTEND_URL 
    ? [process.env.FRONTEND_URL, 'http://localhost:3000']
    : ['http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## 🔐 Step 3: Configure Environment Variables on Vercel

### 3.1 Go to Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your backend project (or create new)
3. Go to **Settings** → **Environment Variables**

### 3.2 Add These Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_ENV` | `production` | Environment |
| `PORT` | `8080` | Port (optional) |
| `GOOGLE_CLIENT_ID` | `your_client_id` | From Google Cloud |
| `GOOGLE_CLIENT_SECRET` | `your_client_secret` | From Google Cloud |
| `GOOGLE_CALLBACK_URL` | `https://your-backend.vercel.app/api/v1/auth/google/callback` | Update with your URL |
| `JWT_SECRET` | `your_64_char_secret` | Random string |
| `JWT_EXPIRES_IN` | `1h` | Token expiration |
| `JWT_REFRESH_EXPIRES_IN` | `7d` | Refresh expiration |
| `FRONTEND_URL` | `https://your-app.vercel.app` | Your frontend URL |
| `GOOGLE_SCOPES` | `openid,email,profile,https://www.googleapis.com/auth/documents,https://www.googleapis.com/auth/drive.readonly` | Scopes |
| `AI_PROVIDER_URL` | `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent` | Gemini API |

---

## 🎯 Step 4: Update Google OAuth Redirect URIs

### 4.1 Add Production Callback URL

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Add to **Authorized redirect URIs**:
   ```
   https://your-backend.vercel.app/api/v1/auth/google/callback
   ```
5. Click **Save**

### 4.2 Add Authorized Origins (if needed)

In **Authorized JavaScript origins**, add:
```
https://your-backend.vercel.app
https://your-app.vercel.app
```

---

## 📦 Step 5: Deploy to Vercel

### Option A: Deploy via Vercel CLI

#### Install Vercel CLI
```bash
npm install -g vercel
```

#### Login to Vercel
```bash
vercel login
```

#### Deploy Backend
```bash
cd backend
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (or Yes if you created one)
- **Project name?** → `covercraft-backend` (or your choice)
- **Directory?** → `./` (current directory)
- **Override settings?** → No

#### Deploy to Production
```bash
vercel --prod
```

### Option B: Deploy via GitHub Integration

#### 5.1 Push Backend to Git Repository

Option 1: Separate Repository (Recommended)
```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/yourusername/covercraft-backend.git
git push -u origin main
```

Option 2: Monorepo with Root Config

If keeping both in same repo, create `vercel.json` in root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/src/server.js"
    }
  ]
}
```

#### 5.2 Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **Import Project**
3. Select your Git repository
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `backend` (if monorepo)
   - **Build Command:** Leave empty
   - **Output Directory:** Leave empty
5. Add environment variables (from Step 3)
6. Click **Deploy**

---

## 🔗 Step 6: Update Frontend to Use Backend URL

### 6.1 Update Frontend Environment Variables

In your **frontend** Vercel project settings:

Add/Update environment variable:
```
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
```

### 6.2 Update Frontend API Calls

In your frontend code, use the environment variable:

```typescript
// frontend/app/components/CoverLetterApp.tsx

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// OAuth Login
const handleGoogleLogin = () => {
  window.location.href = `${API_URL}/api/v1/auth/google`;
};

// API Calls
const response = await fetch(`${API_URL}/api/v1/cover-letter/generate-content`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
  body: formData
});
```

### 6.3 Redeploy Frontend

```bash
cd frontend
git add .
git commit -m "Update API URL for production"
git push
```

Vercel will automatically redeploy.

---

## 🧪 Step 7: Test Deployment

### 7.1 Health Check
```bash
curl https://your-backend.vercel.app/health
```

Expected response:
```json
{"status":"OK","timestamp":"2025-11-18T13:03:27.612Z"}
```

### 7.2 Test OAuth Flow

1. Visit your frontend: `https://your-app.vercel.app`
2. Click "Login with Google"
3. Complete OAuth flow
4. Verify JWT token is received
5. Test cover letter generation

---

## ⚠️ Important Vercel Limitations

### Serverless Function Limits

| Limit | Free Plan | Pro Plan |
|-------|-----------|----------|
| **Execution Time** | 10 seconds | 60 seconds |
| **Memory** | 1024 MB | 3008 MB |
| **Payload Size** | 4.5 MB | 4.5 MB |

### Workarounds for AI Generation

If Gemini API takes >10 seconds (Free plan timeout):

**Option 1: Upgrade to Pro** ($20/month)
- 60 second timeout
- More memory
- Better for production

**Option 2: Use Streaming Responses**

Update `backend/src/services/geminiService.js`:
```javascript
async generateCoverLetter(resumeText, jobDescription, apiKey) {
    // Set shorter timeout for Vercel
    const response = await axios.post(
        `${this.apiUrl}?key=${apiKey}`,
        {
            contents: [{
                parts: [{ text: this.buildPrompt(resumeText, jobDescription) }]
            }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1024  // Reduce for faster response
            }
        },
        {
            timeout: 8000  // 8 second timeout for Vercel
        }
    );
    return response.data;
}
```

**Option 3: Alternative Hosting**

For longer execution times, consider:
- **Railway** (No timeout limits)
- **Render** (No timeout on paid plans)
- **Google Cloud Run** (Custom timeouts)
- **AWS Lambda** (15 min max)

---

## 🔍 Step 8: Monitor and Debug

### View Logs

1. Go to Vercel Dashboard
2. Select your backend project
3. Click on a deployment
4. Click **Functions** tab
5. Click on any function to see logs

### Common Issues

#### 1. "Cannot find module"
**Solution:** Ensure all dependencies are in `package.json`, not devDependencies

#### 2. "Function execution timed out"
**Solution:** Upgrade to Pro or optimize API calls

#### 3. "CORS error"
**Solution:** Check CORS configuration includes frontend URL

#### 4. "OAuth redirect_uri_mismatch"
**Solution:** Add production callback URL to Google Cloud Console

#### 5. "Environment variable not found"
**Solution:** Add all env vars in Vercel dashboard and redeploy

---

## 📊 Deployment Checklist

Before going live, verify:

- [ ] All environment variables set in Vercel
- [ ] Google OAuth callback URL updated
- [ ] CORS allows frontend URL
- [ ] Frontend uses production API URL
- [ ] Health endpoint responds: `/health`
- [ ] OAuth login works
- [ ] Cover letter generation works
- [ ] PDF download works
- [ ] All API endpoints tested
- [ ] Logs show no errors

---

## 🎨 Project Structure After Deployment

```
Production Setup:
├── Frontend:  https://your-app.vercel.app
│   ├── Framework: Next.js
│   ├── Hosting: Vercel
│   └── API calls → Backend
│
└── Backend:   https://your-backend.vercel.app
    ├── Framework: Express.js
    ├── Hosting: Vercel Serverless
    └── Endpoints:
        ├── /health
        ├── /api/v1/auth/*
        ├── /api/v1/cover-letter/*
        └── /api/v1/document/*
```

---

## 💡 Alternative: Deploy Both in Same Project

If you want both frontend and backend in the same Vercel project:

### Root `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "backend/src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/src/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/$1"
    }
  ]
}
```

Then:
- Frontend accessible at: `/`
- Backend accessible at: `/api/*`

---

## 🚀 Deployment Commands Summary

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy backend to preview
cd backend
vercel

# Deploy backend to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel remove <deployment-url>
```

---

## 📱 Mobile App Considerations

If building a mobile app later, you may need:

1. **Separate Backend Domain**
   - Use custom domain: `api.yourdomain.com`
   - Add to Vercel project settings

2. **CORS for Mobile**
   ```javascript
   app.use(cors({
       origin: '*',  // Allow all for mobile apps
       credentials: true
   }));
   ```

---

## 🎯 Production Best Practices

1. **Custom Domain**
   - Add custom domain in Vercel settings
   - Example: `api.covercraft.ai`

2. **Environment Variables**
   - Never commit `.env` file
   - Use different credentials for production

3. **Monitoring**
   - Set up Vercel Analytics
   - Monitor function execution times
   - Check error logs regularly

4. **Caching**
   - Add caching headers for static responses
   - Use Vercel Edge Network

5. **Security**
   - Keep dependencies updated
   - Use strong JWT secrets
   - Enable rate limiting

---

## 📞 Support

If you encounter issues:

1. **Vercel Documentation:** https://vercel.com/docs
2. **Vercel Discord:** https://vercel.com/discord
3. **Check Logs:** Vercel Dashboard → Functions → Logs
4. **Stack Overflow:** Tag `vercel`

---

## 🎊 Success!

Once deployed, your architecture will be:

```
User Request
    ↓
Frontend (Vercel) - https://your-app.vercel.app
    ↓
Backend (Vercel) - https://your-backend.vercel.app
    ↓
External APIs
    ├── Google OAuth
    ├── Google Gemini AI
    ├── Google Docs API
    └── Google Drive API
```

**Your full-stack JavaScript app is now live on Vercel! 🚀**

---

**Last Updated:** November 18, 2025  
**Vercel Version:** 2  
**Node.js Version:** 18.x
