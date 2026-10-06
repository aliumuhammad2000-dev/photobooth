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
│   ├── booking/      # Enquiry form and review components
│   ├── home/         # Homepage sections
│   ├── portfolio/    # Reusable portfolio filters, grids, and media
│   ├── services/     # Photography service cards and grids
│   └── layout/       # Shared layout components
├── data/             # Centralized content and configuration
├── mock/             # JSON Server seed data and local database
├── scripts/          # Local development setup scripts
├── pages/            # Portfolio, project, services, About, and booking views
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
- `/book-session` photography enquiry form with validation, service preselection, review/edit flow, clipboard export, and development-only mock submission
- Separate typed Fetch API service with loading, success, error, and duplicate-submission protection
- Local JSON Server REST API for fictional enquiry records
- Development-only `/dashboard` for reading, searching, filtering, updating, and deleting fictional enquiries
- Global reduced-motion and responsive base styles

Planned:

- Full-screen project lightbox
- Secure production enquiry delivery and live availability
- Real photographer dashboard and authentication

Secure production enquiry delivery, live availability, authentication, and dashboard functionality are not implemented yet. The current submission flow is only a local development demonstration.

### Booking enquiry experience

The `/book-session` page collects a full name, email, optional phone number, photography service, preferred date, optional time and location, and required additional details. Required fields, email format, local-calendar date rules, and text lengths are validated in `src/utils/bookingValidation.ts`; invalid fields keep their values, expose accessible error text, and focus the first correction needed.

Photography service cards link to `/book-session?service=<slug>` using the existing `photographyServices` data and a centralized route helper. Unknown slugs are ignored safely. A valid enquiry moves to a review step where visitors can edit their details, copy a readable plain-text enquiry with the Clipboard API, or—during local development—select **Submit Demo Enquiry**.

The review submission uses `src/services/enquiryApi.ts` as a small API layer. It sends a native `fetch('/api/enquiries', { method: 'POST', ... })` request through the Vite proxy. The service adds `status: 'new'` and an ISO `createdAt` value, checks `response.ok`, parses the JSON response, and validates the returned record at runtime before the UI displays success. JSON Server v1 creates the final record ID, so the browser uses the ID returned by the server.

`BookingForm` keeps one explicit submission status: `idle`, `loading`, `success`, or `error`. The submit button is disabled during loading, which prevents rapid duplicate POST requests. The client does not automatically retry a failed POST because a lost response could mean the server saved the record even though the browser did not receive the response. A visitor can retry manually after checking the result.

The success view says that the fictional record was saved locally, but does not claim that an email was sent, availability was reserved, or a booking was confirmed. It offers a deliberate reset for a new demonstration. Failed requests keep all entered values and show a helpful message. Clipboard text distinguishes an unsent enquiry from one already saved as a local demo record. No form data is stored in localStorage or sessionStorage.

The mock submission button and development notice are guarded by Vite's `import.meta.env.DEV`. Production builds keep the review-and-copy experience but do not display a functional mock submission control. There is no Web3Forms integration, real backend, email provider, payment flow, or live calendar yet.

### Behind the Lens and About

The homepage Behind the Lens section and `/about` page share the typed photographer profile in `src/data/about.ts`. The profile introduces Femi Leah as a Photographer & Visual Storyteller based in Surulere, with approved biography, creative philosophy, and specialties centralized in the typed About content. The local `src/assets/images/about/me-photography.png` asset is imported there as a descriptive, unclaimed photographer image; its alt text does not identify the person shown as Femi Leah. The About page's Book a Session CTA opens the frontend-only enquiry form; no server-side submission or booking API is implemented.

### Photography services

The `/services` page presents Wedding, Portrait, Event, Fashion, Commercial, and Lifestyle Photography. Service content is configured in `src/data/services.ts` and uses the discriminated media type to connect the matching local files from `src/assets/images/portfolio/`; no dedicated `src/assets/images/services/` folder was present. Package prices, inclusions, and availability are not confirmed, so the page only displays the enquiry note: “Packages and custom quotations are available upon enquiry.” Service links now open the frontend booking enquiry with the matching service preselected. Future service-detail pages and server-side enquiry delivery are not implemented.

