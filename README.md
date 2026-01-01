# ZARX Crowdfunding Landing Page

A bold, brutalist-tech aesthetic crowdfunding page for the ZARX AI project.

## 🚀 Features

- **Bold Design**: Brutalist-tech aesthetic with dark theme, monospace fonts, and neon accents
- **Progress Tracking**: Real-time funding progress bar with animated counters
- **Donation Tiers**: 4 pre-set tiers + custom amount option
- **Payment Integration Ready**: Placeholder for Stripe, PayPal, crypto payments
- **Fully Responsive**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Scroll reveals, hover effects, and micro-interactions
- **SEO Optimized**: Semantic HTML structure
- **Fast Loading**: Pure HTML/CSS/JS, no frameworks needed

## 📁 File Structure

```
zarx-funding/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # Interactive features
└── README.md           # This file
```

## 🛠️ Setup Instructions

### 1. Basic Setup

1. Download all three files (index.html, styles.css, script.js)
2. Put them in the same folder
3. Open `index.html` in your browser
4. That's it! No build process needed.

### 2. Customization

#### Update Funding Data

In `script.js`, find this section and update the values:

```javascript
let fundingData = {
    raised: 0,      // Current amount raised
    goal: 8000,     // Funding goal
    backers: 0      // Number of backers
};
```

To update dynamically, call:
```javascript
updateFundingData(1250, 18); // $1,250 raised, 18 backers
```

#### Change Colors

In `styles.css`, edit the CSS variables at the top:

```css
:root {
    --bg-primary: #0a0a0a;           /* Main background */
    --bg-secondary: #111111;          /* Section backgrounds */
    --bg-card: #1a1a1a;              /* Card backgrounds */
    --accent-primary: #00ff88;        /* Main accent (green) */
    --accent-secondary: #0088ff;      /* Secondary accent (blue) */
    --text-primary: #ffffff;          /* Main text */
    --text-secondary: #a0a0a0;        /* Secondary text */
}
```

#### Update Content

Edit `index.html` to change:
- Hero title and subtitle
- Your story in the story section
- FAQ answers
- Contact email
- Social links

### 3. Payment Integration

Currently shows placeholder modals. To integrate real payments:

#### Bangladesh Mobile Banking (bKash, Nagad, Rocket)

1. **Update your mobile banking numbers** in `script.js`
2. Find these lines and replace with your actual numbers:

```javascript
// For bKash
<span class="highlight-number">01XXXXXXXXX</span>  // Replace with your bKash number

// For Nagad  
<span class="highlight-number">01XXXXXXXXX</span>  // Replace with your Nagad number

// For Rocket
<span class="highlight-number">01XXXXXXXXX</span>  // Replace with your Rocket number
```

3. **Update exchange rate** (currently set at $1 = ৳110):
```javascript
const bdtAmount = Math.ceil(amount * 110); // Update this rate
```

4. **Process**: Users send money → Screenshot → Email you → You manually verify and add them

**Pro tip**: Use the same number for all services if possible to simplify.

#### Cryptocurrency Integration

1. **Get your wallet addresses**:
   - Bitcoin (BTC): Use a wallet like Electrum, Exodus, or hardware wallet
   - USDT (TRC20): Use Tron-compatible wallet (cheaper fees than ERC20)
   - Ethereum (ETH): Use MetaMask or similar

2. **Update addresses in `script.js`**:

```javascript
// Bitcoin
<code>bc1qXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</code>  // Your BTC address

// USDT TRC20
<code>TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</code>  // Your USDT (TRC20) address

// Ethereum
<code>0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</code>  // Your ETH address
```

3. **IMPORTANT**: 
   - Double-check addresses (one wrong character = lost funds)
   - Use TRC20 for USDT (fees are ~$1 vs $20+ on ERC20)
   - Always verify transactions on blockchain explorer

**Crypto workflow**: User sends → Emails transaction hash → You verify on blockchain → Add them to supporters

#### Stripe Integration

1. Sign up at stripe.com
2. Get your API keys
3. Replace the `processPayment` function in `script.js`:

