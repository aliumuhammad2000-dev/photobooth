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
│       ├── about/    # Photographer portrait
│       └── portfolio/ # Category-matched portfolio and service photography
├── components/
│   ├── about/        # About-page presentation components
│   ├── home/         # Homepage sections
│   ├── portfolio/    # Reusable portfolio filters, grids, and media
│   ├── services/     # Photography service cards and grids
│   └── layout/       # Shared layout components
├── data/             # Centralized content and configuration
├── pages/            # Portfolio, project, services, and About page views
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
- Responsive Selected Works gallery with typed photography and conditional placeholders
- Filterable `/portfolio` page
- Dynamic `/portfolio/:slug` project pages with not-found handling
- `/services` page with six typed photography offerings
- Reusable Behind the Lens homepage section and dedicated `/about` page
- Shared typed About content and route configuration for homepage/About CTAs
- Global reduced-motion and responsive base styles

Planned:

- Full-screen project lightbox
- Booking form and enquiry flow
- Photographer dashboard and authentication

Booking, authentication, and dashboard functionality are not implemented yet.

### Behind the Lens and About

The homepage Behind the Lens section and `/about` page share the typed content source in `src/data/about.ts`. The local `src/assets/images/about/me-photography.png` asset is imported there as the photographer portrait, so both views render the same image and the placeholder caption is removed. The photographer's name and verified biography details still require confirmation. The About page's Book a Session CTA leads to the existing placeholder route; no booking form or API is implemented.

### Photography services

The `/services` page presents Wedding, Portrait, Event, Fashion, Commercial, and Lifestyle Photography. Service content is configured in `src/data/services.ts` and uses the discriminated media type to connect the matching local files from `src/assets/images/portfolio/`; no dedicated `src/assets/images/services/` folder was present. Package prices, inclusions, and availability are not confirmed, so the page only displays the enquiry note: “Packages and custom quotations are available upon enquiry.” Service links currently lead to the existing booking placeholder. Future service-detail pages and a functional booking flow are not implemented.

### Selected Works photography

The Selected Works section and portfolio pages use the five matching files in `src/assets/images/portfolio/` for Portraits, Events, Lifestyle, Fashion, and Weddings. The Commercial file is used for the matching service because there is no existing Commercial project record; no fabricated project was added. `WorkPreview` is a discriminated union: photograph entries provide `kind: 'photograph'`, `imageSrc`, and meaningful `imageAlt`, while any future unmatched entry can retain `kind: 'placeholder'`. Project detail routes are implemented, but full-screen lightboxes remain a future milestone.

### Adding and optimizing photography

Images inside `src/assets` are imported into TypeScript data files so Vite can fingerprint them, verify the paths during the build, and emit optimized production URLs. Add a new file to the matching folder, import it in the relevant data source, and change only that entry's discriminated media object to `kind: 'photograph'` with an accurate `imageAlt`; the existing components and routes will render it automatically. The current PNGs range from about 160 KB to 1.1 MB. No destructive optimization was performed and originals were preserved; WebP or AVIF derivatives would be a reasonable future optimization, especially for the 1.1 MB Lifestyle image.

### Hero photography

The approved Hero photograph is stored at `src/assets/images/hero-photograph.png` and imported by `src/data/hero.ts`. The unrelated starter graphic at `src/assets/hero.png` is not used. When `imageSrc` is unset, the Hero falls back to the Slate & Sage gradient. The hero photograph is an AI-generated demonstration image, not a photograph of an actual client session.
