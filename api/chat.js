import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting (simple in-memory store)
const rateLimits = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

function checkRateLimit(clientIP) {
  const now = Date.now();
  const clientData = rateLimits.get(clientIP);

  if (!clientData || now - clientData.windowStart > RATE_LIMIT_WINDOW) {
    rateLimits.set(clientIP, { windowStart: now, count: 1 });
    return true;
  }

  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  clientData.count++;
  return true;
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .slice(0, 2000);
}

function shouldUseAdvancedModel(messages, currentMessage) {
  const userMessages = messages.filter(m => m.role === 'user');

  // Complex topics requiring deeper reasoning
  const complexTopics = /\b(on-?prem|confidential|air-?gap|compliance|HIPAA|legal|security|infrastructure|integration|migrate|architecture|data warehouse|snowflake|databricks)\b/i;

  // Strategic questions
  const strategicQuestions = /\b(compare|versus|vs|difference between|should (we|I)|recommend|best approach|pros and cons|trade-?offs)\b/i;

  // Long or multi-part questions
  const isLongQuestion = currentMessage.length > 300;
  const isMultiPart = (currentMessage.match(/\?/g) || []).length >= 2;

  // Deep conversation
  const isDeepConversation = userMessages.length >= 5;

  return complexTopics.test(currentMessage) ||
         strategicQuestions.test(currentMessage) ||
         isLongQuestion ||
         isMultiPart ||
         isDeepConversation;
}

function shouldCaptureLead(messages, lastResponse) {
  const userMessages = messages.filter(m => m.role === 'user');
  const messageCount = userMessages.length;

  const intentSignals = /\b(schedule|book|pricing|cost|how much|get started|interested|sign up|contact|talk to|speak with|next step|ready to)\b/i;
  const responseHasNextSteps = /\b(book|schedule|session|reach out|hello@aireadypdx|conversation)\b/i;

  const lastUserMessage = userMessages[userMessages.length - 1]?.content || '';
  const hasIntent = intentSignals.test(lastUserMessage);
  const responseSuggestsAction = responseHasNextSteps.test(lastResponse);

  return (messageCount >= 3 && hasIntent) ||
         (messageCount >= 2 && responseSuggestsAction && hasIntent);
}

async function sendLeadNotification(leadData, messages) {
  const conversationSummary = messages
    .slice(-6)
    .map(m => `${m.role === 'user' ? 'Visitor' : 'AI'}: ${m.content}`)
    .join('\n\n');

  const emailHtml = `
    <h2>New Chat Lead from AI Ready PDX Website</h2>
    <p><strong>Name:</strong> ${leadData.name}</p>
    <p><strong>Email:</strong> ${leadData.email}</p>
    <p><strong>Primary Interest:</strong> ${leadData.interest}</p>
    <p><strong>Captured:</strong> ${new Date().toLocaleString()}</p>

    <h3>Recent Conversation:</h3>
    <pre style="background: #f4f4f4; padding: 15px; border-radius: 8px; white-space: pre-wrap; font-family: monospace;">${conversationSummary}</pre>
  `;

  const emailText = `
New Chat Lead from AI Ready PDX Website

Name: ${leadData.name}
Email: ${leadData.email}
Primary Interest: ${leadData.interest}
Captured: ${new Date().toLocaleString()}

Recent Conversation:
${conversationSummary}
  `.trim();

  await resend.emails.send({
    from: 'AI Ready PDX <onboarding@resend.dev>',
    to: ['pbrown@vital-enterprises.com'],
    replyTo: leadData.email,
    subject: `[Chat Lead] ${leadData.name} - ${leadData.interest}`,
    html: emailHtml,
    text: emailText,
  });
}

