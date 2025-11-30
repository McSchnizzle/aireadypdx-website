# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Ready PDX marketing website - a single-page React application for an AI consulting firm serving Portland-area businesses and nonprofits.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build to /dist
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

**Tech Stack:** React 18 + Vite + CSS custom properties

**Single-component design:** The entire site lives in `src/App.jsx` (~620 lines) as one monolithic component with all sections:
- Navigation (sticky with mobile hamburger)
- Hero, Why Us, Who We Help, Services, Approach, Free Session, Packages, Private AI, About, FAQ, Contact, Footer

**State:** Three useState hooks only - `mobileMenuOpen`, `formData`, `formSubmitted`

**Icons:** Inline SVG components defined within App.jsx (no icon library)

**Styling:** Two CSS files:
- `src/index.css` - Design system (CSS variables, typography, global styles)
- `src/App.css` - Component styles and animations

**Forms:** Formspree integration - requires form ID configuration in `src/App.jsx` (search for `YOUR_FORM_ID`)

## Design System (CSS Variables)

```css
--color-primary: #0B3D2E    /* Deep Forest Green */
--color-secondary: #1F3A5F  /* Slate Blue */
--color-accent: #2BBBAD     /* Teal */
--color-background: #F4F1EA /* Warm Neutral */
--color-text: #1E2022       /* Dark Grey */
```

Font: Inter from Google Fonts with system-ui fallback

## Key Files

- `src/App.jsx` - All content and functionality
- `src/index.css` - Design system and CSS variables
- `custom-website-build.md` - Brand guidelines, positioning, full content specifications
- `graphics-prompts.md` - AI image generation prompts with folder structure

## Brand Voice

- Calm, competent, grounded - not hype-driven
- Plain language, practical outcomes
- "Pacific Northwest Modern Tech" aesthetic
- Avoid jargon like "disrupt," "paradigm shift," "synergy"
