# Photobooth

Photobooth is a cinematic photography website for one photographer. The experience will combine editorial portfolio layouts, project galleries, photography services, and a thoughtful booking journey.

## Technology stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4

## Getting started

Use Node.js and npm, then install the project dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

## Development commands

```bash
npm run dev       # Start the Vite development server
npm run build     # Type-check and create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build locally
```

## Project structure

```text
src/
├── assets/
│   └── images/       # Photography assets used by the website
├── components/
│   ├── home/         # Homepage sections
│   └── layout/       # Shared layout components
├── data/             # Centralized content and configuration
├── pages/            # Page-level views
├── types/            # Shared TypeScript types
├── App.tsx           # Application entry component
├── index.css         # Tailwind theme and global styles
└── main.tsx          # React and browser entry point
```

## Development status

Implemented:

- React, TypeScript, Vite, and Tailwind CSS v4 foundation
- Slate & Sage color system
- Responsive homepage foundation
- Responsive Navbar with React Router navigation
- Full-screen cinematic Hero with typed content configuration
- Global reduced-motion and responsive base styles

Planned:

- Editorial masonry portfolio
- Individual project galleries
- Photography services and booking flow
- Photographer dashboard and authentication

Booking, authentication, and dashboard functionality are not implemented yet.

### Hero photography

The synchronized starter asset at `src/assets/hero.png` is an unrelated graphic and is intentionally not used. Add the approved local photograph at `src/assets/images/hero-photograph.jpg`, then set `imageSrc` in `src/data/hero.ts` to its imported path. Until then, the Hero uses its Slate & Sage fallback background.
