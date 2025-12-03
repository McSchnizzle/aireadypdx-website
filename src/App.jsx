import { useState } from 'react'
import './App.css'
import ChatWidget from './components/ChatWidget/ChatWidget'

// Icons as simple SVG components
const Icons = {
  Award: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
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
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
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
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  const [formError, setFormError] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    setFormLoading(true)

    try {
      const response = await fetch('/api/contact', {
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
          message: '',
          freeSession: false
        })
      } else {
        const data = await response.json()
        setFormError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setFormError('Unable to send message. Please email us directly at hello@aireadypdx.com')
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="nav-logo">
            <img src="/images/logos/logo-nav.png" alt="AI Ready PDX" className="nav-logo-img" />
          </a>
          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#why-us" onClick={(e) => scrollToSection(e, 'why-us')}>Why Us</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>Services</a></li>
            <li><a href="#confidential-ai" onClick={(e) => scrollToSection(e, 'confidential-ai')}>Confidential AI</a></li>
            <li><a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')}>Pricing</a></li>
            <li><a href="#approach" onClick={(e) => scrollToSection(e, 'approach')}>Approach</a></li>
            <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
            <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-primary nav-cta">Book Your $50 Session</a></li>
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
            <h1>2026 is the Year of AI.<br />Let's get you ready.</h1>
            <p className="hero-subheading">
              AI has moved from bleeding edge to business essential. AI Ready PDX, powered by Vital Enterprises' 30+ years of technology leadership, helps Portland-area businesses adopt AI confidently, practically, and securely.
            </p>
            <div className="hero-buttons">
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-primary btn-large">
                Book Your AI Readiness Session — <s>$500</s> $50 <span className="btn-note">(First 100 Clients)</span>
              </a>
            </div>
            <div className="hero-pillars">
              <div className="hero-pillar">
                <div className="pillar-icon">
                  <Icons.Award />
                </div>
                <span>30+ Years Tech Leadership</span>
              </div>
              <div className="hero-pillar">
                <div className="pillar-icon">
                  <Icons.MapPin />
                </div>
                <span>Local Portland Presence</span>
              </div>
              <div className="hero-pillar">
                <div className="pillar-icon">
                  <Icons.Shield />
                </div>
                <span>Privacy-First Options</span>
              </div>
            </div>
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
                We understand how companies actually run: how work gets scheduled, how revenue flows, and where things get stuck. We translate AI into process improvements, not buzzwords.
              </p>
            </div>
            <div className="card why-us-card">
              <div className="icon">
                <Icons.CheckCircle />
              </div>
              <h3>We've already been doing this</h3>
              <p>
                We've been working with AI-enabled products and tools for several years and are already helping organizations in the region design and implement AI strategies.
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

      {/* Services & Industries Table Section */}
      <section id="services" className="services-table-section">
        <div className="container">
          <div className="section-header">
            <h2>How We Help Your Industry</h2>
            <p>AI Ready PDX delivers practical AI solutions tailored to your industry. From marketing to confidential AI deployments, we match the right solutions to your specific needs.</p>
          </div>
          <div className="services-table-wrapper">
            <table className="services-table">
              <thead>
                <tr>
                  <th className="service-header"></th>
                  <th>
                    <img src="/images/icons/client-home-services.png" alt="Field Services" className="industry-icon" />
                    <span>Field Services</span>
                    <small>HVAC, Plumbing, Landscaping</small>
                  </th>
                  <th>
                    <img src="/images/icons/client-food.png" alt="Retail & Hospitality" className="industry-icon" />
                    <span>Retail & Hospitality</span>
                    <small>Coffee, Restaurants, Shops</small>
                  </th>
                  <th>
                    <img src="/images/icons/client-professional.png" alt="Professional Practices" className="industry-icon" />
                    <span>Professional Practices</span>
                    <small>Dental, Legal, Accounting</small>
                  </th>
                  <th>
                    <img src="/images/icons/client-civic.png" alt="Civic & Education" className="industry-icon" />
                    <span>Civic & Education</span>
                    <small>Schools, Churches,<br />Public Safety</small>
                  </th>
                  <th>
                    <img src="/images/icons/client-nonprofit.png" alt="Community Organizations" className="industry-icon" />
                    <span>Community Orgs</span>
                    <small>Nonprofits</small>
                  </th>
                  <th>
                    <img src="/images/icons/client-manufacturing.png" alt="Manufacturers & Distributors" className="industry-icon" />
                    <span>Manufacturing</span>
                    <small>Machinery, Fabrication, Assembly</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="service-category">
                  <td colSpan="7">
                    <img src="/images/icons/service-marketing.png" alt="Marketing" className="category-icon" />
                    Marketing & Sales
                  </td>
                </tr>
                <tr>
                  <td className="service-name">Web presence (SEO, AEO/GEO)</td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                </tr>
                <tr>
                  <td className="service-name">Content & collateral</td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                </tr>
                <tr>
                  <td className="service-name">Outreach (email, voice, social)</td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td></td>
                </tr>
                <tr className="service-category">
                  <td colSpan="7">
                    <img src="/images/icons/service-automation.png" alt="Operations" className="category-icon" />
                    Operations
                  </td>
                </tr>
                <tr>
                  <td className="service-name">Scheduling & intake</td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                </tr>
                <tr>
                  <td className="service-name">Inventory & supply chain</td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><span className="check"><Icons.Check /></span></td>
                </tr>
                <tr>
                  <td className="service-name">Process automation</td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                </tr>
                <tr className="service-category">
                  <td colSpan="7">
                    <img src="/images/icons/service-strategy.png" alt="Management" className="category-icon" />
                    Management
                  </td>
                </tr>
                <tr>
                  <td className="service-name">Dashboards & analytics</td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                </tr>
                <tr>
                  <td className="service-name">Reporting & insights</td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                </tr>
                <tr className="service-category confidential-category">
                  <td colSpan="7">
                    <img src="/images/icons/service-confidential.png" alt="Confidential AI" className="category-icon" />
                    Confidential AI
                  </td>
                </tr>
                <tr>
                  <td className="service-name">On-premise deployment</td>
                  <td></td>
                  <td></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td></td>
                  <td><span className="check"><Icons.Check /></span></td>
                </tr>
                <tr>
                  <td className="service-name">Private cloud inference</td>
                  <td></td>
                  <td></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td><span className="check"><Icons.Check /></span></td>
                  <td></td>
                  <td><span className="check"><Icons.Check /></span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Confidential AI Section */}
      <section id="confidential-ai" className="confidential-ai">
        <div className="container">
          <div className="confidential-ai-content">
            <div className="confidential-ai-text">
              <h2>Need to Keep Your AI Off the Public Internet?</h2>
              <p>
                For organizations with sensitive data (legal, medical, financial, or proprietary), we offer on-premise and air-gapped solutions where your data never leaves your building. Ask us about Confidential AI options.
              </p>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-secondary">
                Learn About Confidential AI
              </a>
            </div>
            <div className="confidential-ai-icon">
              <Icons.Shield />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - 4 Tiers */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2>Pricing</h2>
            <p>Clear, practical pricing with options for every stage of your AI journey.</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>AI Readiness Session</h3>
              <p className="price"><s>$500</s> <strong>$50</strong></p>
              <p className="price-note">90% off for first 100 clients</p>
              <ul>
                <li>60-90 minute consultation</li>
                <li>Custom recommendations</li>
                <li>AI Opportunities Snapshot document</li>
              </ul>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-primary">Book Now</a>
            </div>
            <div className="pricing-card">
              <h3>AI Training & Quick Wins</h3>
              <p className="price">$1,500<span>/quarter</span></p>
              <ul>
                <li>90 minutes training (1 session or 2x 45-min)</li>
                <li>Website & web presence review</li>
                <li>One "quick win" deliverable per quarter</li>
                <li>Email support between sessions</li>
              </ul>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-secondary">Get Started</a>
            </div>
            <div className="pricing-card featured">
              <span className="pricing-badge">Most Popular</span>
              <h3>AI Deep Dive</h3>
              <p className="price">$2,500<span> one-time</span></p>
              <ul>
                <li>2 hours: Deep dive into your business</li>
                <li>2 hours: Recommendations presentation</li>
                <li>Written roadmap/deliverable</li>
                <li>Includes 90-minute training session</li>
                <li>Execute yourself or engage us for projects</li>
              </ul>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-primary">Get Started</a>
            </div>
            <div className="pricing-card">
              <h3>Execution & Projects</h3>
              <p className="price">Custom</p>
              <p className="price-note">Variable based on scope</p>
              <ul>
                <li><strong>Managed Services:</strong> We run your marketing—content, posting, analytics</li>
                <li><strong>Custom Solutions:</strong> AI applications and integrations</li>
                <li><strong>AI Kickstart Sprint:</strong> Roadmap + first pilot</li>
                <li><strong>On-Premise AI:</strong> Air-gapped deployment</li>
              </ul>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn btn-secondary">Let's Talk</a>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section - Simplified */}
      <section id="approach" className="approach">
        <div className="container">
          <div className="section-header">
            <h2>Our Approach</h2>
            <p>A clear path from assessment to results.</p>
          </div>
          <div className="approach-phases">
            <div className="approach-phase">
              <div className="phase-icon">
                <Icons.Search />
              </div>
              <h3>Assess</h3>
              <ul>
                <li>AI Readiness Assessment</li>
                <li>Website AI Audit (SEO, AEO, GEO)</li>
                <li>Opportunity identification</li>
                <li>Technology stack review</li>
                <li>Privacy & security evaluation</li>
              </ul>
            </div>
            <div className="approach-phase">
              <div className="phase-icon">
                <Icons.Users />
              </div>
              <h3>Train & Plan</h3>
              <ul>
                <li>Executive AI briefings</li>
                <li>Team training sessions</li>
                <li>Roadmap development</li>
                <li>Ongoing strategy support</li>
                <li>Quarterly State of AI updates</li>
              </ul>
            </div>
            <div className="approach-phase">
              <div className="phase-icon">
                <Icons.Settings />
              </div>
              <h3>Implement</h3>
              <ul>
                <li>Chatbots & voice agents</li>
                <li>Content automation tools</li>
                <li>Cold outreach systems</li>
                <li>Custom AI applications</li>
                <li>Secure on-premise AI</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="about" className="faq">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            <div className={`faq-item ${openFaq === 0 ? 'open' : ''}`} onClick={() => toggleFaq(0)}>
              <h3>Who is AI Ready PDX?</h3>
              <div className="faq-answer">
                <p>AI Ready PDX is part of Vital Enterprises, with 30+ years leading global technology consortiums and 17 years building complex products for leading brands. We help Portland-area businesses and nonprofits adopt AI practically—projects that ship in weeks, clear explanations of what AI can do, and a pace that respects your culture.</p>
              </div>
            </div>
            <div className={`faq-item ${openFaq === 1 ? 'open' : ''}`} onClick={() => toggleFaq(1)}>
              <h3>What kinds of businesses do you work with?</h3>
              <div className="faq-answer">
                <p>We work primarily with small to mid-sized businesses and nonprofits in the Portland metro and Pacific Northwest. Our clients include home service companies, coffee roasters, professional practices like dental and legal offices, small manufacturers, and community organizations.</p>
              </div>
            </div>
            <div className={`faq-item ${openFaq === 2 ? 'open' : ''}`} onClick={() => toggleFaq(2)}>
              <h3>Do you offer on-premise AI solutions?</h3>
              <div className="faq-answer">
                <p>Yes. For organizations with strict data privacy or compliance requirements, we can deploy local AI appliances on your network. Your data never leaves your building, and you get the same capabilities as cloud AI without the privacy concerns.</p>
              </div>
            </div>
            <div className={`faq-item ${openFaq === 3 ? 'open' : ''}`} onClick={() => toggleFaq(3)}>
              <h3>What does an AI Readiness Session cover?</h3>
              <div className="faq-answer">
                <p>In our 60-90 minute session (just $50 for the first 100 clients), we review how your organization runs today, identify 3-5 specific AI opportunities with rough ROI estimates, recommend whether on-premise, cloud, or simple SaaS tools make sense for you, and provide a written AI Opportunities Snapshot you can share with your team.</p>
              </div>
            </div>
            <div className={`faq-item ${openFaq === 4 ? 'open' : ''}`} onClick={() => toggleFaq(4)}>
              <h3>Is AI safe for sensitive data like legal or medical records?</h3>
              <div className="faq-answer">
                <p>It can be, with the right setup. We offer both on-premise solutions where data never leaves your network, and locked-down cloud environments with private networking. We also train your team on what's safe to use AI for and what should stay in your core systems.</p>
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
                <label htmlFor="freeSession">I'm interested in a $50 AI Readiness Session (90% off for first 100 clients)</label>
              </div>
              {formError && (
                <div className="form-error">
                  {formError}
                </div>
              )}
              <button type="submit" className="btn btn-primary form-submit" disabled={formLoading}>
                {formLoading ? 'Sending...' : 'Send message'}
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
              <img src="/images/logos/logo-full.png" alt="AI Ready PDX" className="footer-logo-img" />
              <p className="footer-tagline">Powered by Vital Enterprises</p>
            </div>
            <div className="footer-contact">
              <p><a href="mailto:hello@aireadypdx.com">hello@aireadypdx.com</a></p>
              <p>3855 SW 153rd Drive, Beaverton, OR</p>
              <p><a href="tel:+15036190505">(503) 619-0505</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 AI Ready PDX. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export default App
