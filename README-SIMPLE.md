# ZARX Crowdfunding - Simple HTML/CSS/JS Version

Pure client-side crowdfunding page. No backend, no servers, no databases needed!

## 📁 Files You Need

```
fundraiser/
├── index.html          # Main page
├── styles.css          # All styles
└── script-simple.js    # Interactive features (rename to script.js)
```

## 🚀 Quick Setup (5 minutes)

### Step 1: Rename the JavaScript file

```bash
# Rename script-simple.js to script.js
mv script-simple.js script.js
```

Or just rename it in your file explorer.

### Step 2: Update Your Payment Info

Open `script.js` and find these lines (around line 170-220):

**bKash/Nagad/Rocket numbers:**
```javascript
Send to: <span class="highlight-number">01XXXXXXXXX</span>
```
Replace `01XXXXXXXXX` with your actual mobile number (appears 3 times)

**Crypto addresses:**
```javascript
<code>bc1qXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</code>  // Bitcoin
<code>TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</code>         // USDT TRC20
<code>0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</code>  // Ethereum
```
Replace with your actual wallet addresses

**Email address:**
Find all instances of `akikfaraji@gmail.com` and replace with yours

### Step 3: Open index.html

Just double-click `index.html` or open it in any browser. That's it!

## 📧 How Donations Work (No Backend!)

When someone donates:

1. They select amount → choose payment method
2. Instructions show with your payment details
3. They complete payment on their own (bKash/Wise/crypto/etc)
4. They fill in the form with their name, email, transaction ID
5. Clicking "Notify Me of Payment" opens their email client with pre-filled email to you
6. They send the email
7. You receive notification, verify payment, add them to supporters

**It uses `mailto:` links - completely client-side!**

## ⚙️ Customization

### Update Funding Progress

In `script.js`, find line ~800:

```javascript
// Example: Uncomment to test
// updateFundingData(1250, 18);
```

Change to your actual numbers:
```javascript
updateFundingData(1250, 18);  // $1,250 raised, 18 backers
```

Or call it from browser console:
```javascript
updateFundingData(2500, 35);
```

### Change Goal Amount

Line 3 in `script.js`:
```javascript
let fundingData = {
    raised: 0,
    goal: 8000,  // Change this!
    backers: 0
};
```

### Change Exchange Rate

Line 66 in `script.js`:
```javascript
const bdtAmount = Math.ceil(amount * 110); // $1 = ৳110
```

Update `110` to current rate.

## 🎨 Styling

All colors are in `styles.css` at the top:

```css
:root {
    --bg-primary: #0a0a0a;
    --accent-primary: #00ff88;    /* Main green */
    --accent-secondary: #0088ff;   /* Blue */
    /* etc */
}
```

Change these to match your brand!

## 🌐 Deployment (Free Hosting)

### Option 1: GitHub Pages (Recommended)
1. Create GitHub repo
2. Upload all 3 files
3. Settings → Pages → Deploy from main branch
4. Your site: `yourusername.github.io/repo-name`

### Option 2: Netlify
1. Drag folder to netlify.com/drop
2. Get instant HTTPS URL
3. Done!

### Option 3: Vercel
1. Sign up at vercel.com
2. Import project
3. Deploy!

### Option 4: Any Static Host
Upload the 3 files to:
- Cloudflare Pages
- surge.sh
- Neocities
- Your own server

## ✨ Features

### Interactive Elements
- ✓ Animated progress bar
- ✓ Smooth scroll animations
- ✓ Modal popups for payments
- ✓ Copy-to-clipboard buttons
- ✓ Real-time notifications
- ✓ Mobile responsive

### Payment Methods
- ✓ bKash (Bangladesh)
- ✓ Nagad (Bangladesh)
- ✓ Rocket (Bangladesh)
- ✓ Wise (International - works in BD!)
- ✓ PayPal (International)
- ✓ Bitcoin (Crypto)
- ✓ USDT TRC20 (Crypto)
- ✓ Ethereum (Crypto)

### No Backend Needed
- ✓ No servers
- ✓ No databases
- ✓ No API keys
- ✓ Works offline
- ✓ Just HTML/CSS/JS

## 📊 Managing Donations

### Verification Process
1. Receive email notification with donor info
2. Check your bKash/bank/crypto wallet
3. Verify transaction matches
4. Add donor to supporters list (manually update HTML)
5. Send them thank you email
6. Update progress: `updateFundingData(newAmount, newBackers)`

### Adding Verified Supporters

Create a supporters section in your HTML:

```html
<section class="supporters-section">
    <h2>Our Supporters 🙏</h2>
    <div class="supporters-list">
        <div class="supporter">John Doe - $100</div>
        <div class="supporter">Jane Smith - $50</div>
        <!-- Add more as you verify -->
    </div>
</section>
```

## 🔒 Security Notes

### ✓ What's Safe:
- No sensitive data stored
- No payment processing (users pay directly)
- No user accounts or passwords
- Static site = minimal attack surface

### ⚠️ Important:
- **Triple-check crypto addresses** (wrong = lost funds!)
- **Verify every transaction** before adding to supporters
- **Don't auto-trust** transaction IDs (verify in your wallet)
- **Keep backups** of supporter info

## 🐛 Troubleshooting

**Progress bar not updating?**
- Call `updateFundingData(amount, backers)` after updating numbers

**Email not opening?**
- User's browser may block mailto: links
- Alternative: Give them your email to copy

**Crypto address not copying?**
- Older browsers need manual copy
- Users should manually verify addresses anyway (security!)

**Modal not closing?**
- Press ESC key
- Check browser console for errors (F12)

## 📱 Mobile Testing

Test on actual phones! The site works but test:
- Payment buttons tap correctly
- Forms are easy to fill
- Copy buttons work
- Email opens properly

## 🎯 Pro Tips

1. **Update progress weekly** - Keep momentum going
2. **Screenshot payments** - Ask donors for proof
3. **Thank everyone personally** - Email each donor
4. **Post updates publicly** - Build trust
5. **Add social proof** - Show recent donors
6. **Set milestones** - "$2K unlocks GPU purchase"
7. **Be transparent** - Show what you bought with the money

## 📞 Support

Questions? Email: akikfaraji@gmail.com

Good luck with your fundraising! 🚀
