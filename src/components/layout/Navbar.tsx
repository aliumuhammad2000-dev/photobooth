import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { navigationItems } from '../../data/navigation';

const navigationLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-brand after:transition-transform after:duration-300 hover:text-cream hover:after:scale-x-100 ${
    isActive
      ? 'text-cream after:scale-x-100'
      : 'text-soft after:scale-x-0'
  }`;

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand/15 bg-surface/90 backdrop-blur-md">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12"
      >
        <Link
          className="text-lg font-semibold tracking-[0.2em] text-cream transition-colors hover:text-brand"
          to="/"
          onClick={closeMenu}
        >
          Photobooth
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navigationItems.map((item) => (
            <NavLink
              className={navigationLinkClasses}
              end={item.end}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            className="rounded-full border border-brand bg-brand px-5 py-2.5 text-sm font-semibold text-canvas transition-colors hover:bg-cream hover:text-canvas"
            to="/booking"
          >
            Book a Session
          </Link>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="rounded-md p-2 text-cream transition-colors hover:bg-brand/15 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          {isMenuOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div
          className="border-t border-brand/15 bg-canvas px-5 py-5 md:hidden"
          id="mobile-navigation"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2">
            {navigationItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'bg-brand/15 text-cream'
                      : 'text-soft hover:bg-surface hover:text-cream'
                  }`
                }
                end={item.end}
                key={item.to}
                onClick={closeMenu}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              className="mt-3 rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-canvas transition-colors hover:bg-cream"
              onClick={closeMenu}
              to="/booking"
            >
              Book a Session
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
