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
    // 1. Add to Resend audience
    const audienceResponse = await fetch(
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

    // 2. Send thank you email to donor
    const donorEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ZARX Project <onboarding@resend.dev>',
        to: [email],
        subject: `We received your donation details, ${name}! ⏳`,
        html: generateDonorEmail(name, amount, method, tier)
      })
    });

    // 3. Send admin notification
    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ZARX Notifications <onboarding@resend.dev>',
        to: ['akikfaraji@gmail.com'],
        subject: `💰 NEW DONATION: $${amount} from ${name} via ${method}`,
        html: generateAdminEmail(name, email, amount, method, tier, transactionId)
      })
    });

    // Check if all succeeded
    if (donorEmailResponse.ok && adminEmailResponse.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Donation submitted successfully!' 
      });
    } else {
      // Log errors but still return success to user
      console.error('Email sending failed:', {
        donor: donorEmailResponse.status,
        admin: adminEmailResponse.status
      });
      
      return res.status(200).json({ 
        success: true, 
        message: 'Submission received (emails may be delayed)' 
      });
    }

  } catch (error) {
    console.error('Error processing donation:', error);
    return res.status(500).json({ 
      error: 'Failed to process donation',
      message: error.message 
    });
  }
}

// Generate donor email HTML
function generateDonorEmail(name, amount, method, tier) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #0a0a0a;
                color: #ffffff;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #1a1a1a;
                border: 3px solid #ffaa00;
                padding: 40px;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .header h1 {
                color: #ffaa00;
                font-size: 32px;
                margin: 0;
            }
            .amount {
                font-size: 48px;
                color: #ffaa00;
                text-align: center;
                margin: 30px 0;
                font-weight: bold;
            }
            .details {
                background-color: #111111;
                border-left: 4px solid #ffaa00;
                padding: 20px;
                margin: 20px 0;
            }
            .details p {
                margin: 10px 0;
            }
            .warning {
                background-color: #ffaa00;
                color: #0a0a0a;
                padding: 15px;
                margin: 20px 0;
                font-weight: bold;
                text-align: center;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #333;
                color: #666;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>⏳ Donation Details Received!</h1>
            </div>
            
            <p>Hey ${name},</p>
            
            <p>Thank you for submitting your donation details! I've received your information.</p>
            
            <div class="amount">$${amount}</div>
            
            <div class="details">
                <p><strong>Your Submission:</strong></p>
                <p>💰 Amount: $${amount}</p>
                <p>💳 Method: ${method}</p>
                <p>🎖️ Tier: ${tier}</p>
                <p>📅 Submitted: ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="warning">
                ⏳ PENDING VERIFICATION
            </div>
            
            <p><strong>What happens next:</strong></p>
            <ol>
                <li><strong>I'll verify your transaction</strong> in my ${method} wallet/account (usually within 24 hours)</li>
                <li><strong>Once verified, I'll send you a confirmation email</strong> with all your tier benefits</li>
                <li><strong>You'll be added to the supporters list</strong> on the website</li>
                <li><strong>You'll start receiving monthly progress updates</strong></li>
            </ol>
            
            <p><strong>⚠️ Important:</strong></p>
            <p>If I can't find your transaction, I'll email you within 24-48 hours to sort it out. Make sure you actually completed the payment before submitting this form!</p>
            
            <p><strong>Questions?</strong> Just reply to this email anytime.</p>
            
            <p>Thanks for believing in this project. I'll verify your payment ASAP and get back to you!</p>
            
            <p>- Akik</p>
            <p style="color: #666;">Founder, ZARX Project</p>
            
            <div class="footer">
                <p>FRAZIYM TECH & AI • Building in Bangladesh 🇧🇩</p>
                <p>This is an automated receipt. Your donation is pending verification.</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

// Generate admin notification email HTML
function generateAdminEmail(name, email, amount, method, tier, transactionId) {
  return `
    <div style="font-family: monospace; background: #0a0a0a; color: #fff; padding: 20px;">
        <div style="background: #00ff88; color: #0a0a0a; padding: 20px; font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px;">
            💰 NEW DONATION RECEIVED!
        </div>
        <div style="background: #1a1a1a; border: 2px solid #00ff88; padding: 20px; font-size: 16px;">
            <p><strong>DONOR INFO:</strong></p>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Amount: $${amount}</p>
            <p>Tier: ${tier}</p>
            <p>Method: ${method}</p>
            <p>Transaction ID: ${transactionId || 'Not provided'}</p>
            <p>Time: ${new Date().toLocaleString()}</p>
            <p></p>
            <p><strong>ACTION REQUIRED:</strong></p>
            <p>1. Verify the transaction in your ${method} account/wallet</p>
            <p>2. Add ${name} to supporters list on website</p>
            <p>3. Send them tier benefits (Discord invite, etc.)</p>
            <p>4. Update funding progress: updateFundingData(newAmount, newBackers)</p>
            <p></p>
            <p style="color: #00ff88;"><strong>✓ Email already added to Resend audience for updates</strong></p>
        </div>
    </div>
  `;
}