### Mock REST API for frontend development

Photobooth uses JSON Server as a small local REST API simulator. It lets the booking flow and future React dashboard practice real HTTP requests without adding a production backend yet. The booking form submits only fictional development records.

Install dependencies, create the writable database from the committed fictional seed, and start the two development servers in separate terminals:

```bash
npm install
npm run mock:setup
npm run mock:api     # JSON Server at http://127.0.0.1:3001
npm run dev          # React/Vite at the port printed by Vite, normally http://localhost:5173
```

`mock/db.seed.json` contains only fictional development records. `mock/db.json` is created by `mock:setup`, is writable by JSON Server, and is ignored by Git so local test changes stay local. The setup script never overwrites an existing database; delete `mock/db.json` manually when you intentionally want to recreate it from the seed.

The API contract is:

| Method | Frontend URL | Purpose |
|---|---|---|
| GET | `/api/enquiries` | Retrieve all enquiries |
| GET | `/api/enquiries/:id` | Retrieve one enquiry |
| POST | `/api/enquiries` | Create an enquiry |
| PATCH | `/api/enquiries/:id` | Update enquiry details or status |
| DELETE | `/api/enquiries/:id` | Delete a demonstration enquiry |

The `/api` URLs are Vite development-proxy paths. Vite removes `/api` and forwards requests to JSON Server, whose underlying routes are `/enquiries` and `/enquiries/:id`. If JSON Server is not running, these proxy requests fail; the static production build does not include or deploy JSON Server.

For example, PowerShell can create a fictional test enquiry with:

```powershell
$body = @{
  id = "powershell-demo-001"
  fullName = "PowerShell Demo Client"
  email = "powershell-demo@example.com"
  phone = ""
  serviceSlug = "event-photography"
  preferredDate = "2027-08-12"
  preferredTime = "11:00"
  location = "Demo Conference Hall"
  details = "Fictional API test record."
  status = "new"
  createdAt = "2026-10-05T09:00:00.000Z"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://127.0.0.1:3001/enquiries" -Method Post -ContentType "application/json" -Body $body
```

The writable JSON file means test changes survive a JSON Server restart. JSON Server has no real authentication or authorization, and TypeScript types only describe what the frontend expects—they do not secure or validate arbitrary requests. Do not store real enquiries in this mock API; a later production system would require a real protected backend.

#### Testing the booking POST

Use two terminals:

```bash
npm run mock:setup
npm run mock:api
```

```bash
npm run dev
```

Open `/book-session`, enter fictional values, review them, and select **Submit Demo Enquiry**. The browser sends a JSON body containing the booking fields plus `status: "new"` and `createdAt`. A successful response appears in `mock/db.json`, and the returned ID is shown in the success view. Stop JSON Server to test the error state; the form stays intact, and restarting the server allows a deliberate manual retry.

To inspect the request in Chrome, open DevTools with `F12`, choose **Network**, filter to **Fetch/XHR**, then submit the demo enquiry. Select the `/api/enquiries` request to inspect its POST method, URL, JSON payload, response status, response JSON, and timing. The browser sees `/api/enquiries` because that is Vite's development path; Vite removes `/api` and forwards the request to JSON Server's `/enquiries` route. A stopped JSON Server appears as a failed network request from the browser.

The mock request is intentionally not a production booking system. A real backend would own IDs, timestamps, authentication, authorization, server-side validation, privacy controls, and delivery to the photographer. The future dashboard can consume the same `/api/enquiries` resource shape during development, but production will require a secure deployed API.

### Development enquiry dashboard

The `/dashboard` route is a frontend-development demonstration for learning REST API integration. It is rendered only when Vite's `import.meta.env.DEV` is true, so production builds fall through to the normal not-found page. It is intentionally absent from the public Navbar. The visible notice, “Development dashboard — fictional local enquiry data only,” is a reminder that JSON Server has no authentication, authorization, or production security. No fake login or authentication layer is included.

Start the mock API and frontend in separate terminals:

