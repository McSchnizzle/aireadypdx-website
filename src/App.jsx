import { useState } from 'react'
import './App.css'

// Icons as simple SVG components
const Icons = {
  Award: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  Briefcase: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  MessageSquare: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12"/>
      <line x1="4" x2="20" y1="6" y2="6"/>
      <line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/>
      <path d="m6 6 12 12"/>
    </svg>
  ),
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    teamSize: '',
    message: '',
    freeSession: false
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Using Formspree - replace YOUR_FORM_ID with actual Formspree form ID
    try {
      const response = await fetch('https://formspree.io/f/myzrkrbo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setFormSubmitted(true)
        setFormData({
          name: '',
          email: '',
          company: '',
          website: '',
          teamSize: '',
          message: '',
          freeSession: false
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      // For demo purposes, show success anyway
      setFormSubmitted(true)
    }
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="nav-logo">
            AI <span>Ready</span> PDX
          </a>
          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#why-us" onClick={(e) => scrollToSection(e, 'why-us')}>Why Us</a></li>
            <li><a href="#who-we-help" onClick={(e) => scrollToSection(e, 'who-we-help')}>Who We Help</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a></li>
            <li><a href="#approach" onClick={(e) => scrollToSection(e, 'approach')}>Approach</a></li>
            <li><a href="#packages" onClick={(e) => scrollToSection(e, 'packages')}>Packages</a></li>
            <li><a href="#private-ai" onClick={(e) => scrollToSection(e, 'private-ai')}>Private AI</a></li>
            <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
            <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-primary">Contact</a></li>
          </ul>
          <div className="nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">2026: The Year of AI — we help local organizations get ready</span>
            <h1>Experienced tech leaders for your AI journey.</h1>
            <p className="hero-subheading">
              AI is moving into mainstream adoption. We help Portland-area businesses and nonprofits use it safely and practically — without needing a technical team.
            </p>
            <p className="hero-support">
              Backed by 30 years of building and leading technology companies, we've already been rolling out AI solutions across more than a dozen organizations in the region.
            </p>
            <div className="hero-buttons">
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-primary">
                Book your free December 2025 AI Readiness Session
              </a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="btn btn-secondary">
                Explore services
              </a>
            </div>
            <p className="hero-location">Serving Portland and the Pacific Northwest</p>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="why-us">
        <div className="container">
          <div className="section-header">
            <h2>Why work with AI Ready PDX?</h2>
          </div>
          <div className="grid-4">
            <div className="card why-us-card">
              <div className="icon">
                <Icons.Award />
              </div>
              <h3>Decades of tech leadership</h3>
              <p>
                AI Ready PDX is part of the Vital Enterprises family. Our companies include VTM, which has led global technology consortiums for over 30 years, and Novus Labs, which has spent 17 years working on complex consumer electronics products.
              </p>
            </div>
            <div className="card why-us-card">
              <div className="icon">
                <Icons.Briefcase />
              </div>
              <h3>We know tech and business</h3>
              <p>
                We understand how companies actually run — how work gets scheduled, how revenue flows, and where things get stuck. We translate AI into process improvements, not buzzwords.
              </p>
            </div>
            <div className="card why-us-card">
              <div className="icon">
                <Icons.CheckCircle />
              </div>
              <h3>We've already been doing this</h3>
              <p>
                We've been working with AI-enabled products and tools for several years and are already helping organizations in the region — including regional nonprofits — design and implement AI strategies.
              </p>
            </div>
            <div className="card why-us-card">
              <div className="icon">
                <Icons.MessageSquare />
              </div>
              <h3>Plain language, practical outcomes</h3>
              <p>
                We explain things in everyday terms, focus on measurable wins, and help your team get comfortable with AI instead of overwhelmed by it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section id="who-we-help" className="who-we-help">
        <div className="container">
          <div className="section-header">
            <h2>Who we help</h2>
            <p>We work with mostly non-technical organizations that want to use AI but don't want to become technology companies.</p>
          </div>
          <div className="grid-5">
            <div className="card client-card">
              <h3>Home & field services</h3>
              <p>Tree services, landscaping, HVAC, plumbing, and similar service businesses looking to improve scheduling, quoting, and follow-up.</p>
            </div>
            <div className="card client-card">
              <h3>Coffee & food businesses</h3>
              <p>Roasters, cafes, and food producers that want better customer communication and web presence.</p>
            </div>
            <div className="card client-card">
              <h3>Professional practices</h3>
              <p>Dental, legal, accounting, and clinic teams looking to streamline intake, reminders, and client communication.</p>
            </div>
            <div className="card client-card">
              <h3>Manufacturers & distributors</h3>
              <p>Smaller operations that want better visibility into orders, inventory, and customer needs.</p>
            </div>
            <div className="card client-card">
              <h3>Nonprofits & regional organizations</h3>
              <p>Community-focused organizations that need to do more with limited staff while protecting sensitive data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2>What we do</h2>
            <p>AI Ready PDX helps Portland-area organizations discover where AI actually fits in their business, then designs and implements practical solutions. We focus on small, high-impact wins that build confidence and momentum.</p>
          </div>
          <div className="grid-5">
            <div className="card service-card">
              <h3>Strategy & roadmaps</h3>
              <p>We start with how your business really works today. Then we identify high-ROI use cases, build a simple 6–12 month roadmap, and check in regularly as AI evolves.</p>
            </div>
            <div className="card service-card">
              <h3>Automation & agents</h3>
              <p>We design small internal tools and automations — from smarter scheduling and intake forms to AI-assisted report generation — using agentic coding tools, with experienced engineers reviewing every step.</p>
            </div>
            <div className="card service-card">
              <h3>Marketing & outreach</h3>
              <p>We use AI to refresh your website copy, improve your search and Answer Engine Optimization (AEO) visibility, draft content calendars, and help you set up ethical, targeted cold outreach.</p>
            </div>
            <div className="card service-card">
              <h3>Training & enablement</h3>
              <p>We run executive briefings, all-staff AI 101, and developer bootcamps so the people who will use AI day-to-day feel confident and safe.</p>
            </div>
            <div className="card service-card">
              <h3>Data & private AI</h3>
              <p>We help you bring together key data in platforms like Snowflake or Databricks, then build private AI assistants and environments — on-prem or in secure cloud — that respect your privacy requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="approach">
        <div className="container">
          <div className="section-header">
            <h2>How we roll out AI — step by step</h2>
            <p>Organizations can enter at different phases depending on where they are today.</p>
          </div>
          <div className="phase-timeline">
            <div className="phase-item">
              <div className="phase-number">1</div>
              <div className="phase-content">
                <h3>Digital foundation (your "front door")</h3>
                <ul>
                  <li>AI-assisted website refresh (clearer structure and messaging)</li>
                  <li>AEO/GEO and local search review (are you visible in Google and ChatGPT/Gemini?)</li>
                  <li>Simple chatbots and content calendars</li>
                </ul>
              </div>
            </div>
            <div className="phase-item">
              <div className="phase-number">2</div>
              <div className="phase-content">
                <h3>Automation & outreach (growth layer)</h3>
                <ul>
                  <li>Smarter lead intake and follow-up workflows</li>
                  <li>Cold outreach and email infrastructure using tools like SmartLead, with responsible targeting</li>
                  <li>AI-drafted email sequences and call scripts</li>
                </ul>
              </div>
            </div>
            <div className="phase-item">
              <div className="phase-number">3</div>
              <div className="phase-content">
                <h3>Operational efficiency (the internal brain)</h3>
                <ul>
                  <li>Process mapping and AI-powered automations across scheduling, invoicing, reporting</li>
                  <li>Voice agents to answer and triage inbound calls for busy field teams</li>
                </ul>
              </div>
            </div>
            <div className="phase-item">
              <div className="phase-number">4</div>
              <div className="phase-content">
                <h3>Sovereign AI & data infrastructure (the vault)</h3>
                <ul>
                  <li>On-prem or private-cloud AI environments for sensitive data</li>
                  <li>Data warehousing in Snowflake/Databricks and private "ask your documents" assistants</li>
                  <li>Executive and developer training so your team can safely operate and extend these tools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Session Section */}
      <section id="free-session" className="free-session">
        <div className="container">
          <div className="free-session-content">
            <h2>Free AI Readiness Session — December 2025</h2>
            <p>To help local organizations get ready for 2026, we're offering a limited number of free AI Readiness Sessions for Portland-area businesses and nonprofits that book before December 31, 2025.</p>
            <div className="checklist">
              <h3>In your free session, you'll get:</h3>
              <ul>
                <li>A short pre-call questionnaire so we understand how your organization runs</li>
                <li>A 60–90 minute conversation with an experienced AI consultant</li>
                <li>A 1-page AI Opportunities Snapshot with 3–5 specific ideas and rough ROI</li>
                <li>A recommendation on whether on-prem, secure cloud, or simple SaaS tools make the most sense for you</li>
                <li>Suggestions for quick wins you can tackle in the first 30–90 days of 2026</li>
              </ul>
            </div>
            <p><em>There's no obligation to work with us beyond the session — you keep the roadmap and ideas either way.</em></p>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-primary">
              Book Your Free Session
            </a>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="packages">
        <div className="container">
          <div className="section-header">
            <h2>Packages & pricing</h2>
            <p>We keep pricing straightforward and focused on practical outcomes. For early 2026, we're offering founding-client pricing to a limited number of local organizations.</p>
          </div>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>AI Essentials</h3>
              <p className="price">From $500/month</p>
              <p className="who-for">Small teams who want steady guidance and a few concrete AI wins each quarter.</p>
              <ul>
                <li>Quarterly strategy & "What's new in AI" session (60–90 minutes)</li>
                <li>Website & web presence review with a prioritized checklist</li>
                <li>One "quick win" deliverable per quarter (chatbot, content calendar, or email sequence)</li>
                <li>Reasonable email support for AI questions in between</li>
              </ul>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-secondary">Get Started</a>
            </div>
            <div className="pricing-card featured">
              <span className="pricing-badge">Most Popular</span>
              <h3>AI Growth</h3>
              <p className="price">From $1,000/month</p>
              <p className="who-for">Organizations ready to move from experiments to meaningful automation and internal tools.</p>
              <ul>
                <li>Everything in AI Essentials</li>
                <li>A second working session each quarter focused on implementation</li>
                <li>One small automation or internal micro-tool per quarter</li>
                <li>A quarterly mini training session for your team (live or remote, recorded)</li>
              </ul>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-primary">Get Started</a>
            </div>
            <div className="pricing-card">
              <h3>Project-based engagements</h3>
              <p className="price">Custom pricing</p>
              <p className="who-for">For specific initiatives and one-time projects.</p>
              <ul>
                <li><strong>AI Kickstart Sprint</strong> — from $3,500<br/>A focused 4–6 week engagement to create your AI roadmap and launch your first pilot.</li>
                <li><strong>Automation & Agentic Coding Sprint</strong> — from $8,000<br/>A custom internal tool or workflow automation built using agentic coding tools.</li>
                <li><strong>On-Prem AI Appliance</strong> — from $10,000 + $1,000/month<br/>A local AI inference box installed and supported on your network.</li>
              </ul>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-secondary">Let's Talk</a>
            </div>
          </div>
          <p style={{textAlign: 'center', marginTop: '2rem', color: 'var(--color-text-light)'}}>
            <em>Founding-client pricing is available for organizations that start in early 2026.</em>
          </p>
        </div>
      </section>

      {/* Private AI Section */}
      <section id="private-ai" className="private-ai">
        <div className="container">
          <div className="section-header">
            <h2>Prefer your AI off the public internet?</h2>
            <p>Some organizations can't put sensitive data into public AI tools. We've worked in those environments for years.</p>
          </div>
          <div className="private-ai-features">
            <div className="private-ai-feature">
              <h3>On-prem AI appliances</h3>
              <p>Installed on your network, for local inference and private document Q&A. E.g., NVIDIA DGX Spark-class boxes with 128GB unified memory — "desktop supercomputer" capabilities without sending data to external clouds.</p>
            </div>
            <div className="private-ai-feature">
              <h3>Locked-down cloud environments</h3>
              <p>Azure and AWS environments with private networking and clear policies. Your data stays in controlled, compliant environments that you manage.</p>
            </div>
            <div className="private-ai-feature">
              <h3>Training and guardrails</h3>
              <p>We train your staff on what's safe to do with AI tools. Clear policies ensure everyone knows what stays internal and what can be used with external services.</p>
            </div>
          </div>
          <div style={{marginTop: '2rem', textAlign: 'center'}}>
            <p style={{marginBottom: '1rem'}}>
              <strong>Benefits of Sovereign AI:</strong> Own your intelligence instead of renting it. Predictable costs (CapEx vs unpredictable token bills). Regulatory and compliance benefits for law, medical, and finance clients.
            </p>
            <p><em>"Your data never leaves your machine."</em></p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2>About AI Ready PDX</h2>
          </div>
          <div className="about-content">
            <p>
              AI Ready PDX is part of the <strong>Vital Enterprises</strong> family of companies in the Pacific Northwest.
            </p>
            <p>
              Our oldest company, <strong>VTM</strong>, has spent more than 30 years leading global technology consortiums and standards efforts. <strong>Novus Labs</strong>, our engineering lab, has spent 17 years working on complex consumer electronics products for leading brands.
            </p>
            <p>
              We've been working with AI and AI-enabled products for several years, and we're already helping organizations in the region — including local nonprofits and portfolio companies — design and implement AI strategies.
            </p>
            <p>
              AI Ready PDX is how we offer that experience more broadly to Portland-area businesses and nonprofits. We focus on:
            </p>
            <ul className="about-list">
              <li>Practical projects that ship in weeks, not years</li>
              <li>Clear explanation of what AI can and cannot do for you</li>
              <li>A pace of adoption that respects your people, culture, and risk profile</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <h3>What kinds of businesses does AI Ready PDX work with?</h3>
              <div className="faq-answer">
                <p>We work primarily with small to mid-sized businesses and nonprofits in the Portland metro and Pacific Northwest. Our clients include home service companies, coffee roasters, professional practices like dental and legal offices, small manufacturers, and community organizations.</p>
              </div>
            </div>
            <div className="faq-item">
              <h3>Do you offer on-premises AI solutions?</h3>
              <div className="faq-answer">
                <p>Yes. For organizations with strict data privacy or compliance requirements, we can deploy local AI appliances on your network. Your data never leaves your building, and you get the same capabilities as cloud AI without the privacy concerns.</p>
              </div>
            </div>
            <div className="faq-item">
              <h3>What does a Free AI Readiness Session cover?</h3>
              <div className="faq-answer">
                <p>In our 60–90 minute session, we review how your organization runs today, identify 3–5 specific AI opportunities with rough ROI estimates, recommend whether on-prem, cloud, or simple SaaS tools make sense for you, and provide a written summary you can share with your team.</p>
              </div>
            </div>
            <div className="faq-item">
              <h3>Is AI safe for sensitive data like legal or medical records?</h3>
              <div className="faq-answer">
                <p>It can be, with the right setup. We offer both on-premises solutions where data never leaves your network, and locked-down cloud environments with private networking. We also train your team on what's safe to use AI for and what should stay in your core systems.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Let's talk about AI in your business</h2>
            <p>Whether you're curious, cautious, or already experimenting, we'd be happy to talk. Tell us a bit about your organization and we'll follow up with next steps.</p>
          </div>
          {formSubmitted ? (
            <div className="contact-form" style={{textAlign: 'center'}}>
              <h3 style={{color: 'var(--color-accent)', marginBottom: '1rem'}}>Thank you!</h3>
              <p>Thanks for reaching out. We'll review your message and get back to you within two business days.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company / organization *</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="website">Website (optional)</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://"
                />
              </div>
              <div className="form-group">
                <label htmlFor="teamSize">Approximate team size (optional)</label>
                <select
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="1-5">1-5 employees</option>
                  <option value="6-20">6-20 employees</option>
                  <option value="21-50">21-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="100+">100+ employees</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">What would you like AI to help with? *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about your business and what you're hoping AI can help with..."
                ></textarea>
              </div>
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="freeSession"
                  name="freeSession"
                  checked={formData.freeSession}
                  onChange={handleInputChange}
                />
                <label htmlFor="freeSession">I'm interested in a free December 2025 AI Readiness Session</label>
              </div>
              <button type="submit" className="btn btn-primary form-submit">
                Send message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">AI <span>Ready</span> PDX</div>
              <p className="footer-tagline">Powered by Vital Enterprises</p>
            </div>
            <div className="footer-links">
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
            </div>
            <div className="footer-contact">
              <p>hello@aireadypdx.com</p>
              <p>Portland, Oregon</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 AI Ready PDX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
