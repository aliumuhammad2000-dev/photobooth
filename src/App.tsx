import { useLayoutEffect, useRef } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from 'react-router';
import Hero from './components/home/Hero';
import Philosophy from './components/home/Philosophy';
import SelectedWorks from './components/home/SelectedWorks';
import Navbar from './components/layout/Navbar';
import PortfolioPage from './pages/PortfolioPage';
import PortfolioProjectPage from './pages/PortfolioProjectPage';
import ServicesPage from './pages/ServicesPage';
import { routePaths } from './data/routes';

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

function HomePage() {
  return (
    <main className="flex flex-1 flex-col bg-canvas">
      <Hero />
      <Philosophy />
      <SelectedWorks />
    </main>
  );
}

function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef<Record<string, number>>({});
  const currentEntryKey = useRef(location.key);

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      scrollPositions.current[currentEntryKey.current] = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    const nextScrollPosition =
      navigationType === 'POP'
        ? scrollPositions.current[location.key] ?? 0
        : 0;

    window.scrollTo({
      behavior: 'instant',
      left: 0,
      top: nextScrollPosition,
    });
    currentEntryKey.current = location.key;
  }, [location.key, navigationType]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <Navbar key={location.pathname} />
      <ScrollManager />
      <div className="flex min-h-0 flex-1 flex-col">
        <Routes>
          <Route element={<HomePage />} path={routePaths.home} />
          <Route element={<PortfolioPage />} path={routePaths.portfolio} />
          <Route
            element={<PortfolioProjectPage />}
            path={routePaths.portfolioProject}
          />
          <Route element={<ServicesPage />} path={routePaths.services} />
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
