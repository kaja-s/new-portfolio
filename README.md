# Kaja Skerlj - Portfolio Website

A modern, animated portfolio website showcasing product design work with a track and field inspired visual design.

## Features

- 🎨 Track lanes animation that intensifies on scroll
- ⌨️ Press 'C' to copy email address
- 🎬 Smooth animations and transitions using Framer Motion
- 📱 Fully responsive design
- ⚡ Built with Next.js 15, React, TypeScript, and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kaja-s/new-portfolio.git
cd new-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy!

### Environment Variables (Optional)

For email signup functionality with Loops:

```
NEXT_PUBLIC_LOOPS_API_KEY=your_loops_api_key
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Vercel
- **Email Signup:** Loops (optional)

## Design System

### Colors
- Red: `#FB461F`
- Black: `#1E1E1E`
- White: `#FFFFFF`

### Typography
- Title: Lay Grotesk (fallback: system sans-serif)
- Text: Space Mono (monospace)

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main page composition
│   └── globals.css     # Global styles and theme
├── components/
│   ├── TrackLanes.tsx       # Animated background
│   ├── IntroSection.tsx     # Hero section
│   ├── WorkSection.tsx      # Portfolio projects
│   ├── BlogSection.tsx      # Blog posts
│   ├── ExperienceSection.tsx # Timeline
│   ├── AboutSection.tsx     # About with image reveals
│   ├── EmailSignup.tsx      # Newsletter signup
│   └── Footer.tsx           # Footer
└── public/             # Static assets
```

## License

© 2025 Kaja Skerlj. All rights reserved.
