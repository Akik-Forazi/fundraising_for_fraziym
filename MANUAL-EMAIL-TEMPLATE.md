# Manual Donor Email Template

Since Resend free tier can't auto-email donors without a custom domain, use this template to manually email them after verifying their payment.

---

## EMAIL TEMPLATE

**Subject:** ✓ Payment Verified - Welcome to ZARX Project!

**Body:**

Hey [NAME],

Great news! I've verified your payment of $[AMOUNT] via [METHOD].

**Your Support Tier: [TIER]**

Here's what you get:

[IF BELIEVER - $25]:
- Monthly progress updates
- Your name on the supporters list: https://fundraising-for-zarx-igris.vercel.app
- Behind-the-scenes development logs

[IF EARLY ACCESS - $100]:
- Everything above PLUS:
- Early demo access when ready
- Private Discord invite: [DISCORD LINK]
- Monthly Q&A sessions

[IF FOUNDING SUPPORTER - $500]:
- Everything above PLUS:
- "Founding Supporter" badge
- You're sponsoring a Pi cluster node!
- 30-minute video call with me (let me know your availability)
- Remote inference test access

[IF ANGEL BACKER - $2000]:
- Everything above PLUS:
- Permanent recognition on website
- Quarterly strategy calls
- Early access to ALL future releases
- Custom acknowledgment in documentation

**Next Steps:**

1. I've added your name to the supporters list on the website
2. [IF Discord tier] You should receive a Discord invite shortly
3. You'll get your first monthly update within the next week
4. [IF video call tier] Reply with your preferred time for a call

**Hardware Update:**

Your contribution goes directly toward:
- 2× RTX 3090 GPUs ($3,500)
- PC Build to run them ($1,500)
- Cloud compute credits ($1,500)
- Raspberry Pi cluster ($1,000)
- Infrastructure setup ($500)

I'll send hardware unboxing photos/videos as I make purchases!

Thanks for believing in this project. You're literally making this possible.

Questions? Just reply to this email.

- Akik Farazi
Founder, ZARX Project
https://fundraising-for-zarx-igris.vercel.app

---

## QUICK RESPONSE FOR FAILED VERIFICATIONS

**Subject:** ⚠️ Unable to Verify Payment - Please Check

**Body:**

Hey [NAME],

I received your donation form submission for $[AMOUNT] via [METHOD], but I couldn't find the transaction in my account.

Can you please check:
- Did the payment go through on your end?
- Transaction ID: [THEIR TRANSACTION ID]
- Amount sent: ৳[BDT AMOUNT] (for mobile banking) or $[AMOUNT] (for crypto)
- Account you sent to: [YOUR NUMBER/ADDRESS]

Sometimes payments fail or take time to process. If you haven't completed the payment yet, please do so and reply with the updated transaction ID.

If you've already paid, please reply with:
1. Screenshot of payment confirmation
2. Exact time you sent it
3. Exact amount sent

I'll verify it ASAP and get you your supporter benefits!

- Akik

---

## TIPS:

1. **Save donor info in a spreadsheet:**
   - Name, Email, Amount, Tier, Date, Verified (Y/N)

2. **Batch process:**
   - Check your payment accounts once daily
   - Verify all pending donations
   - Send emails in batch

3. **Create Discord invite links:**
   - Set expiry to "Never"
   - Max uses: 100 (per tier)
   - Copy link to send to supporters

4. **Update website progress:**
   - Open browser console on your site
   - Type: `updateFundingData(1250, 18)` (example: $1250 raised, 18 backers)
   - Press Enter

5. **Keep track:**
   - Every verification email sent
   - Every Discord invite given
   - Every name added to supporters list

---

## IMPORTANT:

- Always email donors within 24-48 hours of verification
- Be personal and genuine
- Thank them sincerely
- Set clear expectations on timeline
- Provide regular updates even if progress is slow
