import { Link } from 'react-router';
import { aboutContent } from '../../data/about';
import PortraitVisual from '../about/PhotographerPortrait';

function BehindTheLens() {
  const { eyebrow, heading, description, ctaLabel, ctaTo } = aboutContent.homepage;

  return (
    <section
      aria-labelledby="behind-the-lens-heading"
      className="bg-surface px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-20">
        <PortraitVisual portrait={aboutContent.portrait} />
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:text-sm sm:tracking-[0.34em]">
            {eyebrow}
          </p>
          <h2
            className="mt-6 max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-cream sm:text-7xl"
            id="behind-the-lens-heading"
          >
            {heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-soft sm:text-lg">
            {description}
          </p>
          <Link
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            to={ctaTo}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BehindTheLens;
