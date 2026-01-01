# 🚀 Vercel Deployment Guide

## What You Have Now

```
fundraiser/
├── index.html               # Your frontend
├── styles.css               # Styles
├── script-vercel.js         # NEW! Frontend that calls Vercel API
├── api/
│   └── donate.js           # NEW! Backend API (calls Resend)
├── vercel.json             # Vercel configuration
└── package.json            # Project info
```

##  Step-by-Step Deploy

### Step 1: Rename Script File

```bash
# Delete old script.js
del script.js

# Rename script-vercel.js to script.js
ren script-vercel.js script.js
```

Or just do it in File Explorer:
- Delete `script.js`
- Rename `script-vercel.js` to `script.js`

### Step 2: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub" (easiest)
4. Authorize Vercel

### Step 3: Upload to GitHub

**Option A: GitHub Desktop (Easiest)**

1. Download GitHub Desktop: https://desktop.github.com
2. Install and log in
3. Click "Add" → "Add Existing Repository"
4. Select your `fundraiser` folder
5. Click "Publish repository"
6. Name it: `zarx-fundraising`
7. Make it Public
8. Click "Publish"

**Option B: Git Command Line**

```bash
cd C:\Users\akikf\programing\fundraiser

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create GitHub repo (you need to do this on github.com first)
# Then link it:
git remote add origin https://github.com/YOUR_USERNAME/zarx-fundraising.git

# Push
git push -u origin main
```

### Step 4: Deploy to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Click "Import" next to your `zarx-fundraising` repo
4. Vercel will detect it's a static site
5. Click "Deploy"

**Wait 1-2 minutes...**

### Step 5: Add Environment Variables

**IMPORTANT!** Your Resend API keys need to be added as secrets:

1. In Vercel dashboard, click your project
2. Go to "Settings" → "Environment Variables"
3. Add these 2 variables:

**Variable 1:**
- Name: `RESEND_API_KEY`
- Value: `re_j8NobzxA_DDZor9gHEHKyofbDufFatxK1`
- Environment: Production, Preview, Development (select all)
- Click "Save"

**Variable 2:**
- Name: `RESEND_AUDIENCE_ID`
- Value: `1a3f0a27-fddf-41c6-b54a-95676d460b70` (your actual ID)
- Environment: Production, Preview, Development (select all)
- Click "Save"

### Step 6: Redeploy

After adding environment variables:

1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait 1 minute

### Step 7: Test It!

1. Go to your Vercel URL (looks like: `zarx-fundraising.vercel.app`)
2. Click a donation tier
3. Select payment method
4. Fill the form
5. Submit
6. Check your email!

---

## 🎯 Your Live URLs

**Production:**
- `https://zarx-fundraising.vercel.app`
- Or custom domain (add in Vercel settings)

**API Endpoint:**
- `https://zarx-fundraising.vercel.app/api/donate`

---

## ✅ Checklist

Before deploying:

- [ ] Renamed `script-vercel.js` to `script.js`
- [ ] Updated bKash/Nagad/Rocket numbers in script.js
- [ ] Created Vercel account
- [ ] Uploaded to GitHub
- [ ] Deployed to Vercel
- [ ] Added `RESEND_API_KEY` environment variable
- [ ] Added `RESEND_AUDIENCE_ID` environment variable
- [ ] Redeployed after adding variables
- [ ] Tested form submission
- [ ] Received test emails

---

## 🔄 How to Update

Whenever you make changes:

**Option A: GitHub Desktop**
1. Make changes to files
2. Open GitHub Desktop
3. It will show changes
4. Write commit message
5. Click "Commit to main"
6. Click "Push origin"
7. Vercel auto-deploys!

**Option B: Manual Upload**
1. Go to vercel.com/dashboard
2. Click your project
3. Go to "Deployments"
4. Click "..." → "Redeploy"

---

## 🐛 Troubleshooting

### Error: "RESEND_API_KEY is not defined"

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Make sure `RESEND_API_KEY` is added
3. Redeploy

### Error: "Failed to fetch /api/donate"

**Fix:**
1. Check `api/donate.js` file exists
2. Check `vercel.json` is in root folder
3. Redeploy

### Form submits but no email

**Fix:**
1. Check browser console (F12) for errors
2. Check Vercel logs: Dashboard → Project → Functions → View logs
3. Verify Resend API key is correct
4. Check Resend dashboard for errors

### "404 Not Found" on /api/donate

**Fix:**
1. Make sure `api` folder is uploaded
2. Make sure `vercel.json` is in root
3. Redeploy

---

## 📊 Monitoring

### View Logs

1. Go to Vercel Dashboard
2. Click your project
3. Go to "Deployments" → Click latest
4. Click "Functions" tab
5. Click "donate" function
6. See real-time logs

### Check Email Delivery

1. Go to https://resend.com/emails
2. See all emails sent
3. Check delivery status
4. See any errors

---

## 💰 Cost

**Vercel:**
- FREE forever (Hobby plan)
- Unlimited bandwidth
- 100GB/month
- Serverless functions included

**Resend:**
- FREE: 3,000 emails/month
- 100 emails/day
- Perfect for crowdfunding

**Total cost: $0** 🎉

---

## 🎨 Custom Domain (Optional)

Want `zarx.com` instead of `zarx-fundraising.vercel.app`?

1. Buy domain (Namecheap, Google Domains, etc.)
2. Go to Vercel → Settings → Domains
3. Add your domain
4. Update DNS records (Vercel shows you how)
5. Wait 24-48 hours for DNS propagation

---

## 📈 Performance

**Your site will be:**
- ✅ Global CDN (fast worldwide)
- ✅ HTTPS (secure)
- ✅ 99.99% uptime
- ✅ Auto-scaling (handles traffic spikes)
- ✅ Instant updates (deploy in 30 seconds)

---

## 🔒 Security

**Backend API:**
- ✅ Resend API key hidden (not in browser)
- ✅ CORS enabled properly
- ✅ Environment variables encrypted
- ✅ No database needed

**Frontend:**
- ✅ No API keys exposed
- ✅ HTTPS only
- ✅ No sensitive data stored

---

## 🆘 Need Help?

**Check these:**
1. Vercel logs (Dashboard → Functions → Logs)
2. Browser console (F12 → Console)
3. Resend dashboard (resend.com/emails)

**Still stuck?** Send me:
- Vercel URL
- Screenshot of error
- Browser console screenshot

---

## 🎉 You're Live!

Your fundraising site is now:
- ✅ Deployed globally
- ✅ Backend working (no CORS issues!)
- ✅ Emails sending automatically
- ✅ Free hosting forever
- ✅ 99.99% uptime

**Share your Vercel URL and start fundraising! 🚀**
