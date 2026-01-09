document.getElementById('supportForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);
  const responseDiv = document.getElementById('response');

  // Generate a short order number
  const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase();

  // Replace with your actual Discord webhook URL
  const webhookUrl = 'https://discord.com/api/webhooks/1444532359226724392/4tDYFbDiH5QrIM2s_2-j17pBTCAbSfYwdzLdb3iRo1GBsLg3s8GuqjfEwJXGBlOH4-e8';

  const payload = {
    username: 'CheckoutBot',
    content: `**New Checkout Submission**  
**Order #:** ${orderNumber}  
**Name:** ${data.get('name')}  
**Email:** ${data.get('email')}  
**Category:** ${data.get('category')}  
**Link:** ${data.get('message')}`
  };

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(async res => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      form.reset();
      // Build popup overlay
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.innerHTML = `
        <div class="overlay-content">
          <h2>Order Submitted</h2>
          <p>Your order number is <strong>${orderNumber}</strong></p>
          <p style="font-size:0.9rem;margin-top:0.5rem;">Make sure to copy your order number and submit a ticket in the Discord to finish your purchase!</p>
          <button id="closePopup" class="submit-btn">OK</button>
        </div>
      `;
      document.body.appendChild(overlay);
      // Close on button click
      overlay.querySelector('#closePopup').addEventListener('click', () => overlay.remove());
    })
    .catch(err => {
      responseDiv.textContent = 'Error: ' + err.message;
      responseDiv.className = 'response error';
      responseDiv.classList.remove('hidden');
    });
});

