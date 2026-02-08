# Live Deployment Fix Guide

## Issue
Changes pushed to Git but not reflecting on live link.

## Solution Steps

### Step 1: Verify Environment Variable
Make sure your hosting platform (Vercel/Netlify/etc.) has the environment variable set:

**Variable Name:** `VITE_API_URL`  
**Value:** `https://pathfinder-ai-v1rk.onrender.com/api`

### Step 2: Clear Build Cache & Rebuild

#### For Vercel:
1. Go to your project dashboard
2. Click on "Deployments"
3. Click the three dots (...) on latest deployment
4. Select "Redeploy"
5. Check "Clear build cache"
6. Click "Redeploy"

#### For Netlify:
1. Go to Site settings
2. Click "Build & deploy"
3. Click "Clear cache and deploy site"

#### For Local Build & Deploy:
```bash
cd frontend
rm -rf dist node_modules/.vite
npm run build
```

### Step 3: Force Browser Cache Clear
After redeployment, clear browser cache:
- Press `Ctrl + Shift + Delete` (Windows)
- Or `Cmd + Shift + Delete` (Mac)
- Select "Cached images and files"
- Click "Clear data"

### Step 4: Verify API Connection
Open browser console (F12) and check:
```javascript
console.log(import.meta.env.VITE_API_URL)
```

Should show: `https://pathfinder-ai-v1rk.onrender.com/api`

## Quick Test Commands

Test if backend is working:
```bash
curl https://pathfinder-ai-v1rk.onrender.com/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "Connected"
}
```

## Common Issues

### Issue 1: Environment variable not loading
**Solution:** Restart the development server or redeploy

### Issue 2: CORS error
**Solution:** Backend already configured for CORS with `origin: '*'`

### Issue 3: Old build cached
**Solution:** Clear build cache and redeploy

## Verification Checklist
- [ ] Environment variable set on hosting platform
- [ ] Build cache cleared
- [ ] Site redeployed
- [ ] Browser cache cleared
- [ ] Console shows correct API URL
- [ ] Login works without network error
