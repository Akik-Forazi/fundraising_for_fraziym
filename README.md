# ZARX AI Crowdfunding Platform

> Raise funds for ZARX AI project - 50× cheaper AI, built in Bangladesh 🇧🇩

## 🚀 Live Demo

**Deploy URL:** `https://zarx-fundraising.vercel.app` (after deployment)

## ✨ Features

- ✅ Multiple payment methods (bKash, Nagad, Rocket, Wise, PayPal, Crypto)
- ✅ Automated email confirmations via Resend
- ✅ Manual verification workflow
- ✅ Responsive design
- ✅ No database required
- ✅ Free hosting on Vercel

## 📁 Project Structure

```
fundraiser/
├── INDEX.html                    # Main landing page
├── styles.css                    # Styling
├── script.js                     # Frontend JavaScript
├── api/
│   └── donate.js                # Backend API (Vercel serverless)
├── vercel.json                   # Vercel configuration
├── package.json                  # Project metadata
└── docs/
    ├── QUICK-START.md           # 5-step deployment guide
    ├── VERCEL-DEPLOY.md         # Full Vercel setup
    └── VERIFICATION-WORKFLOW.md # Manual payment verification
```

## 🎯 Quick Start

### 1. Update Payment Details

Edit `script.js` and update:
- Line ~170-280: Your bKash/Nagad/Rocket number
- Lines already updated: Crypto wallet addresses ✅

### 2. Deploy to Vercel

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel
```

Or use the Vercel dashboard to import from GitHub.

### 3. Add Environment Variables

In Vercel dashboard, add:
- `RESEND_API_KEY`: Your Resend API key
- `RESEND_AUDIENCE_ID`: Your Resend audience ID

### 4. Test

Visit your Vercel URL and test the donation form!

📖 **Full guide:** See `QUICK-START.md`

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Node.js (Vercel Serverless Functions)
- **Email:** Resend API
- **Hosting:** Vercel
- **Cost:** $0 (100% free)

## 📧 How It Works

```
User fills form → Vercel API (/api/donate) → Resend API
                        ↓
                  Emails sent:
                  1. Pending confirmation to donor
                  2. Admin notification to you
                  3. Added to Resend audience
```

## 💰 Payment Methods

**Bangladesh:**
- bKash
- Nagad
- Rocket

**International:**
- Wise (bank transfer)
- PayPal

**Cryptocurrency:**
- Bitcoin (BTC)
- USDT (TRC20)
- Ethereum (ETH)

## 🔒 Security

- ✅ API keys stored as environment variables
- ✅ No sensitive data in frontend
- ✅ HTTPS only
- ✅ Manual verification prevents fraud

## 📊 Features

**For Donors:**
- Instant payment instructions
- Email confirmation
- Multiple payment options
- Transparent tier benefits

**For You:**
- Email notifications
- Manual verification workflow
- Audience management
- Progress tracking

## 🎨 Customization

**Colors:** Edit CSS variables in `styles.css`
```css
:root {
    --accent-primary: #00ff88;    /* Main green */
    --accent-secondary: #0088ff;  /* Blue */
}
```

**Goal Amount:** Edit `script.js` line 6
```javascript
goal: 8000,  // Change to your goal
```

## 📝 Documentation

- **QUICK-START.md** - Deploy in 5 steps (10 minutes)
- **VERCEL-DEPLOY.md** - Complete Vercel setup guide
- **VERIFICATION-WORKFLOW.md** - How to verify donations manually

## 🐛 Troubleshooting

**CORS Error?**
- Make sure you're using the Vercel API version (script.js should say "VERCEL VERSION" at top)
- Ensure environment variables are set in Vercel

**No Emails?**
- Check Vercel function logs
- Verify Resend API key is correct
- Check Resend dashboard for errors

**More help:** See `VERCEL-DEPLOY.md` troubleshooting section

## 📞 Support

Questions? Contact: akikfaraji@gmail.com

## 📄 License

MIT License - feel free to use for your own crowdfunding!

---

Built with ❤️ in Bangladesh 🇧🇩
