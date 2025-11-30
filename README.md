# AI Ready PDX Website

Marketing website for AI Ready PDX, a Vital Enterprises company providing AI consulting services to Portland-area businesses.

## Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** CSS (custom properties for theming)
- **Forms:** Formspree (configure your form ID in `src/App.jsx`)
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

Build output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Configuration

### Contact Form (Formspree)

1. Create a form at [formspree.io](https://formspree.io)
2. Replace `YOUR_FORM_ID` in `src/App.jsx` with your actual form ID:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

### Custom Domain

To deploy to `claude.aireadypdx.com`:

1. Connect this repo to Vercel
2. In Vercel project settings, add custom domain `claude.aireadypdx.com`
3. Update GoDaddy DNS:
   - Add CNAME record: `claude` → `cname.vercel-dns.com`

## Project Structure

```
claude-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx        # Main React component with all sections
│   ├── App.css        # Component-specific styles
│   ├── index.css      # Global styles and CSS variables
│   └── main.jsx       # React entry point
├── index.html         # HTML template with meta tags & schema
├── package.json
├── vite.config.js
└── README.md
```

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Forest Green | `#0B3D2E` | Primary brand color |
| Slate Blue | `#1F3A5F` | Secondary color |
| Teal Accent | `#2BBBAD` | CTAs, accents |
| Warm Neutral | `#F4F1EA` | Backgrounds |
| Dark Grey | `#1E2022` | Body text |

## Documentation

- See `custom-website-build.md` for full content specifications
- See `graphics-prompts.md` for image generation prompts

## License

Private - Vital Enterprises
