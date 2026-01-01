# 🔍 Manual Verification Workflow

## How It Works Now

### User Side:
1. They select donation amount
2. They see payment instructions (your bKash/crypto/etc)
3. **They pay you directly**
4. They fill form with name, email, transaction ID
5. They submit → Get **"PENDING VERIFICATION"** email

### Your Side (Manual Verification):
1. Receive admin notification email
2. Check actual payment in your wallet/bank
3. Verify transaction
4. Send confirmation + benefits
5. Update website

---

## Step-by-Step Verification Process

### When You Receive Admin Email:

**Email contains:**
- Donor name
- Donor email
- Amount claimed
- Payment method
- Transaction ID
- Timestamp

### Step 1: Check Your Wallet/Account (5 min)

**For bKash/Nagad/Rocket:**
1. Open app
2. Check transaction history
3. Find transaction with matching:
   - Amount (±৳50 tolerance for fees)
   - Date/time (within 1 hour of submission)
   - Transaction ID

**For Crypto (Bitcoin/USDT/ETH):**
1. Go to blockchain explorer:
   - Bitcoin: blockchain.com/explorer
   - USDT (TRC20): tronscan.org
   - Ethereum: etherscan.io
2. Paste transaction hash from donor
3. Verify:
   - Sent to YOUR wallet address
   - Correct amount
   - Status: Confirmed

**For Wise/PayPal:**
1. Check email notifications
2. Check account transaction history
3. Match amount and sender email

### Step 2: Verification Decision

**✅ VERIFIED - Transaction Found:**
- Amount matches
- Transaction ID correct
- Payment received

**❌ NOT FOUND - Need More Info:**
- No matching transaction
- Wrong amount
- Wrong transaction ID

**⏳ PENDING - Wait for Blockchain:**
- Crypto transaction unconfirmed (wait 10-30 min)

### Step 3: Send Confirmation Email

#### If VERIFIED ✅

Manually send email (or create template):

**Subject:** ✅ Donation Verified - Welcome to ZARX Supporters!

**Body:**
```
Hey [Name],

Great news! Your donation has been verified! 🎉

VERIFIED TRANSACTION:
💰 Amount: $[amount]
💳 Method: [method]
📝 Transaction ID: [txn_id]
✅ Status: VERIFIED

YOUR TIER BENEFITS:
[List their tier benefits based on amount]

$25+ Believer:
- ✓ Monthly progress updates (you're on the list!)
- ✓ Name added to supporters page

$100+ Early Access:
- ✓ All above +
- ✓ Discord invite: [LINK]
- ✓ Early demo access (when ready)

$500+ Founding Supporter:
- ✓ All above +
- ✓ Founding badge on Discord
- ✓ Pi cluster remote access: [SETUP INSTRUCTIONS]
- ✓ Schedule 30-min call: [CALENDLY LINK]

$2000+ Angel Backer:
- ✓ All above +
- ✓ Permanent recognition on website
- ✓ Quarterly strategy calls
- ✓ Custom acknowledgment in documentation

NEXT STEPS:
1. You're now on the monthly update list
2. Check spam folder if you miss updates
3. Join our Discord (link above)

You're officially part of the ZARX journey from day one. Your name will be in the credits when this launches.

Thanks for believing in this!

- Akik
Founder, ZARX Project
akikfaraji@gmail.com
```

#### If NOT FOUND ❌

**Subject:** ⚠️ Can't Find Your Transaction - Help Needed

**Body:**
```
Hey [Name],

I received your donation form but I'm having trouble finding your transaction in my [method] account.

SUBMITTED INFO:
💰 Amount: $[amount]
💳 Method: [method]
📝 Transaction ID: [txn_id]
📅 Submitted: [date]

ISSUE:
I can't find a matching transaction. This could be because:
- Transaction ID is incorrect
- Payment is still processing
- Wrong payment method was used
- Payment wasn't completed

CAN YOU HELP?
Please reply with:
1. Screenshot of transaction
2. Exact transaction ID
3. Exact amount sent
4. Date/time of payment

Once I can verify it, I'll immediately:
- Add you to supporters list
- Send your tier benefits
- Include you in monthly updates

No worries if there was a mix-up! Just reply and we'll sort it out.

- Akik
akikfaraji@gmail.com
```

### Step 4: Update Website

**Update Progress Bar:**

In browser console (F12) or script.js:
```javascript
// Example: You had $1,250 raised, 18 backers
// New donation: $100
updateFundingData(1350, 19); // New total: $1,350, 19 backers
```

