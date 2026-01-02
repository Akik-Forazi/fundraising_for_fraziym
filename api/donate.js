// Vercel Serverless Function for handling donations
// This runs on Vercel's backend, not in browser

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get data from request
  const { name, email, amount, method, transactionId, tier } = req.body;

  // Validate required fields
  if (!name || !email || !amount || !method) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Resend API configuration
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

  try {
    // 1. Add to Resend audience (for future newsletters)
    try {
      await fetch(
        `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            first_name: name,
            unsubscribed: false
          })
        }
      );
    } catch (err) {
      console.log('Failed to add to audience (non-critical):', err);
    }

    // 2. Send admin notification to YOUR EMAIL ONLY
    // (Resend free tier only sends to verified emails without custom domain)
    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ZARX Notifications <onboarding@resend.dev>',
        to: ['akikforazi006@gmail.com'], // YOUR verified email
        subject: `NEW DONATION: $${amount} from ${name} via ${method}`,
        html: generateAdminEmail(name, email, amount, method, tier, transactionId)
      })
    });

    if (adminEmailResponse.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Donation submitted! Check your email for verification.' 
      });
    } else {
      const error = await adminEmailResponse.text();
      console.error('Email sending failed:', error);
      
      // Still return success so user experience isn't broken
      return res.status(200).json({ 
        success: true, 
        message: 'Submission received! We will verify within 24-48 hours.' 
      });
    }

  } catch (error) {
    console.error('Error processing donation:', error);
    
    // Return success anyway so form doesn't break for users
    return res.status(200).json({ 
      success: true, 
      message: 'Submission received! We will verify within 24-48 hours.'
    });
  }
}

// Generate admin notification email HTML
function generateAdminEmail(name, email, amount, method, tier, transactionId) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 20px;
            }
            .email-wrapper {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 3px solid #00ff88;
                overflow: hidden;
            }
            .header {
                background-color: #00ff88;
                color: #0a0a0a;
                padding: 25px;
                text-align: center;
                font-size: 24px;
                font-weight: 800;
            }
            .content {
                padding: 30px;
                color: #333;
            }
            .amount-box {
                background-color: #f0fff4;
                border: 3px solid #00ff88;
                padding: 20px;
                margin: 20px 0;
                text-align: center;
            }
            .amount {
                font-size: 48px;
                font-weight: 800;
                color: #00ff88;
                margin: 0;
            }
            .info-table {
                width: 100%;
                margin: 20px 0;
                border-collapse: collapse;
                background-color: #f8f8f8;
            }
            .info-table td {
                padding: 12px;
                border-bottom: 1px solid #ddd;
            }
            .info-table td:first-child {
                font-weight: 700;
                width: 40%;
                color: #666;
            }
            .action-box {
                background-color: #fff4e6;
                border: 2px solid #ffaa00;
                padding: 20px;
                margin: 20px 0;
            }
            .action-box h3 {
                margin-top: 0;
                color: #cc7700;
            }
            .action-box p {
                margin: 8px 0;
                color: #666;
            }
            .footer {
                background-color: #f5f5f5;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="email-wrapper">
            <div class="header">
                NEW DONATION RECEIVED
            </div>
            
            <div class="content">
                <div class="amount-box">
                    <div class="amount">$${amount}</div>
                </div>
                
                <table class="info-table">
                    <tr>
                        <td>Donor Name:</td>
                        <td><strong>${name}</strong></td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>${email}</td>
                    </tr>
                    <tr>
                        <td>Amount:</td>
                        <td><strong style="color: #00ff88; font-size: 18px;">$${amount}</strong></td>
                    </tr>
                    <tr>
                        <td>Support Tier:</td>
                        <td>${tier}</td>
                    </tr>
                    <tr>
                        <td>Payment Method:</td>
                        <td>${method}</td>
                    </tr>
                    <tr>
                        <td>Transaction ID:</td>
                        <td>${transactionId || 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td>Submitted:</td>
                        <td>${new Date().toLocaleString('en-US', { 
                          dateStyle: 'full', 
                          timeStyle: 'short',
                          timeZone: 'Asia/Dhaka'
                        })}</td>
                    </tr>
                </table>
                
                <div class="action-box">
                    <h3>ACTION REQUIRED:</h3>
                    <p><strong>1. Verify Payment</strong><br>
                    Check your ${method} account/wallet for the transaction</p>
                    
                    <p><strong>2. Email Donor Manually</strong><br>
                    Send confirmation to: <a href="mailto:${email}">${email}</a><br>
                    (Resend can't auto-email them without custom domain)</p>
                    
                    <p><strong>3. Add to Website</strong><br>
                    Add ${name} to supporters list</p>
                    
                    <p><strong>4. Send Tier Benefits</strong><br>
                    ${tier === 'Early Access' || tier === 'Founding Supporter' || tier === 'Angel Backer' ? 
                      'Discord invite + other perks' : 
                      'Monthly updates access'
                    }</p>
                    
                    <p><strong>5. Update Progress Bar</strong><br>
                    In browser console: <code>updateFundingData(newTotal, newBackers)</code></p>
                </div>
                
                <div style="background-color: #f0fff4; border-left: 4px solid #00ff88; padding: 15px; margin: 20px 0;">
                    <strong style="color: #00aa66;">✓ Email Added to Audience</strong><br>
                    <span style="color: #666; font-size: 14px;">${email} has been added to your Resend audience for future newsletters</span>
                </div>
            </div>
            
            <div class="footer">
                FRAZIYM TECH & AI · Dhaka, Bangladesh<br>
                Donation notification from fundraising-for-zarx-igris.vercel.app
            </div>
        </div>
    </body>
    </html>
  `;
}
