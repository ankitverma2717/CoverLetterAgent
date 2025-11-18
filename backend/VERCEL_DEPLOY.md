# Vercel Deployment Quick Reference

## Quick Deploy Commands

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview (from backend/ directory)
cd backend
vercel

# Deploy to production
vercel --prod
```

## Required Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=https://your-backend.vercel.app/api/v1/auth/google/callback
JWT_SECRET
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=https://your-app.vercel.app
GOOGLE_SCOPES=openid,email,profile,https://www.googleapis.com/auth/documents,https://www.googleapis.com/auth/drive.readonly
AI_PROVIDER_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
NODE_ENV=production
```

## After Deployment

1. **Update Google OAuth:**
   - Add callback URL: `https://your-backend.vercel.app/api/v1/auth/google/callback`

2. **Update Frontend:**
   - Set env var: `NEXT_PUBLIC_API_URL=https://your-backend.vercel.app`

3. **Test:**
   - Health check: `https://your-backend.vercel.app/health`

## Important Notes

⚠️ **Free Plan Limitations:**
- 10 second execution timeout
- May not be enough for AI generation
- Consider Pro plan ($20/month) for 60 second timeout

## Full Guide

See: **DEPLOY_BACKEND_TO_VERCEL.md** for complete instructions
