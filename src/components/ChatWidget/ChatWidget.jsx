import { useState, useRef, useEffect } from 'react';
import { ChatIcon, CloseIcon, SendIcon } from './chatIcons';
import './ChatWidget.css';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', email: '', interest: '' });
  const [conversationId, setConversationId] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    // Add user message
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmedInput,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setConversationId(data.conversationId);

      // Check if we should show lead capture form
      if (data.shouldCaptureLead && !leadCaptured) {
        setShowLeadForm(true);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again or reach out to us at hello@aireadypdx.com.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email || !leadData.interest) return;

    try {
      // Send lead data with current conversation
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          conversationId,
          leadData,
        }),
      });

      setLeadCaptured(true);
      setShowLeadForm(false);

      // Add confirmation message
      const confirmMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Thanks, ${leadData.name}! We've got your info and someone from our team will reach out soon. Feel free to keep chatting or ask any other questions.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, confirmMessage]);
    } catch (error) {
      console.error('Lead capture error:', error);
    }
  };

  const handleLeadInputChange = (e) => {
    const { name, value } = e.target;
    setLeadData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="chat-widget">
      {/* Floating trigger button */}
      <button
        className={`chat-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          <header className="chat-header">
            <h3>AI Ready PDX</h3>
            <span className="chat-status">Online</span>
          </header>

          <div className="chat-messages">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="chat-welcome">
                <h4>Got questions about AI for your business?</h4>
                <p>Ask me about our services, pricing, or how AI can help your organization.</p>
              </div>
            )}

            {/* Message list */}
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.role}`}>
                {msg.content}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            {/* Lead capture form */}
            {showLeadForm && !leadCaptured && (
              <form className="lead-form" onSubmit={handleLeadSubmit}>
                <h4>Want us to follow up?</h4>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={leadData.name}
                  onChange={handleLeadInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={leadData.email}
                  onChange={handleLeadInputChange}
                  required
                />
                <select
                  name="interest"
                  value={leadData.interest}
                  onChange={handleLeadInputChange}
                  required
                >
                  <option value="">What are you interested in?</option>
                  <option value="AI Strategy">AI Strategy & Roadmaps</option>
                  <option value="Automation">Automation & Agents</option>
                  <option value="Marketing">Marketing & Outreach</option>
                  <option value="Training">Training & Enablement</option>
                  <option value="Private AI">Confidential/Private AI</option>
                  <option value="Not Sure">Not sure yet</option>
                </select>
                <div className="lead-form-buttons">
                  <button type="submit">Send my info</button>
                  <button type="button" className="skip" onClick={() => setShowLeadForm(false)}>
                    Maybe later
                  </button>
                </div>
              </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about our services..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !inputValue.trim()}>
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
