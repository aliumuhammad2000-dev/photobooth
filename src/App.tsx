import { Route, Routes, useLocation } from 'react-router';
import Navbar from './components/layout/Navbar';
import { routePaths } from './data/routes';
import { foundationContent } from './data/site';

function FoundationHome() {
  return (
    <main className="flex flex-1 items-center justify-center bg-canvas px-5 py-12 sm:px-8 lg:px-12">
      <section className="w-full max-w-2xl text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:tracking-[0.3em]">
          {foundationContent.eyebrow}
        </p>

        <h1 className="text-5xl font-semibold tracking-tight text-cream sm:text-7xl">
          {foundationContent.brand}
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-soft sm:text-lg">
          {foundationContent.description}
        </p>

        <p className="mt-10 text-xs font-medium uppercase tracking-[0.16em] text-brand sm:tracking-[0.22em]">
          {foundationContent.label}
        </p>
      </section>
    </main>
  );
}

interface PlaceholderPageProps {
  title: string;
}

function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="flex flex-1 items-center justify-center bg-canvas px-5 py-16 sm:px-8 lg:px-12">
      <section className="w-full max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:tracking-[0.3em]">
          Photobooth
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-cream sm:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-soft sm:text-lg">
          This page is part of the next stage of the Photobooth experience.
        </p>
      </section>
    </main>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar key={location.pathname} />
      <div className="flex flex-1 flex-col">
        <Routes>
          <Route element={<FoundationHome />} path={routePaths.home} />
          <Route
            element={<PlaceholderPage title="Portfolio" />}
            path={routePaths.portfolio}
          />
          <Route
            element={<PlaceholderPage title="Services" />}
            path={routePaths.services}
          />
          <Route element={<PlaceholderPage title="About" />} path={routePaths.about} />
          <Route
            element={<PlaceholderPage title="Contact" />}
            path={routePaths.contact}
          />
          <Route
            element={<PlaceholderPage title="Book a Session" />}
            path={routePaths.bookSession}
          />
          <Route element={<PlaceholderPage title="Page not found" />} path="*" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