```javascript
function processPayment(method, amount) {
    if (method === 'stripe') {
        // Redirect to Stripe Checkout
        window.location.href = `https://checkout.stripe.com/pay/...`;
    }
}
```

#### PayPal Integration

1. Sign up at paypal.com/developer
2. Create donation button
3. Replace placeholder with PayPal button code

**Or use PayPal.me link**:
- Create one at paypal.me
- Update in the PayPal instructions section

#### Alternative: Simple Payment Links

Replace modal with direct links to:
- Buy Me a Coffee: buymeacoffee.com
- Ko-fi: ko-fi.com
- Patreon: patreon.com

### 4. Deployment

#### Option 1: Free Hosting (GitHub Pages)

1. Create GitHub account
2. Create repository named `zarx-funding`
3. Upload files
4. Go to Settings → Pages
5. Select main branch
6. Your site will be at: `yourusername.github.io/zarx-funding`

#### Option 2: Netlify (Recommended)

1. Sign up at netlify.com
2. Drag and drop your folder
3. Get free HTTPS domain
4. Auto-deploys when you update files

#### Option 3: Vercel

1. Sign up at vercel.com
2. Import your GitHub repo or upload folder
3. Get free hosting with custom domain support

#### Option 4: Your Own Domain

1. Buy domain (Namecheap, Google Domains)
2. Use any hosting provider (Hostinger, DigitalOcean)
3. Upload files via FTP or cPanel

## 🎨 Design Choices

**Why This Aesthetic?**

- **Brutalist**: Raw, honest, anti-corporate (matches your story)
- **Dark Theme**: Tech/hacker feel, reduces eye strain
- **Monospace Fonts**: "Built by hand" coding aesthetic
- **Neon Accents**: High-tech, futuristic, attention-grabbing
- **Bold Typography**: Makes statements impossible to ignore

**Fonts Used:**
- JetBrains Mono (headings) - Developer-focused
- Space Mono (body) - Readable monospace

## 📊 Analytics (Optional)

Add Google Analytics or Plausible for tracking:

```html
<!-- Add before </head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

## 🔧 Advanced Customization

### Add Email Signup

1. Sign up for email service (Resend, Mailchimp, ConvertKit)
2. Add form in HTML:

```html
<form onsubmit="subscribeEmail(event)">
    <input type="email" placeholder="Your email" required>
    <button type="submit">Get Updates</button>
</form>
```

3. Connect to your email service in `script.js`

### Add Social Proof

Add a "Recent Backers" section that shows:
- Recent supporter names (with permission)
- Live donation feed
- Testimonials

### Add Countdown Timer

Create urgency with a deadline:

```javascript
// In script.js
const deadline = new Date('2025-02-01');
// Add countdown logic
```

## 🚨 Important Notes

1. **Update Contact Info**: Change all instances of `akikfaraji@gmail.com` to your email
2. **Update Payment Numbers**: 
   - Replace `01XXXXXXXXX` with your actual bKash/Nagad/Rocket numbers in `script.js`
   - Update crypto wallet addresses (triple-check these!)
   - Update exchange rate for BDT conversions
3. **Add Terms**: Consider adding privacy policy and terms of service
4. **Test Payments**: Always test payment flows before going live
5. **Mobile First**: Test on mobile devices (most traffic will be mobile)
6. **Loading Speed**: Optimize images if you add them (use WebP format)

### 🇧🇩 Bangladesh Payment Tips

- **Single Number**: Use the same mobile number for bKash, Nagad, Rocket if possible
- **Transaction Limits**: Be aware of daily transaction limits on mobile banking
- **Verification**: Always ask for screenshot proof and verify before adding to supporters
- **Tax**: Keep records for tax purposes (if applicable in Bangladesh)

### ₿ Cryptocurrency Security

- **Verify Addresses**: One wrong character = funds lost forever
- **Use TRC20 for USDT**: Fees are ~$1 vs $20+ on ERC20
- **Blockchain Verification**: Always verify transactions on blockchain explorer before confirming
- **Wallet Security**: 
  - Use hardware wallets for large amounts
  - Never share private keys or seed phrases
  - Double-check network (BTC ≠ BCH, ETH ≠ ETC)
- **Tax Implications**: Keep records of all crypto donations

## 📱 Social Media

Share your campaign:

- **Twitter**: Use hashtags #BuildInPublic #AI #OpenSource
- **LinkedIn**: Post in AI/tech groups
- **Reddit**: r/MachineLearning, r/Entrepreneur, r/startups
- **Hacker News**: Submit as "Show HN: ..."
- **Product Hunt**: Launch when you have traction

## 🎯 Tips for Success

1. **Be Transparent**: Post regular updates (weekly minimum)
2. **Show Progress**: Screenshots, videos, benchmarks
3. **Engage Community**: Reply to comments, answer questions
4. **Build in Public**: Share failures, not just wins
5. **Create Urgency**: Limited time offers, early bird tiers
6. **Social Proof**: Show who else is backing you

## 🆘 Troubleshooting

**Progress bar not moving?**
- Check that you're calling `updateFundingData()` in script.js

**Fonts not loading?**
- Make sure you have internet connection (fonts load from Google)
- Or download fonts locally and update CSS

**Payment buttons not working?**
- They're placeholders! Integrate real payment processor first

**Site looks broken?**
- Check browser console for errors (F12)
- Make sure all three files are in same folder
- Try different browser

## 📞 Support

If you use this template and need help:
- Open an issue on GitHub
- Email: akikfaraji@gmail.com
- Show your version - would love to see it!

## 📄 License

Free to use, modify, and distribute. No attribution required but appreciated!

---

Built by Akik Faraji for the ZARX AI Project
Bangladesh 🇧🇩 • 2025