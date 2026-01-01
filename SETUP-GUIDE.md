# 🚀 YOUR EXACT SETUP STEPS

## Step 1: Rename the file

In your folder `C:\Users\akikf\programing\fundraiser\`:

**Rename:** `script-simple.js` → `script.js`

(Right-click → Rename, or use command: `ren script-simple.js script.js`)

## Step 2: Update YOUR payment details

Open `script.js` in any text editor (Notepad, VS Code, etc.)

### Find and Replace (Ctrl+F):

**1. Your bKash Number (3 places):**
```
Find: 01XXXXXXXXX
Replace with: YOUR ACTUAL BKASH NUMBER
```

**2. Your Email (multiple places):**
```
Find: akikfaraji@gmail.com
Replace with: YOUR ACTUAL EMAIL
```

**3. Your Bitcoin Address (1 place):**
```
Find: bc1qXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Replace with: YOUR ACTUAL BTC ADDRESS
```

**4. Your USDT Address (1 place):**
```
Find: TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Replace with: YOUR ACTUAL USDT TRC20 ADDRESS
```

**5. Your Ethereum Address (1 place):**
```
Find: 0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Replace with: YOUR ACTUAL ETH ADDRESS
```

## Step 3: Test it locally

Just open `index.html` in your browser:
- Right-click index.html → Open with → Chrome/Firefox/Edge
- Or drag index.html into browser window

## Step 4: Test donations

1. Click a donation tier
2. Select payment method
3. See if your payment details show correctly
4. Fill the form
5. Click "Notify Me" - your email should open with pre-filled message

## Step 5: Deploy online

### Easiest: Netlify Drop

1. Go to https://app.netlify.com/drop
2. Drag your entire `fundraiser` folder onto the page
3. You get instant URL like: `random-name-123456.netlify.app`
4. Share that URL!

### Or: GitHub Pages

1. Create GitHub account (if you don't have)
2. Create new repository: "zarx-fundraising"
3. Upload all 3 files (index.html, styles.css, script.js)
4. Go to Settings → Pages → Source: main branch
5. Your site: `yourusername.github.io/zarx-fundraising`

## Step 6: Update progress manually

When you receive donations:

1. Open `script.js`
2. Find line ~800: `// updateFundingData(1250, 18);`
3. Change to: `updateFundingData(2500, 35);` (your actual raised amount and backers)
4. Save file
5. Re-upload to Netlify/GitHub

Or use browser console (F12):
```javascript
updateFundingData(2500, 35)
```

## 🎉 YOU'RE DONE!

Your fundraising page is now live and working!

## How donations work:

1. User clicks amount → sees payment methods
2. They pay you directly (bKash/crypto/PayPal/Wise)
3. They fill form with name/email/transaction ID
4. They click "Notify Me" → opens email to you
5. You receive email with their details
6. You verify payment in your wallet/app
7. You update progress on website
8. You email them confirmation + benefits

**No backend. No servers. No APIs. Just pure HTML/CSS/JS! 🔥**

---

## Quick Commands

**Rename file (Windows CMD):**
```cmd
cd C:\Users\akikf\programing\fundraiser
ren script-simple.js script.js
```

**Rename file (PowerShell):**
```powershell
cd C:\Users\akikf\programing\fundraiser
Rename-Item script-simple.js script.js
```

**Test local server (if you have Python):**
```bash
cd C:\Users\akikf\programing\fundraiser
python -m http.server 8000
```
Then open: http://localhost:8000

---

## Important Numbers to Update:

- [ ] bKash number: `01XXXXXXXXX`
- [ ] Nagad number: `01XXXXXXXXX` (same or different)
- [ ] Rocket number: `01XXXXXXXXX` (same or different)
- [ ] Email: `akikfaraji@gmail.com`
- [ ] Bitcoin address
- [ ] USDT address  
- [ ] Ethereum address
- [ ] Exchange rate (currently $1 = ৳110)
- [ ] Goal amount (currently $8,000)

**DO NOT SKIP UPDATING CRYPTO ADDRESSES! Wrong address = lost money forever.**

---

Need help? You built 50,000 lines of AI code. This is just HTML. You got this! 💪
