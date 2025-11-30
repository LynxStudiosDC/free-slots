document.getElementById('supportForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);
  const responseDiv = document.getElementById('response');

  // Replace with your actual Discord webhook URL
  const webhookUrl = 'https://discord.com/api/webhooks/1444532359226724392/4tDYFbDiH5QrIM2s_2-j17pBTCAbSfYwdzLdb3iRo1GBsLg3s8GuqjfEwJXGBlOH4-e8';

  const payload = {
    username: 'CheckoutBot',
    content: `**New Checkout Submission**\n**Name:** ${data.get('name')}\n**Email:** ${data.get('email')}\n**Category:** ${data.get('category')}\n**Link:** ${data.get('message')}`
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
      responseDiv.textContent = 'Order sent successfully!';
      responseDiv.className = 'response success';
      responseDiv.classList.remove('hidden');
    })
    .catch(err => {
      responseDiv.textContent = 'Error: ' + err.message;
      responseDiv.className = 'response error';
      responseDiv.classList.remove('hidden');
    });
});

