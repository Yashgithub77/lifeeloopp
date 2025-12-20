# 🚀 Deploy LifeLoop - Complete Guide

## Deployment Options

Since LifeLoop is a **Next.js app with server-side features** (API routes, authentication, database), you need a platform that supports server-side rendering. 

**Best Option: Vercel** (Made by the creators of Next.js!)

---

## Option 1: Deploy with Vercel (Recommended) ✨

### Step 1: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. **Choose "Continue with GitHub"** (easiest!)
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Repository

1. On Vercel Dashboard, click **"Add New"** → **"Project"**
2. You'll see your GitHub repositories
3. Find **"lifeonlyhope"** and click **"Import"**

### Step 3: Configure Project

Vercel will auto-detect Next.js settings. You just need to:

1. **Project Name**: `lifeloop` (or keep as is)
2. **Framework Preset**: Next.js (auto-detected)
3. **Root Directory**: `./` (leave as default)

### Step 4: Add Environment Variables ⚠️ IMPORTANT!

Click **"Environment Variables"** and add these:

```
DATABASE_URL = your-postgresql-url
GOOGLE_CLIENT_ID = your-google-client-id
GOOGLE_CLIENT_SECRET = your-google-client-secret
AUTH_SECRET = af52ef15f33d12421f70f7b83f75418a7a24754bf48e92eac8c65706b11
GEMINI_API_KEY = your-gemini-api-key
```

**Note**: Copy these from your local `.env` file!

### Step 5: Deploy! 🚀

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. You'll get a URL like: `https://lifeloop-xxx.vercel.app`

### Step 6: Update OAuth Redirect URLs

Since you have a new domain, update your Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your OAuth 2.0 Client ID
3. Add to **Authorized redirect URIs**:
   ```
   https://YOUR-VERCEL-URL.vercel.app/api/auth/callback/google
   ```
4. Save changes

---

## Option 2: Manual GitHub Pages (Limited - Static Only) ⚠️

**WARNING**: GitHub Pages only supports static sites. Your app won't work fully because:
- ❌ No API routes
- ❌ No authentication
- ❌ No server-side rendering
- ❌ No database connections

**Not Recommended for LifeLoop!**

---

## Option 3: GitHub Actions + Custom Server

If you want to use GitHub Actions to deploy elsewhere, I can create a workflow file.

---

## ✅ Recommended: Vercel Deployment

### Why Vercel?

✅ **Free for personal projects**  
✅ **Automatic deployments** from GitHub  
✅ **Edge network** (fast globally)  
✅ **Built for Next.js**  
✅ **Easy environment variables**  
✅ **HTTPS by default**  
✅ **Preview deployments** for PRs  

### After Deployment

Once deployed on Vercel:

1. ✅ Your app will be live at `https://your-app.vercel.app`
2. ✅ Every push to `main` branch auto-deploys
3. ✅ You get deployment previews
4. ✅ Free SSL certificate
5. ✅ Analytics and monitoring

---

## 🔧 Post-Deployment Steps

### 1. Test Your App
- Visit your Vercel URL
- Try signing in with Google
- Test all features

### 2. Custom Domain (Optional)
- Go to Vercel Dashboard → Your Project → Settings → Domains
- Add your custom domain (e.g., `lifeloop.com`)
- Follow DNS configuration steps

### 3. Update README
Add your deployment URL to README.md:
```md
## 🌐 Live Demo
Visit: https://your-app.vercel.app
```

---

## 🐛 Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all environment variables are set
- Verify DATABASE_URL is accessible from Vercel

### Auth Not Working
- Update Google OAuth redirect URIs
- Check AUTH_SECRET is set
- Verify GOOGLE_CLIENT_ID and SECRET

### Database Errors
- Ensure DATABASE_URL is correct
- Check if database allows external connections
- Run Prisma migrations: `npx prisma db push`

---

## 📊 Deployment Checklist

- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] All environment variables added
- [ ] OAuth redirect URIs updated
- [ ] First deployment successful
- [ ] App tested and working
- [ ] Custom domain configured (optional)

---

## 🎉 Quick Start

**Fastest way to deploy:**

1. Visit: [vercel.com/import](https://vercel.com/import)
2. Sign in with GitHub
3. Select `Yashgithub77/lifeonlyhope`
4. Add environment variables
5. Click Deploy
6. Done! 🚀

Your app will be live in ~3 minutes!

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Discord Support: https://vercel.com/discord