```bash
npm run mock:setup
npm run mock:api
npm run dev
```

Then open `/dashboard`. The page fetches all records once with `GET /api/enquiries`, validates every returned record at runtime, and derives Total, New, Contacted, and Booked counts from the loaded collection. It sorts newest records first by `createdAt` without mutating React state. Status filters and case-insensitive search by name, email, or resolved service name run entirely in the browser, so changing them does not make extra API requests. The dashboard resolves `serviceSlug` through `src/data/services.ts`; an unknown slug safely displays as “Unknown service.”

Selecting a record reveals its complete details, including optional phone, time, location, preserved detail whitespace, status, readable dates, timestamp, and demo record ID. Calendar dates are formatted without timezone conversion; exact `createdAt` timestamps are formatted using the browser's locale and timezone. Status changes use `PATCH /api/enquiries/:id` with only `{ "status": "contacted" }`-style payload data. The UI waits for the confirmed server response before updating local state, keeps the original status when the request fails, and shows a retryable error. Deletion uses an accessible inline confirmation, then `DELETE /api/enquiries/:id`; successful deletion removes the record from state without reloading. The API service handles successful empty DELETE responses without calling `response.json()`, because `204 No Content` has no JSON body to parse.

The dashboard has intentional loading, error, empty, and no-filter-match states. If the API is stopped, it shows a helpful message and a Retry button. If the API returns `[]`, it explains that fictional records submitted through `/book-session` will appear after a new submission. The layout is mobile-first: cards remain readable on narrow screens, while larger screens use a master/detail layout. Buttons, labels, focus styles, live regions, status feedback, and keyboard-operable delete confirmation support accessible use.

#### Inspecting dashboard requests in Chrome

Open DevTools with `F12`, select **Network**, filter to **Fetch/XHR**, and use the dashboard. Select a request to inspect its Request URL, Request Method, Status Code, Payload, Response, and Timing:

- `GET /api/enquiries` loads the dashboard collection.
- `PATCH /api/enquiries/:id` changes one status. In **Payload**, look for `{ "status": "contacted" }`.
- `DELETE /api/enquiries/:id` removes one fictional demo record and normally returns an empty successful response.

The browser uses `/api` because that is Vite's development proxy path. Vite removes `/api` and forwards the request to JSON Server's `/enquiries` or `/enquiries/:id` route. This is CRUD in the actual Photobooth flow: the booking form **creates** with POST, the dashboard **reads** with GET, status management **updates** with PATCH, and the demo delete action **deletes** with DELETE. JSON Server must remain local and must never be deployed as the production backend; a real dashboard will need a protected backend and authentication later.

### Selected Works photography

The Selected Works section and portfolio pages use the five matching files in `src/assets/images/portfolio/` for Portraits, Events, Lifestyle, Fashion, and Weddings. The Commercial file is used for the matching service because there is no existing Commercial project record; no fabricated project was added. `WorkPreview` is a discriminated union: photograph entries provide `kind: 'photograph'`, `imageSrc`, and meaningful `imageAlt`, while any future unmatched entry can retain `kind: 'placeholder'`. Project detail routes are implemented, but full-screen lightboxes remain a future milestone.

### Adding and optimizing photography

Images inside `src/assets` are imported into TypeScript data files so Vite can fingerprint them, verify the paths during the build, and emit optimized production URLs. Add a new file to the matching folder, import it in the relevant data source, and change only that entry's discriminated media object to `kind: 'photograph'` with an accurate `imageAlt`; the existing components and routes will render it automatically. The current PNGs range from about 160 KB to 1.1 MB. No destructive optimization was performed and originals were preserved; WebP or AVIF derivatives would be a reasonable future optimization, especially for the 1.1 MB Lifestyle image.

### Hero photography

The approved Hero photograph is stored at `src/assets/images/hero-photograph.png` and imported by `src/data/hero.ts`. The unrelated starter graphic at `src/assets/hero.png` is not used. When `imageSrc` is unset, the Hero falls back to the Slate & Sage gradient. The hero photograph is an AI-generated demonstration image, not a photograph of an actual client session.
