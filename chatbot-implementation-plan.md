# AI Ready PDX Chatbot Widget Implementation Plan

## Overview

Add a Claude-powered chat widget to the AI Ready PDX website that:
- Floats in the lower-right corner (persistent on scroll)
- Answers questions about company services, pricing, and approach
- Captures qualified leads via email notification (through Resend)
- Uses Haiku by default, escalates to Sonnet for complex questions

---

## File Structure

```
src/
├── components/
│   └── ChatWidget/
│       ├── ChatWidget.jsx     # Main component (~250 lines)
│       ├── ChatWidget.css     # Widget styles
│       └── chatIcons.jsx      # SVG icons (Chat, Send, Close)
├── App.jsx                    # Add <ChatWidget /> import
├── index.css                  # Add chat CSS variables
api/
├── contact.js                 # (existing)
└── chat.js                    # NEW: Claude API handler
```

---

## Implementation Steps

### Step 1: Install Anthropic SDK
```bash
npm install @anthropic-ai/sdk
```
Add `ANTHROPIC_API_KEY` to Vercel environment variables.

### Step 2: Create `/api/chat.js` Serverless Function

**Responsibilities:**
- Receive messages from frontend
- Call Claude API with system prompt
- Detect lead capture triggers
- Send lead notification emails via Resend
- Handle model escalation (Haiku → Sonnet)
- Rate limiting (20 requests/minute per IP)

**Request format:**
```json
{
  "messages": [{ "role": "user", "content": "..." }],
  "conversationId": "uuid",
  "useAdvancedModel": false,
  "leadData": { "name": "...", "email": "...", "interest": "..." } | null
}
```

**Model escalation triggers:**
- Keywords: on-prem, confidential, HIPAA, compliance, architecture, integration
- Strategic questions: compare, recommend, pros and cons
- Question length > 300 chars or 2+ questions
- Conversation depth > 5 messages

### Step 3: Create ChatWidget Component

**State:**
- `isOpen` - widget expanded/collapsed
- `messages[]` - conversation history
- `inputValue` - current input
- `isLoading` - awaiting response
- `showLeadForm` - display lead capture
- `leadCaptured` - form submitted

**UI Structure:**
1. Floating trigger button (teal, 60px circle)
2. Chat window (380x520px, slides up on open)
3. Header with "AI Ready PDX" + online status
4. Messages area with user/assistant bubbles
5. Input form with send button
6. Inline lead capture form (name, email, interest dropdown)

**Lead capture triggers:**
- 3+ message exchanges + intent signals ("pricing", "book", "interested")
- Response suggests next steps + user shows interest

### Step 4: System Prompt (Key Guardrails)

The system prompt includes:
- Company overview (Vital Enterprises, 30+ years)
- Services and pricing details
- Target client industries
- Voice/tone guidelines (calm, grounded, no hype)
- **Guardrails:**
  - Stay on-topic (redirect off-topic questions politely)
  - Don't make up information
  - No code writing or technical tutorials
  - Only quote documented prices
  - Never commit to timelines/guarantees
  - Suggest human contact for complex project discussions

### Step 5: Add CSS Variables to index.css

```css
:root {
  --chat-width: 380px;
  --chat-height: 520px;
  --chat-trigger-size: 60px;
  --chat-border-radius: 16px;
  --chat-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  --chat-z-index: 9999;
}
```

### Step 6: Mobile Responsiveness

At `@media (max-width: 480px)`:
- Chat window: full width, 85vh height
- Bottom-anchored with rounded top corners
- Trigger button: 56px

### Step 7: Integrate into App.jsx

Add at end of component (after `</footer>`):
```jsx
import ChatWidget from './components/ChatWidget/ChatWidget'
// ...
<ChatWidget />
```

---

## Security Measures

1. **API key**: Server-side only via Vercel env vars
2. **Rate limiting**: 20 requests/min per IP (in-memory Map)
3. **Input sanitization**: Strip HTML, limit to 2000 chars
4. **Conversation cap**: Max 50 messages
5. **Token budget**: max_tokens: 500 per response

---

## Lead Notification Email

When lead is captured, send via Resend to pbrown@vital-enterprises.com:
- Subject: `[Chat Lead] {name} - {interest}`
- Body: name, email, interest, timestamp, last 3 conversation exchanges
- Reply-to set to lead's email

---

## Files to Modify/Create

| File | Action |
|------|--------|
| `api/chat.js` | CREATE - Claude API handler |
| `src/components/ChatWidget/ChatWidget.jsx` | CREATE - Main component |
| `src/components/ChatWidget/ChatWidget.css` | CREATE - Styles |
| `src/components/ChatWidget/chatIcons.jsx` | CREATE - SVG icons |
| `src/App.jsx` | MODIFY - Import and add `<ChatWidget />` |
| `src/index.css` | MODIFY - Add CSS variables |
| `package.json` | MODIFY - Add @anthropic-ai/sdk |

---

## Cost Estimate

- **Haiku**: ~$0.001 per response (simple queries)
- **Sonnet**: ~$0.015 per response (complex queries)
- Estimated 80% Haiku / 20% Sonnet usage
- At 100 conversations/day (avg 5 messages): ~$5-10/month
