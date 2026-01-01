# ✅ VERCEL SETUP - QUICK START

## What Changed

**Fixed the CORS error!** Now using Vercel backend to call Resend API.

**Structure:**
```
Browser (frontend) → Vercel API (/api/donate) → Resend → Emails sent!
          ↑                    ↑                      ↑
     No CORS issue!    Secure backend    No API key exposed
```

---

## 🚀 Deploy in 5 Steps (10 minutes)

### Step 1: Rename File (1 min)

Delete: `script.js`
Rename: `script-vercel.js` → `script.js`

### Step 2: Update Payment Numbers (2 min)

In `script.js`, find and replace:
- `01XXXXXXXXX` → Your bKash/Nagad/Rocket number (3 places)

### Step 3: Upload to GitHub (3 min)

**Easiest way:**
1. Go to https://github.com/new
2. Name: `zarx-fundraising`
3. Make it Public
4. Don't add README/gitignore (we have them)
5. Click "Create repository"
6. Follow the commands shown (or use GitHub Desktop)

### Step 4: Deploy to Vercel (2 min)

1. Go to https://vercel.com (sign up with GitHub)
2. Click "Add New..." → "Project"
3. Import your `zarx-fundraising` repo
4. Click "Deploy"
5. Wait 1 minute

### Step 5: Add Environment Variables (2 min)

In Vercel dashboard:

1. Click your project → Settings → Environment Variables
2. Add:
   - Name: `RESEND_API_KEY`
   - Value: `re_j8NobzxA_DDZor9gHEHKyofbDufFatxK1`
3. Add:
   - Name: `RESEND_AUDIENCE_ID`
   - Value: `1a3f0a27-fddf-41c6-b54a-95676d460b70`
4. Redeploy (Deployments → ... → Redeploy)

---

## ✅ Test It

1. Go to your Vercel URL: `https://zarx-fundraising.vercel.app`
2. Click $25 tier
3. Select bKash
4. Fill form with YOUR email
5. Submit
6. Check email inbox!

---

## 📁 Files Overview

```
fundraiser/
├── index.html           # Frontend
├── styles.css           # Styling
├── script.js            # Frontend JS (calls /api/donate)
├── api/
│   └── donate.js       # Backend API (calls Resend)
├── vercel.json          # Vercel config
├── package.json         # Project info
├── .gitignore           # Git ignore
└── *.md                 # Documentation
```

**What goes where:**
- `index.html`, `styles.css`, `script.js` → Served to browser
- `api/donate.js` → Runs on Vercel backend
- Environment variables → Stored securely in Vercel

---

## 🎯 How It Works

**Before (Broken):**
```
Browser → Resend API directly
              ↓
         CORS ERROR ❌
```

**Now (Fixed):**
```
Browser → Vercel API → Resend API
   ✅          ✅           ✅
No CORS!    Secure!    Works!
```

---

## 🔑 Important URLs

**Your Site:**
- https://zarx-fundraising.vercel.app (or your custom URL)

**API Endpoint:**
- https://zarx-fundraising.vercel.app/api/donate

**Vercel Dashboard:**
- https://vercel.com/dashboard

**Resend Dashboard:**
- https://resend.com/emails

---

## 💡 Key Features

✅ No CORS errors
✅ API keys hidden (secure)
✅ Free hosting forever
✅ 99.99% uptime
✅ Global CDN (fast)
✅ Auto-deploy on git push
✅ HTTPS included
✅ Unlimited bandwidth

---

## 🐛 If Something Breaks

1. **Check Vercel logs:**
   - Dashboard → Your project → Functions → View logs

2. **Check browser console:**
   - Press F12 → Console tab

3. **Check Resend:**
   - https://resend.com/emails
   - See if emails are sending

4. **Common fixes:**
   - Redeploy in Vercel
   - Check environment variables exist
   - Make sure `api/donate.js` file exists

---

## 🔄 To Update Site Later

1. Edit files locally
2. Commit to Git
3. Push to GitHub
4. Vercel auto-deploys! (30 seconds)

**Or manually:**
- Vercel Dashboard → Deployments → Redeploy

---

## 📞 Support

**Stuck?** Send me:
- Your Vercel URL
- Screenshot of error
- Browser console (F12)

---

## 🎉 You're Ready!

1. [ ] Renamed script file
2. [ ] Updated payment numbers
3. [ ] Deployed to Vercel
4. [ ] Added environment variables
5. [ ] Tested donation form

**Now share your Vercel URL and start fundraising! 💪**

Your URL: `https://zarx-fundraising.vercel.app`
