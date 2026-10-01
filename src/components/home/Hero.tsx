import { Link } from 'react-router';
import { heroContent } from '../../data/hero';

function Hero() {
  const {
    eyebrow,
    headline,
    description,
    primaryAction,
    secondaryAction,
    imageSrc,
    imageAlt,
  } = heroContent;

  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-height relative flex flex-1 overflow-hidden bg-canvas"
    >
      {imageSrc ? (
        <img
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-[72%_center] sm:object-[75%_center] lg:object-center"
          fetchPriority="high"
          src={imageSrc}
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-surface via-canvas to-canvas"
          />
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/20 blur-3xl"
          />
        </>
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-canvas/95 via-canvas/75 to-canvas/20"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-end px-5 py-16 sm:px-8 sm:py-20 lg:items-center lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <p className="animate-[hero-reveal_700ms_ease-out_both] text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:text-sm sm:tracking-[0.34em]">
            {eyebrow}
          </p>

          <h1
            className="mt-5 max-w-3xl animate-[hero-reveal_900ms_ease-out_100ms_both] text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-cream sm:text-7xl lg:text-8xl"
            id="hero-heading"
          >
            {headline}
          </h1>

          <p className="mt-7 max-w-xl animate-[hero-reveal_900ms_ease-out_200ms_both] text-base leading-relaxed text-soft sm:text-lg lg:text-xl">
            {description}
          </p>

          <div className="mt-9 flex flex-col gap-3 animate-[hero-reveal_900ms_ease-out_300ms_both] sm:flex-row sm:items-center">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              to={primaryAction.to}
            >
              {primaryAction.label}
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand/60 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-brand hover:bg-brand/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              to={secondaryAction.to}
            >
              {secondaryAction.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
