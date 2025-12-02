import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read images as base64
const logoBase64 = fs.readFileSync(path.join(__dirname, 'public/images/logos/logo-full.png')).toString('base64');
const iconHomeServices = fs.readFileSync(path.join(__dirname, 'public/images/icons/client-home-services.png')).toString('base64');
const iconFood = fs.readFileSync(path.join(__dirname, 'public/images/icons/client-food.png')).toString('base64');
const iconProfessional = fs.readFileSync(path.join(__dirname, 'public/images/icons/client-professional.png')).toString('base64');
const iconCivic = fs.readFileSync(path.join(__dirname, 'public/images/icons/client-civic.png')).toString('base64');
const iconNonprofit = fs.readFileSync(path.join(__dirname, 'public/images/icons/client-nonprofit.png')).toString('base64');
const iconManufacturing = fs.readFileSync(path.join(__dirname, 'public/images/icons/client-manufacturing.png')).toString('base64');

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
      font-size: 10px;
      line-height: 1.3;
      color: #1E2022;
      padding: 30px 35px;
      background: #fff;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15px;
      padding-bottom: 12px;
      border-bottom: 3px solid #0B3D2E;
    }

    .logo-section img {
      height: 45px;
    }

    .contact-info {
      text-align: right;
      font-size: 9px;
      color: #4A5568;
    }

    .contact-info a {
      color: #0B3D2E;
      text-decoration: none;
    }

    .hero {
      text-align: center;
      margin-bottom: 18px;
    }

    .hero h1 {
      font-size: 24px;
      color: #0B3D2E;
      margin-bottom: 8px;
      line-height: 1.15;
    }

    .hero h1 span {
      color: #2BBBAD;
    }

    .hero p {
      font-size: 10px;
      color: #4A5568;
      max-width: 520px;
      margin: 0 auto;
    }

    .pillars {
      display: flex;
      justify-content: center;
      gap: 35px;
      margin-bottom: 18px;
    }

    .pillar {
      text-align: center;
    }

    .pillar-icon {
      width: 42px;
      height: 42px;
      background: #E8F0E8;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 6px;
      font-size: 14px;
      font-weight: 700;
      color: #0B3D2E;
    }

    .pillar h3 {
      font-size: 10px;
      color: #0B3D2E;
      margin-bottom: 2px;
    }

    .pillar p {
      font-size: 8px;
      color: #4A5568;
    }

    .services-table {
      margin-bottom: 15px;
    }

    .services-table table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8px;
    }

    .services-table th {
      background: #0B3D2E;
      color: #fff;
      padding: 6px 4px 8px;
      text-align: center;
      vertical-align: top;
      font-weight: 600;
    }

    .services-table th img {
      width: 26px;
      height: 26px;
      border-radius: 4px;
      margin-bottom: 3px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .services-table th .industry-name {
      font-size: 7.5px;
      display: block;
      line-height: 1.2;
    }

    .services-table th .industry-sub {
      font-size: 6.5px;
      opacity: 0.8;
      font-weight: 400;
      line-height: 1.2;
    }

    .services-table th.service-col {
      width: 110px;
      text-align: left;
      vertical-align: middle;
    }

    .services-table td {
      padding: 4px;
      text-align: center;
      border-bottom: 1px solid #E8F0E8;
    }

    .services-table td.service-name {
      text-align: left;
      font-weight: 500;
      padding-left: 6px;
      font-size: 8px;
    }

    .services-table tr.category td {
      background: #E8F0E8;
      font-weight: 700;
      color: #0B3D2E;
      text-align: left;
      padding: 4px 6px;
      font-size: 9px;
    }

    .services-table tr.category-dark td {
      background: #1F3A5F;
      color: #fff;
    }

    .check {
      color: #2BBBAD;
      font-weight: 700;
      font-size: 10px;
    }

    .cta-section {
      background: #0B3D2E;
      color: #fff;
      padding: 14px 20px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 12px;
    }

    .cta-section h2 {
      font-size: 16px;
      margin-bottom: 6px;
    }

    .cta-section h2 .price {
      color: #2BBBAD;
    }

    .cta-section h2 .old-price {
      text-decoration: line-through;
      opacity: 0.7;
      font-size: 12px;
    }

    .cta-section p {
      font-size: 9px;
      opacity: 0.9;
      margin-bottom: 8px;
    }

    .cta-section .email {
      display: inline-block;
      background: #2BBBAD;
      color: #fff;
      padding: 6px 16px;
      border-radius: 5px;
      font-weight: 600;
      font-size: 10px;
    }

    .footer {
      text-align: center;
      font-size: 8px;
      color: #4A5568;
      padding-top: 8px;
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

  <div class="services-table">
    <table>
      <thead>
        <tr>
          <th class="service-col"></th>
          <th>
            <img src="data:image/png;base64,${iconHomeServices}" alt="">
            <span class="industry-name">Field Services</span>
            <span class="industry-sub">HVAC, Plumbing,<br>Landscaping</span>
          </th>
          <th>
            <img src="data:image/png;base64,${iconFood}" alt="">
            <span class="industry-name">Retail & Hospitality</span>
            <span class="industry-sub">Coffee, Restaurants,<br>Shops</span>
          </th>
          <th>
            <img src="data:image/png;base64,${iconProfessional}" alt="">
            <span class="industry-name">Professional</span>
            <span class="industry-sub">Dental, Legal,<br>Accounting</span>
          </th>
          <th>
            <img src="data:image/png;base64,${iconCivic}" alt="">
            <span class="industry-name">Civic & Education</span>
            <span class="industry-sub">Schools, Churches,<br>Public Safety</span>
          </th>
          <th>
            <img src="data:image/png;base64,${iconNonprofit}" alt="">
            <span class="industry-name">Community Orgs</span>
            <span class="industry-sub">Nonprofits</span>
          </th>
          <th>
            <img src="data:image/png;base64,${iconManufacturing}" alt="">
            <span class="industry-name">Manufacturing</span>
            <span class="industry-sub">Inventory,<br>Private AI</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="category"><td colspan="7">Marketing & Sales</td></tr>
        <tr>
          <td class="service-name">Web presence (SEO, AEO/GEO)</td>
          <td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td>
        </tr>
        <tr>
          <td class="service-name">Content & collateral</td>
          <td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td>
        </tr>
        <tr>
          <td class="service-name">Outreach (email, voice, social)</td>
          <td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td></td>
        </tr>
        <tr class="category"><td colspan="7">Operations</td></tr>
        <tr>
          <td class="service-name">Scheduling & intake</td>
          <td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td>
        </tr>
        <tr>
          <td class="service-name">Inventory & supply chain</td>
          <td class="check">✓</td><td class="check">✓</td><td></td><td></td><td></td><td class="check">✓</td>
        </tr>
        <tr>
          <td class="service-name">Process automation</td>
          <td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td></td><td class="check">✓</td><td class="check">✓</td>
        </tr>
        <tr class="category"><td colspan="7">Management</td></tr>
        <tr>
          <td class="service-name">Dashboards & analytics</td>
          <td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td>
        </tr>
        <tr>
          <td class="service-name">Reporting & insights</td>
          <td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td>
        </tr>
        <tr class="category category-dark"><td colspan="7">Confidential AI</td></tr>
        <tr>
          <td class="service-name">On-premise deployment</td>
          <td></td><td></td><td class="check">✓</td><td class="check">✓</td><td></td><td class="check">✓</td>
        </tr>
        <tr>
          <td class="service-name">Private cloud inference</td>
          <td></td><td></td><td class="check">✓</td><td class="check">✓</td><td></td><td class="check">✓</td>
        </tr>
      </tbody>
    </table>
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
    path: path.join(__dirname, 'AI-Ready-PDX-OnePager.pdf'),
    format: 'Letter',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  await browser.close();
  console.log('✓ PDF saved: AI-Ready-PDX-OnePager.pdf');
}

generatePDF().catch(console.error);
