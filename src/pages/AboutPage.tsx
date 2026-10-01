import { Link } from 'react-router';
import PortraitVisual from '../components/about/PhotographerPortrait';
import { aboutContent } from '../data/about';

function AboutPage() {
  const { page, creativeValues, portrait } = aboutContent;

  return (
    <main className="flex-1 bg-canvas px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:text-sm sm:tracking-[0.34em]">
            {page.eyebrow}
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-cream sm:text-7xl">
            {page.heading}
          </h1>
        </header>

        <section className="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-20">
          <PortraitVisual portrait={portrait} />
          <div className="max-w-2xl">
            <p className="text-xl leading-relaxed text-cream sm:text-3xl sm:leading-snug">
              {page.introduction}
            </p>
            <p className="mt-8 border-l border-brand/50 pl-5 text-sm leading-relaxed text-brand">
              {page.biographyNote}
            </p>
          </div>
        </section>

        <section aria-labelledby="creative-approach-heading" className="mt-24 border-t border-brand/20 pt-16 sm:mt-32 sm:pt-20 lg:mt-40">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:text-sm sm:tracking-[0.34em]">
              THE CREATIVE APPROACH
            </p>
            <h2
              className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-cream sm:text-6xl"
              id="creative-approach-heading"
            >
              {page.creativeHeading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-soft sm:text-lg">
              {page.creativeDescription}
            </p>
          </div>

          <div className="mt-12 grid gap-0 border-y border-brand/20 sm:grid-cols-3">
            {creativeValues.map((value) => (
              <article key={value.id} className="border-b border-brand/20 py-7 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
                <h3 className="font-serif text-3xl tracking-[-0.03em] text-cream">{value.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-soft">{value.description}</p>
              </article>
            ))}
          </div>
        </section>

        <nav aria-label="About page actions" className="mt-16 flex flex-col gap-4 sm:mt-20 sm:flex-row">
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            to={aboutContent.portfolioCtaTo}
          >
            {aboutContent.portfolioCtaLabel}
          </Link>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand/60 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-brand hover:bg-brand/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            to={aboutContent.bookingCtaTo}
          >
            {aboutContent.bookingCtaLabel}
          </Link>
        </nav>
      </div>
    </main>
  );
}

export default AboutPage;