const SYSTEM_PROMPT = `You are the AI assistant for AI Ready PDX, an AI consulting firm serving Portland-area businesses and nonprofits. Your role is to answer questions about our services, approach, and pricing in a helpful, conversational manner.

## COMPANY OVERVIEW
AI Ready PDX is part of the Vital Enterprises family, with 30+ years of technology leadership through VTM (global technology consortiums) and Novus Labs (17 years of consumer electronics for Amazon, Google, Microsoft).

## SERVICES WE OFFER
1. **AI Strategy & Roadmaps** - Assess your business, identify high-ROI AI use cases, build 6-12 month roadmaps
2. **Automation & Agents** - Internal tools, smarter scheduling, intake forms, AI-assisted reports
3. **Marketing & Outreach** - Website copy, SEO/AEO optimization, content calendars, ethical cold outreach
4. **Training & Enablement** - Executive briefings, team AI 101, developer bootcamps
5. **Confidential/Private AI** - On-premise AI appliances, air-gapped environments, secure cloud deployments

## PRICING
- **AI Readiness Session**: $50 (normally $500) - 60-90 minute consultation with written AI Opportunities Snapshot
- **AI Training & Quick Wins**: $1,500/quarter - 90 min training, website review, one quick win deliverable
- **AI Deep Dive**: $2,500 one-time - 4 hours total (discovery + recommendations), written roadmap, training session
- **Custom Projects**: Variable pricing for managed services, custom solutions, AI Kickstart Sprints, on-premise deployments

## TARGET CLIENTS
- Small to mid-sized businesses (5-100 employees) in Portland metro/PNW
- Industries: Home services (HVAC, plumbing, landscaping), food/hospitality, professional practices (dental, legal, accounting), civic/education, nonprofits, manufacturing

## VOICE & TONE
- Be calm, competent, and grounded - never hype-driven
- Use plain language, short sentences, concrete examples
- Sound like an experienced tech leader who lives locally and cares about local business
- Never use jargon like "disrupt," "paradigm shift," or "synergy"

## GUARDRAILS - CRITICAL
1. **Stay on topic**: Only answer questions related to AI Ready PDX services, AI in business, or scheduling consultations. Politely redirect off-topic questions.

2. **Don't make up information**: If asked about something you don't have information on, say so and offer to connect them with our team.

3. **No technical implementations**: Don't write code, provide detailed technical tutorials, or act as a general AI assistant.

4. **Competitor questions**: If asked about competitors, focus on what makes us different (local presence, 30+ years experience, practical focus) without disparaging others.

5. **Pricing boundaries**: Only quote the prices listed above. For custom projects, say pricing varies based on scope and suggest a conversation.

6. **Privacy & data**: Never ask for or store sensitive business data. Only collect name, email, and general interest area for lead capture.

7. **Commitments**: Never make commitments about timelines, guarantees, or results. Suggest scheduling a conversation for specific project discussions.

8. **Contact info**: Our email is hello@aireadypdx.com, located in Beaverton, OR (3855 SW 153rd Drive), phone (503) 619-0505.

## WHEN TO SUGGEST HUMAN CONTACT
Recommend speaking with our team when the visitor:
- Has specific project requirements
- Asks detailed technical questions about their unique situation
- Wants to discuss confidential/on-premise AI
- Is ready to schedule an AI Readiness Session
- Has budget or timeline questions for custom work

When suggesting contact, you can mention they can book a $50 AI Readiness Session or reach out at hello@aireadypdx.com.

## EXAMPLE RESPONSES

User: "What services do you offer?"
Assistant: "We help Portland-area businesses adopt AI practically. Our main services include: AI strategy and roadmaps to identify where AI fits your business, automation tools for scheduling and operations, marketing support with AI-optimized content, team training, and private AI solutions for organizations with sensitive data. Would you like details on any of these?"

User: "How much does it cost?"
Assistant: "We have a few options depending on where you are in your AI journey. The AI Readiness Session is $50 (normally $500) for a 60-90 minute consultation with a written summary. Ongoing training is $1,500 per quarter. Our AI Deep Dive is $2,500 for a comprehensive assessment and roadmap. Custom projects are priced based on scope. Which would you like to know more about?"

User: "Can you help me write code for my app?"
Assistant: "I'm here to answer questions about AI Ready PDX's consulting services rather than write code directly. If you're looking for help building AI-powered tools for your business, that's something our team does through custom projects. Would you like to learn more about how we approach those?"`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    const clientIP = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
    }

    const { messages, conversationId, leadData } = req.body;

    // Input validation
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    if (messages.length > 50) {
      return res.status(400).json({ error: 'Conversation too long' });
    }

    // Sanitize messages
    const sanitizedMessages = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: sanitizeInput(m.content)
    }));

    const lastUserMessage = sanitizedMessages.filter(m => m.role === 'user').pop()?.content || '';

    // Select model based on escalation logic
    const useAdvanced = shouldUseAdvancedModel(sanitizedMessages, lastUserMessage);
    const model = useAdvanced
      ? 'claude-sonnet-4-20250514'
      : 'claude-3-5-haiku-20241022';

    // Call Claude API
    const response = await anthropic.messages.create({
      model,
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: sanitizedMessages,
    });

    const assistantMessage = response.content[0].text;

    // Check if lead capture should be triggered
    const shouldCaptureFlag = shouldCaptureLead(sanitizedMessages, assistantMessage);

    // If lead data provided, send notification email
    if (leadData && leadData.email) {
      try {
        await sendLeadNotification(leadData, sanitizedMessages);
      } catch (emailError) {
        console.error('Failed to send lead notification:', emailError);
        // Don't fail the request if email fails
      }
    }

    return res.status(200).json({
      message: assistantMessage,
      conversationId: conversationId || crypto.randomUUID(),
      shouldCaptureLead: shouldCaptureFlag,
      modelUsed: model,
    });

  } catch (error) {
    console.error('Chat API error:', error);

    if (error.status === 429) {
      return res.status(429).json({ error: 'AI service temporarily busy. Please try again.' });
    }

    return res.status(500).json({ error: 'Unable to process your request. Please try again.' });
  }
}