**Add to Supporters List:**

In index.html, create/update supporters section:
```html
<section class="supporters-section">
    <h2>Our Supporters 🙏</h2>
    <div class="supporters-grid">
        <div class="supporter-card">
            <strong>John Doe</strong>
            <span>$500 • Founding Supporter</span>
        </div>
        <div class="supporter-card">
            <strong>Jane Smith</strong>
            <span>$100 • Early Access</span>
        </div>
        <!-- Add new verified supporter here -->
    </div>
</section>
```

### Step 5: Track in Spreadsheet (Recommended)

Create a Google Sheet to track all donations:

| Date | Name | Email | Amount | Method | Txn ID | Status | Tier | Benefits Sent |
|------|------|-------|--------|--------|--------|--------|------|---------------|
| 2025-01-15 | John Doe | john@email.com | $500 | bKash | TRX123 | ✅ Verified | Founding | ✅ |
| 2025-01-16 | Jane Smith | jane@email.com | $100 | USDT | 0xabc... | ⏳ Pending | Early Access | ❌ |

---

## Time Expectations

**Your commitment to donors:**
- Check wallet/account: **2x daily** (morning, evening)
- Verify transactions: **Within 24 hours**
- Send confirmation: **Within 24-48 hours**
- Deliver benefits: **Within 48 hours**

**Realistic timeline:**
- Morning: Check overnight submissions (9 AM)
- Evening: Check daytime submissions (9 PM)
- Weekend: Check once daily

---

## Common Issues & Solutions

### Issue: Can't find bKash transaction
**Solution:**
- Check if amount includes fees
- Look for similar amounts within ±৳50
- Check sender didn't use different service

### Issue: Crypto transaction "pending"
**Solution:**
- Wait for blockchain confirmations
- Bitcoin: 10-60 minutes (1-6 confirmations)
- Ethereum: 5-30 minutes
- USDT TRC20: 1-3 minutes

### Issue: Wrong transaction ID provided
**Solution:**
- Ask for screenshot
- Check approximate time/date
- Look for matching amount

### Issue: Donor used different payment method
**Solution:**
- They said bKash but used Nagad
- Check all your accounts
- Reply asking which method they actually used

---

## Tier Benefits Delivery Checklist

### $25 - Believer
- [ ] Add email to Resend audience (already done automatically)
- [ ] Add name to website supporters list
- [ ] Send confirmation email

### $100 - Early Access
- [ ] All $25 benefits
- [ ] Send Discord invite link
- [ ] Add to "Early Access" Discord role
- [ ] Note for demo access when ready

### $500 - Founding Supporter
- [ ] All $100 benefits
- [ ] Add "Founding" badge on Discord
- [ ] Set up Pi cluster access (if ready)
- [ ] Send Calendly link for 30-min call
- [ ] Schedule call

### $2000 - Angel Backer
- [ ] All $500 benefits
- [ ] Add to special "Angel Backers" website section
- [ ] Set up quarterly call schedule
- [ ] Add acknowledgment to docs/README
- [ ] Personal thank you call

---

## Automation Ideas (Future)

When you get too many donations:

1. **Crypto Verification Bot:**
   - Automatically check blockchain for your wallet
   - Match transactions with submissions
   - Auto-send confirmation if verified

2. **bKash API Integration:**
   - If bKash offers business API
   - Automatically verify transactions
   - Reduce manual checking

3. **Zapier Workflow:**
   - Email → Parse → Google Sheets
   - Organize pending verifications
   - Reminder to check daily

But for now, **manual is fine!** You won't get 100 donations in first week. Start manual, automate later if needed.

---

## Template Emails (Save These!)

### Save in Gmail as Templates:

**1. Verification Confirmed**
**2. Can't Find Transaction**
**3. Welcome + Benefits**
**4. Reminder to Check Spam**

Quick reply for common situations!

---

## Security Note

**Never:**
- Share your wallet private keys
- Click links from donor emails
- Trust transaction screenshots alone (verify on blockchain)
- Accept "payment pending" as payment

**Always:**
- Verify on blockchain/bank directly
- Double-check transaction IDs
- Keep records in spreadsheet
- Screenshot your verification

---

## Questions?

If you're unsure about a transaction:
1. Be honest with donor
2. Ask for more info
3. Take your time to verify
4. Better safe than sorry

**Remember:** It's okay to take 24-48 hours. Donors know verification takes time. Don't rush and make mistakes!
