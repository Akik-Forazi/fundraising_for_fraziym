// VERCEL VERSION - Calls backend API instead of Resend directly
// This fixes CORS issues!

// Progress tracking data
let fundingData = {
    raised: 0,
    goal: 8000,
    backers: 0
};

// Update progress bar and stats
function updateProgress() {
    const percentage = Math.min((fundingData.raised / fundingData.goal) * 100, 100);
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
    
    animateValue('raisedAmount', 0, fundingData.raised, 2000, '$');
    animateValue('backerCount', 0, fundingData.backers, 2000);
}

// Animate number counting up
function animateValue(id, start, end, duration, prefix = '') {
    const element = document.getElementById(id);
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = prefix + Math.floor(current).toLocaleString();
    }, 16);
}

// Tier selection
function selectTier(amount) {
    showPaymentModal(amount);
}

// Custom amount selection
function selectCustomAmount() {
    const input = document.getElementById('customAmount');
    const amount = parseInt(input.value);
    
    if (!amount || amount < 5) {
        showNotification('Please enter an amount of at least $5', 'error');
        return;
    }
    
    showPaymentModal(amount);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span style="margin-right: 10px;">${type === 'success' ? '✓' : type === 'error' ? '⚠' : 'ℹ'}</span>
        ${message}
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px 30px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#ffaa00'};
        color: #0a0a0a;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 700;
        border-radius: 4px;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Show payment modal
function showPaymentModal(amount) {
    const bdtAmount = Math.ceil(amount * 110);
    document.body.style.overflow = 'hidden';
    
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="payment-modal-content">
            <h2>Support ZARX Project</h2>
            <div class="payment-amount">$${amount} <span class="bdt-amount">≈ ৳${bdtAmount.toLocaleString()}</span></div>
            <p>Choose your payment method:</p>
            
            <div class="payment-section">
                <div class="payment-section-title">🇧🇩 Bangladesh</div>
                <div class="payment-buttons">
                    <button onclick="processPayment('bKash', ${amount}, ${bdtAmount})" class="btn btn-bkash">
                        <span class="payment-icon">📱</span> bKash
                    </button>
                    <button onclick="processPayment('Nagad', ${amount}, ${bdtAmount})" class="btn btn-nagad">
                        <span class="payment-icon">💰</span> Nagad
                    </button>
                    <button onclick="processPayment('Rocket', ${amount}, ${bdtAmount})" class="btn btn-rocket">
                        <span class="payment-icon">🚀</span> Rocket
                    </button>
                </div>
            </div>
            
            <div class="payment-section">
                <div class="payment-section-title">🌍 International</div>
                <div class="payment-buttons">
                    <button onclick="processPayment('Wise', ${amount})" class="btn btn-wise">
                        <span class="payment-icon">💳</span> Wise (Bank Transfer)
                    </button>
                    <button onclick="processPayment('PayPal', ${amount})" class="btn btn-paypal">
                        <span class="payment-icon">🅿️</span> PayPal
                    </button>
                </div>
            </div>
            
            <div class="payment-section">
                <div class="payment-section-title">₿ Cryptocurrency</div>
                <div class="payment-buttons">
                    <button onclick="processPayment('Crypto', ${amount})" class="btn btn-crypto">
                        <span class="payment-icon">₿</span> Bitcoin / USDT / ETH
                    </button>
                </div>
            </div>
            
            <button onclick="closePaymentModal()" class="btn-close">✕</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    addModalStyles();
}

// Close payment modal
function closePaymentModal() {
    const modal = document.querySelector('.payment-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Get tier name based on amount
function getTierName(amount) {
    if (amount >= 2000) return 'Angel Backer';
    if (amount >= 500) return 'Founding Supporter';
    if (amount >= 100) return 'Early Access';
    if (amount >= 25) return 'Believer';
    return 'Supporter';
}

// Process payment
function processPayment(method, amount, bdtAmount = null) {
    const paymentMethods = {
        'bKash': {
            instructions: `
                <h3>Pay with bKash</h3>
                <div class="instruction-step">
                    <strong>Amount:</strong> ৳${bdtAmount ? bdtAmount.toLocaleString() : 'Contact for amount'}
                </div>
                <div class="instruction-step">
                    <strong>Step 1:</strong> Open your bKash app
                </div>
                <div class="instruction-step">
                    <strong>Step 2:</strong> Select "Send Money"
                </div>
                <div class="instruction-step">
                    <strong>Step 3:</strong> Send to: <span class="highlight-number">01XXXXXXXXX</span>
                    <button onclick="copyText('01XXXXXXXXX')" class="btn-copy">Copy</button>
                </div>
                <div class="instruction-step">
                    <strong>Step 4:</strong> Reference: "ZARX Support"
                </div>
                <div class="instruction-step">
                    <strong>Step 5:</strong> Fill the form below after payment
                </div>
                <div class="instruction-note">
                    ⚡ After submitting, I'll verify within 24-48 hours
                </div>
            `
        },
        'Nagad': {
            instructions: `
                <h3>Pay with Nagad</h3>
                <div class="instruction-step">
                    <strong>Amount:</strong> ৳${bdtAmount ? bdtAmount.toLocaleString() : 'Contact for amount'}
                </div>
                <div class="instruction-step">
                    <strong>Step 1:</strong> Open your Nagad app
                </div>
                <div class="instruction-step">
                    <strong>Step 2:</strong> Select "Send Money"
                </div>
                <div class="instruction-step">
                    <strong>Step 3:</strong> Send to: <span class="highlight-number">01XXXXXXXXX</span>
                    <button onclick="copyText('01XXXXXXXXX')" class="btn-copy">Copy</button>
                </div>
                <div class="instruction-step">
                    <strong>Step 4:</strong> Reference: "ZARX Support"
                </div>
                <div class="instruction-step">
                    <strong>Step 5:</strong> Fill the form below after payment
                </div>
                <div class="instruction-note">
                    ⚡ After submitting, I'll verify within 24-48 hours
                </div>
            `
        },
        'Rocket': {
            instructions: `
                <h3>Pay with Rocket</h3>
                <div class="instruction-step">
                    <strong>Amount:</strong> ৳${bdtAmount ? bdtAmount.toLocaleString() : 'Contact for amount'}
                </div>
                <div class="instruction-step">
                    <strong>Step 1:</strong> Dial *322# or use Rocket app
                </div>
                <div class="instruction-step">
                    <strong>Step 2:</strong> Select "Send Money"
                </div>
                <div class="instruction-step">
                    <strong>Step 3:</strong> Send to: <span class="highlight-number">01XXXXXXXXX</span>
                    <button onclick="copyText('01XXXXXXXXX')" class="btn-copy">Copy</button>
                </div>
                <div class="instruction-step">
                    <strong>Step 4:</strong> Reference: "ZARX Support"
                </div>
                <div class="instruction-step">
                    <strong>Step 5:</strong> Fill the form below after payment
                </div>
                <div class="instruction-note">
                    ⚡ After submitting, I'll verify within 24-48 hours
                </div>
            `
        },
        'Wise': {
            instructions: `
                <h3>Pay with Wise (Formerly TransferWise)</h3>
                <div class="instruction-step">
                    <strong>Amount:</strong> $${amount} USD
                </div>
                <div class="instruction-step">
                    <strong>Why Wise?</strong> Low fees (~1%), works from Bangladesh, supports BDT → USD
                </div>
                <div class="instruction-step">
                    <strong>Step 1:</strong> Create account at <a href="https://wise.com" target="_blank" style="color: #00ff88;">wise.com</a>
                </div>
                <div class="instruction-step">
                    <strong>Step 2:</strong> Send to: <span class="highlight-email">akikfaraji@gmail.com</span>
                    <button onclick="copyText('akikfaraji@gmail.com')" class="btn-copy">Copy</button>
                </div>
                <div class="instruction-step">
                    <strong>Step 3:</strong> Add note: "ZARX Support"
                </div>
                <div class="instruction-step">
                    <strong>Step 4:</strong> Fill the form below after payment
                </div>
                <div class="instruction-note">
                    ✅ Wise works great from Bangladesh! Send from your BD bank in BDT.<br>
                    After submitting, I'll verify within 24-48 hours
                </div>
            `
        },
        'PayPal': {
            instructions: `
                <h3>Pay with PayPal</h3>
                <div class="instruction-step">
                    <strong>Amount:</strong> $${amount} USD
                </div>
                <div class="instruction-step">
                    <strong>Step 1:</strong> Log in to PayPal
                </div>
                <div class="instruction-step">
                    <strong>Step 2:</strong> Send to: <span class="highlight-email">akikfaraji@gmail.com</span>
                    <button onclick="copyText('akikfaraji@gmail.com')" class="btn-copy">Copy</button>
                </div>
                <div class="instruction-step">
                    <strong>Step 3:</strong> Select "Sending to a friend"
                </div>
                <div class="instruction-step">
                    <strong>Step 4:</strong> Add note: "ZARX Support"
                </div>
                <div class="instruction-step">
                    <strong>Step 5:</strong> Fill the form below after payment
                </div>
                <div class="instruction-note">
                    ✅ After submitting, I'll verify within 24-48 hours
                </div>
            `
        },
        'Crypto': {
            instructions: `
                <h3>Pay with Cryptocurrency</h3>
                <div class="instruction-step">
                    <strong>Amount:</strong> $${amount} USD
                </div>
                
                <div class="crypto-option">
                    <strong>Bitcoin (BTC)</strong><br>
                    <div class="crypto-address">
                        <code>1Naqfw1gLbCwazC2DcvuGk8kECSQGy8y6b</code>
                        <button onclick="copyText('1Naqfw1gLbCwazC2DcvuGk8kECSQGy8y6b')" class="btn-copy">Copy</button>
                    </div>
                </div>
                
                <div class="crypto-option">
                    <strong>USDT (TRC20)</strong> - Recommended (Low fees!)<br>
                    <div class="crypto-address">
                        <code>TG3eJ8EcUQuUekfHpy4ZKMXrqVyadPvQd8</code>
                        <button onclick="copyText('TG3eJ8EcUQuUekfHpy4ZKMXrqVyadPvQd8')" class="btn-copy">Copy</button>
                    </div>
                </div>
                
                <div class="crypto-option">
                    <strong>Ethereum (ETH)</strong><br>
                    <div class="crypto-address">
                        <code>0x940a1b9a2b7434d30bc26699542d12d7b3ad7626</code>
                        <button onclick="copyText('0x940a1b9a2b7434d30bc26699542d12d7b3ad7626')" class="btn-copy">Copy</button>
                    </div>
                </div>
                
                <div class="instruction-step">
                    <strong>After sending:</strong> Fill the form below with transaction hash
                </div>
                
                <div class="instruction-note">
                    ⚠️ Double-check addresses! Wrong network = lost funds forever.<br>
                    ✅ After submitting, I'll verify within 24-48 hours
                </div>
            `
        }
    };
    
    const paymentInfo = paymentMethods[method];
    if (paymentInfo) {
        showPaymentInstructions(paymentInfo.instructions, amount, method);
    }
}

// Show payment instructions with form
function showPaymentInstructions(content, amount, method) {
    const tierName = getTierName(amount);
    
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="payment-modal-content payment-instructions-modal">
            <div class="payment-instructions">
                ${content}
            </div>
            
            <div class="donor-form">
                <h4>📋 Submit After Payment</h4>
                <p class="form-subtitle">Complete your payment first, then fill this form</p>
                
                <form id="donorForm" onsubmit="submitDonation(event, ${amount}, '${method}', '${tierName}')">
                    <input type="text" id="donorName" placeholder="Your Name *" required class="form-input">
                    <input type="email" id="donorEmail" placeholder="Your Email *" required class="form-input">
                    <input type="text" id="transactionId" placeholder="Transaction ID / Hash *" required class="form-input">
                    
                    <div class="form-note">
                        <strong>⏳ Verification Process</strong><br>
                        <small>I'll verify your payment within 24-48 hours and send confirmation with tier benefits</small>
                    </div>
                    
                    <button type="submit" class="btn btn-submit" id="submitBtn">
                        ✓ Submit for Verification
                    </button>
                </form>
            </div>
            
            <button onclick="closePaymentModal()" class="btn btn-close-bottom">
                Close
            </button>
        </div>
    `;
    
    const existingModal = document.querySelector('.payment-modal');
    if (existingModal) existingModal.remove();
    
    document.body.appendChild(modal);
}

// Submit donation - NOW CALLS VERCEL API!
async function submitDonation(event, amount, method, tierName) {
    event.preventDefault();
    
    const name = document.getElementById('donorName').value.trim();
    const email = document.getElementById('donorEmail').value.trim();
    const transactionId = document.getElementById('transactionId').value.trim();
    const submitBtn = document.getElementById('submitBtn');
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '⏳ Sending...';
    
    try {
        // Call Vercel API endpoint
        const response = await fetch('/api/donate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                amount: amount,
                method: method,
                tier: tierName,
                transactionId: transactionId
            })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            showNotification('✓ Submission received! Check your email for details.', 'success');
            showNotification('⏳ Your donation is pending verification (24-48 hours)', 'warning');
            
            // Close modal after success
            setTimeout(() => {
                closePaymentModal();
            }, 3000);
        } else {
            throw new Error(result.error || 'Submission failed');
        }
        
    } catch (error) {
        console.error('Submission error:', error);
        showNotification('Something went wrong. Please email akikfaraji@gmail.com', 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '✓ Submit for Verification';
    }
}

// Copy text to clipboard
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.style.background = '#00ff88';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
        
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Copied: ' + text, 'success');
    });
}

// Add modal styles dynamically
function addModalStyles() {
    if (document.getElementById('modalStyles')) return;
    
    const style = document.createElement('style');
    style.id = 'modalStyles';
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .payment-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
            overflow-y: auto;
            padding: 20px;
        }
        
        .payment-modal-content {
            background: var(--bg-card);
            border: 3px solid var(--accent-primary);
            padding: 40px;
            max-width: 600px;
            width: 90%;
            position: relative;
            animation: slideUp 0.3s ease;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .payment-modal-content h2 {
            font-family: 'JetBrains Mono', monospace;
            font-size: 28px;
            margin-bottom: 20px;
            color: var(--accent-primary);
        }
        
        .payment-amount {
            font-family: 'JetBrains Mono', monospace;
            font-size: 48px;
            font-weight: 800;
            color: var(--accent-primary);
            text-align: center;
            margin: 20px 0;
        }
        
        .bdt-amount {
            display: block;
            font-size: 24px;
            color: var(--text-secondary);
            margin-top: 5px;
        }
        
        .payment-modal-content > p {
            color: var(--text-secondary);
            margin-bottom: 20px;
            text-align: center;
        }
        
        .payment-section {
            margin: 30px 0;
            padding: 20px;
            background: var(--bg-secondary);
            border-left: 4px solid var(--accent-primary);
        }
        
        .payment-section-title {
            font-family: 'JetBrains Mono', monospace;
            font-size: 18px;
            font-weight: 700;
            color: var(--accent-primary);
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .payment-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .payment-buttons .btn {
            width: 100%;
            text-align: left;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: flex-start;
        }
        
        .payment-icon {
            font-size: 24px;
        }
        
        .btn-bkash {
            background: #E2136E;
            color: white;
            border: 2px solid #E2136E;
        }
        
        .btn-bkash:hover {
            background: transparent;
            color: #E2136E;
        }
        
        .btn-nagad {
            background: #F16022;
            color: white;
            border: 2px solid #F16022;
        }
        
        .btn-nagad:hover {
            background: transparent;
            color: #F16022;
        }
        
        .btn-rocket {
            background: #8B3A8B;
            color: white;
            border: 2px solid #8B3A8B;
        }
        
        .btn-rocket:hover {
            background: transparent;
            color: #8B3A8B;
        }
        
        .btn-wise {
            background: #9FE870;
            color: #0a0a0a;
            border: 2px solid #9FE870;
            font-weight: 700;
        }
        
        .btn-wise:hover {
            background: transparent;
            color: #9FE870;
        }
        
        .btn-paypal {
            background: #0070BA;
            color: white;
            border: 2px solid #0070BA;
        }
        
        .btn-paypal:hover {
            background: transparent;
            color: #0070BA;
        }
        
        .btn-crypto {
            background: #F7931A;
            color: white;
            border: 2px solid #F7931A;
        }
        
        .btn-crypto:hover {
            background: transparent;
            color: #F7931A;
        }
        
        .btn-close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 24px;
            cursor: pointer;
            padding: 5px 10px;
            transition: color 0.3s ease;
        }
        
        .btn-close:hover {
            color: var(--accent-primary);
        }
        
        /* Payment Instructions */
        .payment-instructions-modal {
            max-width: 700px;
        }
        
        .payment-instructions h3 {
            font-family: 'JetBrains Mono', monospace;
            font-size: 24px;
            color: var(--accent-primary);
            margin-bottom: 25px;
            text-align: center;
        }
        
        .instruction-step {
            background: var(--bg-secondary);
            border-left: 3px solid var(--accent-primary);
            padding: 15px;
            margin-bottom: 15px;
            font-size: 16px;
            line-height: 1.6;
        }
        
        .instruction-step strong {
            color: var(--accent-primary);
            display: block;
            margin-bottom: 5px;
        }
        
        .highlight-number,
        .highlight-email {
            font-family: 'JetBrains Mono', monospace;
            font-size: 18px;
            color: var(--accent-primary);
            background: var(--bg-primary);
            padding: 5px 10px;
            border-radius: 4px;
            display: inline-block;
            margin: 5px 0;
        }
        
        .btn-copy {
            background: var(--accent-secondary);
            color: white;
            border: none;
            padding: 5px 15px;
            margin-left: 10px;
            cursor: pointer;
            font-family: 'Space Mono', monospace;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
        }
        
        .btn-copy:hover {
            background: var(--accent-primary);
            transform: scale(1.05);
        }
        
        .instruction-note {
            background: var(--bg-primary);
            border: 2px solid var(--accent-primary);
            padding: 15px;
            margin-top: 20px;
            color: var(--accent-primary);
            text-align: center;
            font-weight: 700;
            line-height: 1.6;
        }
        
        .crypto-option {
            background: var(--bg-secondary);
            padding: 15px;
            margin-bottom: 15px;
            border-left: 3px solid #F7931A;
        }
        
        .crypto-option strong {
            color: #F7931A;
            display: block;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .crypto-address {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .crypto-address code {
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            background: var(--bg-primary);
            padding: 10px;
            border-radius: 4px;
            color: var(--accent-primary);
            word-break: break-all;
            flex: 1;
            min-width: 200px;
        }
        
        /* Donor Form */
        .donor-form {
            margin-top: 30px;
            padding: 25px;
            background: var(--bg-secondary);
            border: 2px solid var(--accent-primary);
        }
        
        .donor-form h4 {
            color: var(--accent-primary);
            margin-bottom: 10px;
            font-size: 20px;
            font-family: 'JetBrains Mono', monospace;
        }
        
        .form-subtitle {
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 20px;
        }
        
        .form-note {
            background: var(--bg-primary);
            border-left: 3px solid var(--accent-primary);
            padding: 12px;
            margin-bottom: 15px;
            font-size: 14px;
        }
        
        .form-note strong {
            color: var(--accent-primary);
        }
        
        .form-note small {
            color: var(--text-dim);
        }
        
        .form-input {
            width: 100%;
            padding: 12px;
            margin-bottom: 12px;
            background: var(--bg-primary);
            border: 2px solid var(--border-color);
            color: var(--text-primary);
            font-family: 'Space Mono', monospace;
            font-size: 14px;
            transition: border-color 0.3s ease;
        }
        
        .form-input:focus {
            outline: none;
            border-color: var(--accent-primary);
        }
        
        .btn-submit {
            width: 100%;
            padding: 15px;
            background: var(--accent-primary);
            color: var(--bg-primary);
            border: 2px solid var(--accent-primary);
            font-family: 'JetBrains Mono', monospace;
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-submit:hover:not(:disabled) {
            background: transparent;
            color: var(--accent-primary);
            transform: translateY(-2px);
        }
        
        .btn-submit:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .btn-close-bottom {
            width: 100%;
            margin-top: 15px;
            padding: 12px;
            background: transparent;
            color: var(--text-secondary);
            border: 2px solid var(--border-color);
            font-family: 'Space Mono', monospace;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-close-bottom:hover {
            border-color: var(--accent-primary);
            color: var(--accent-primary);
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .payment-modal-content {
                padding: 30px 20px;
            }
            
            .payment-amount {
                font-size: 36px;
            }
            
            .bdt-amount {
                font-size: 18px;
            }
            
            .crypto-address {
                flex-direction: column;
            }
            
            .crypto-address code {
                width: 100%;
            }
            
            .btn-copy {
                width: 100%;
                margin-left: 0;
                margin-top: 5px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.what-card, .tier-card, .deliverable-card, .faq-item, .stat-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePaymentModal();
    }
});

// Update funding manually - call this function to update progress
function updateFundingData(raised, backers) {
    fundingData.raised = raised;
    fundingData.backers = backers;
    updateProgress();
}

// Example: Uncomment to test
// updateFundingData(1250, 18);
