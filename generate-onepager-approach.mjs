import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read logo as base64
const logoBase64 = fs.readFileSync(path.join(__dirname, 'public/images/logos/logo-full.png')).toString('base64');

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      line-height: 1.4;
      color: #1E2022;
      padding: 35px 40px;
      background: #fff;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 3px solid #0B3D2E;
    }

    .logo-section img {
      height: 50px;
    }

    .contact-info {
      text-align: right;
      font-size: 10px;
      color: #4A5568;
    }

    .contact-info a {
      color: #0B3D2E;
      text-decoration: none;
    }

    .hero {
      text-align: center;
      margin-bottom: 25px;
    }

    .hero h1 {
      font-size: 28px;
      color: #0B3D2E;
      margin-bottom: 12px;
      line-height: 1.2;
    }

    .hero h1 span {
      color: #2BBBAD;
    }

    .hero p {
      font-size: 11px;
      color: #4A5568;
      max-width: 560px;
      margin: 0 auto;
    }

    .hero p strong {
      color: #0B3D2E;
    }

    .approach-section {
      display: flex;
      gap: 20px;
      margin-bottom: 25px;
    }

    .approach-column {
      flex: 1;
      background: #F4F1EA;
      border-radius: 8px;
      padding: 18px;
      border-top: 4px solid #0B3D2E;
    }

    .approach-column h3 {
      font-size: 16px;
      color: #0B3D2E;
      margin-bottom: 12px;
      font-weight: 700;
    }

    .approach-column ul {
      list-style: none;
    }

    .approach-column li {
      padding: 5px 0;
      padding-left: 20px;
      position: relative;
      font-size: 10px;
      color: #1E2022;
    }

    .approach-column li::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #2BBBAD;
      font-weight: 700;
    }

    .pillars {
      display: flex;
      justify-content: center;
      gap: 50px;
      margin-bottom: 25px;
    }

    .pillar {
      text-align: center;
    }

    .pillar-icon {
      width: 50px;
      height: 50px;
      background: #E8F0E8;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 8px;
      font-size: 16px;
      font-weight: 700;
      color: #0B3D2E;
    }

    .pillar h3 {
      font-size: 11px;
      color: #0B3D2E;
      margin-bottom: 4px;
      font-weight: 600;
    }

    .pillar p {
      font-size: 9px;
      color: #4A5568;
    }

    .cta-section {
      background: #0B3D2E;
      color: #fff;
      padding: 20px 25px;
      border-radius: 10px;
      text-align: center;
      margin-bottom: 15px;
    }

    .cta-section h2 {
      font-size: 20px;
      margin-bottom: 8px;
    }

    .cta-section h2 .price {
      color: #2BBBAD;
    }

    .cta-section h2 .old-price {
      text-decoration: line-through;
      opacity: 0.7;
      font-size: 14px;
    }

    .cta-section p {
      font-size: 10px;
      opacity: 0.9;
      margin-bottom: 12px;
    }

    .cta-section .email {
      display: inline-block;
      background: #2BBBAD;
      color: #fff;
      padding: 8px 20px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 12px;
    }

    .footer {
      text-align: center;
      font-size: 9px;
      color: #4A5568;
      padding-top: 10px;
      border-top: 1px solid #E8F0E8;
    }

    .footer strong {
      color: #0B3D2E;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-section">
      <img src="data:image/png;base64,${logoBase64}" alt="AI Ready PDX">
    </div>
    <div class="contact-info">
      <a href="mailto:hello@aireadypdx.com">hello@aireadypdx.com</a><br>
      <a href="https://aireadypdx.com">aireadypdx.com</a><br>
      Portland, OR
    </div>
  </div>

  <div class="hero">
    <h1>Is Your Business Ready for<br><span>2026: The Year of AI?</span></h1>
    <p>AI has moved from bleeding edge to business essential. <strong>AI Ready PDX</strong>, powered by Vital Enterprises' 30+ years of technology leadership, helps Portland-area businesses adopt AI confidently, practically, and securely.</p>
  </div>

  <div class="approach-section">
    <div class="approach-column">
      <h3>Assess</h3>
      <ul>
        <li>AI Readiness Assessment</li>
        <li>Website AI Audit (SEO, AEO, GEO)</li>
        <li>Opportunity identification</li>
        <li>Technology stack review</li>
        <li>Privacy & security evaluation</li>
      </ul>
    </div>
    <div class="approach-column">
      <h3>Implement</h3>
      <ul>
        <li>Chatbots & voice agents</li>
        <li>Content automation tools</li>
        <li>Outreach systems (email, voice, social)</li>
        <li>Custom AI applications</li>
        <li>Secure on-premise AI deployment</li>
      </ul>
    </div>
    <div class="approach-column">
      <h3>Train</h3>
      <ul>
        <li>Executive AI briefings</li>
        <li>Team training workshops</li>
        <li>Agentic coding tools</li>
        <li>Ongoing strategy support</li>
        <li>Quarterly State of AI updates</li>
      </ul>
    </div>
  </div>

  <div class="pillars">
    <div class="pillar">
      <div class="pillar-icon">30+</div>
      <h3>Years of Tech Leadership</h3>
      <p>VTM & Novus Labs experience across<br>global tech consortiums</p>
    </div>
    <div class="pillar">
      <div class="pillar-icon">PDX</div>
      <h3>Local Portland Presence</h3>
      <p>We're your neighbors, invested in<br>the community you serve</p>
    </div>
    <div class="pillar">
      <div class="pillar-icon">🔒</div>
      <h3>Privacy-First Options</h3>
      <p>On-premise & air-gapped solutions<br>for sensitive data</p>
    </div>
  </div>

  <div class="cta-section">
    <h2>AI Readiness Session — <span class="old-price">$500</span> <span class="price">$50</span> (First 100 Clients)</h2>
    <p>60-90 minute consultation. Custom recommendations. AI Opportunities Snapshot document.</p>
    <div class="email">→ hello@aireadypdx.com</div>
  </div>

  <div class="footer">
    <strong>AI Ready PDX</strong> | Powered by Vital Enterprises | Portland, OR | aireadypdx.com
  </div>
</body>
</html>
`;

async function generatePDF() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('Setting content...');
  await page.setContent(html, { waitUntil: 'networkidle0' });

  console.log('Generating PDF...');
  await page.pdf({
    path: path.join(__dirname, 'ai-onepager-approach.pdf'),
    format: 'Letter',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  await browser.close();
  console.log('✓ PDF saved: ai-onepager-approach.pdf');
}

generatePDF().catch(console.error);
