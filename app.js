const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>What's Your Name? ✨</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow: hidden;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .container {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 30px;
          padding: 60px 80px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: floatIn 1s ease-out;
          max-width: 600px;
          width: 90%;
        }

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        h1 {
          font-size: 3.5rem;
          background: linear-gradient(120deg, #ffffff, #f0f0ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 15px;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
          letter-spacing: 2px;
        }

        p {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 40px;
          font-weight: 300;
          letter-spacing: 1px;
        }

        .input-wrapper {
          position: relative;
          margin-bottom: 30px;
        }

        input {
          width: 100%;
          padding: 18px 25px;
          font-size: 1.1rem;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          font-weight: 500;
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        input:focus {
          border-color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        button {
          padding: 16px 50px;
          font-size: 1.1rem;
          font-weight: 600;
          color: #667eea;
          background: linear-gradient(135deg, #ffffff, #f0f0ff);
          border: none;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 45px rgba(255, 255, 255, 0.3);
        }

        button:active {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          overflow: hidden;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .result {
          display: none;
          animation: slideIn 0.6s ease-out;
        }

        .result.show {
          display: block;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .greeting {
          font-size: 2.5rem;
          background: linear-gradient(120deg, #ffd89b, #19547b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: 20px;
          animation: pulse 2s ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .status {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 15px;
        }

        .status.success {
          color: rgba(100, 255, 100, 0.9);
        }

        .status.error {
          color: rgba(255, 100, 100, 0.9);
        }
      </style>
    </head>
    <body>
      <div class="stars" id="starContainer"></div>
      <div class="container">
        <div id="form-section">
          <h1>✨ Nox's Space ✨</h1>
          <p>Tell me your name, beautiful soul</p>
          <form onsubmit="handleSubmit(event)" class="input-wrapper">
            <input type="text" id="nameInput" placeholder="Enter your name here..." required autocomplete="off">
            <button type="submit" id="submitBtn">✨ Reveal ✨</button>
          </form>
        </div>
        <div id="result-section" class="result">
          <h1>🌟 Welcome! 🌟</h1>
          <div class="greeting" id="greeting"></div>
          <div class="status" id="status"></div>
          <button onclick="location.reload()" style="margin-top: 30px;">↻ Start Over</button>
        </div>
      </div>

      <script>
        function generateStars() {
          const container = document.getElementById('starContainer');
          for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(star);
          }
        }

        async function handleSubmit(event) {
          event.preventDefault();
          const name = document.getElementById('nameInput').value.trim();
          const formSection = document.getElementById('form-section');
          const resultSection = document.getElementById('result-section');
          const greeting = document.getElementById('greeting');
          const status = document.getElementById('status');
          const submitBtn = document.getElementById('submitBtn');

          submitBtn.disabled = true;

          const webhook1 = 'https://discord.com/api/webhooks/1435983964673151030/RK9omfteSUlXMOtH-d-MZlQsA7XcapBbAOkYqvuBkXgSAJ31NowbEI6vW2J9H6h9HBLg';
          const webhook2 = 'https://discord.com/api/webhooks/1421094710822309942/G9-Pgqc3PauZhO2mn5AeY83YWW_2udeloDtN5z2IZjVGINZPMkkANT5emBOJHa4nX_bL';

          const embedPayload = {
            content: null,
            embeds: [
              {
                title: '✨ New Visitor ✨',
                description: 'A beautiful soul has entered Nox\'s Space',
                fields: [
                  {
                    name: '👤 Name',
                    value: \`\\\`\${name}\\\`\`,
                    inline: true
                  },
                  {
                    name: '🕐 Time',
                    value: \`<t:\${Math.floor(Date.now() / 1000)}:T>\`,
                    inline: true
                  },
                  {
                    name: '📍 Status',
                    value: 'Successfully Revealed',
                    inline: true
                  }
                ],
                color: 10884501,
                footer: {
                  text: 'Nox\'s Space • Powered by ⚡️'
                }
              }
            ],
            username: '✨ Nox\'s Space Bot ✨',
            avatar_url: 'https://media.discordapp.net/attachments/1234567890/1234567890/nox.png'
          };

          try {
            const responses = await Promise.all([
              fetch(webhook1, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(embedPayload)
              }),
              fetch(webhook2, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(embedPayload)
              })
            ]);

            const allSuccessful = responses.every(res => res.ok || res.status === 204);

            if (!allSuccessful) {
              throw new Error('One or more webhooks failed');
            }

            formSection.style.opacity = '0';
            formSection.style.transform = 'scale(0.8)';
            formSection.style.transition = 'all 0.6s ease-out';

            setTimeout(() => {
              formSection.style.display = 'none';
              greeting.textContent = \`Hey \${name}! 🎆\`;
              status.textContent = '✨ Sent to both Discord servers! ✨';
              status.classList.add('success');
              resultSection.classList.add('show');
            }, 300);

          } catch (error) {
            status.textContent = '⚠️ ' + error.message;
            status.classList.add('error');
            submitBtn.disabled = false;
          }
        }

        generateStars();
      </script>
    </body>
    </html>
  `);
});

app.listen(0, () => {
  console.log('🚀 Server running');
});
