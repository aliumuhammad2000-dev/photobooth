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
│   ├── portfolio/    # Reusable portfolio filters, grids, and media
│   ├── services/     # Photography service cards and grids
│   └── layout/       # Shared layout components
├── data/             # Centralized content and configuration
├── pages/            # Portfolio, project, and services page views
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
- Editorial Our Philosophy homepage section
- Responsive Selected Works gallery with typed demonstration placeholder data
- Filterable `/portfolio` page
- Dynamic `/portfolio/:slug` project pages with not-found handling
- `/services` page with six typed photography offerings
- Global reduced-motion and responsive base styles

Planned:

- Approved portfolio photography for the Selected Works cards
- Full-screen project lightbox
- Confirmed service photography and package details
- Booking form and enquiry flow
- Photographer dashboard and authentication

Booking, authentication, and dashboard functionality are not implemented yet.

### Photography services

The `/services` page presents Wedding, Portrait, Event, Fashion, Commercial, and Lifestyle Photography. Service content is configured in `src/data/services.ts` and uses a discriminated media type: demonstration visuals are labeled clearly, while future genuine photographs must provide `imageSrc` and meaningful `imageAlt`. Package prices, inclusions, and availability are not confirmed, so the page only displays the enquiry note: “Packages and custom quotations are available upon enquiry.” Service links currently lead to the existing booking placeholder. Future service-detail pages and a functional booking flow are not implemented.

### Selected Works photography

The Selected Works section and portfolio pages currently use clearly labeled Slate & Sage demonstration placeholders because no additional approved portfolio photographs are available in the repository. `WorkPreview` is a discriminated union: placeholder entries use `kind: 'placeholder'`, while genuine photographs must provide `kind: 'photograph'`, `imageSrc`, and meaningful `imageAlt`. Project detail routes are implemented, but full-screen lightboxes remain a future milestone.

### Hero photography

The approved Hero photograph is stored at `src/assets/images/hero-photograph.png` and imported by `src/data/hero.ts`. The unrelated starter graphic at `src/assets/hero.png` is not used. When `imageSrc` is unset, the Hero falls back to the Slate & Sage gradient. The hero photograph is an AI-generated demonstration image, not a photograph of an actual client session.
