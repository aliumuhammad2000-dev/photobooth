import { Link } from 'react-router';
import ServicesGrid from '../components/services/ServicesGrid';
import { photographyServices, servicesPageContent } from '../data/services';

function ServicesPage() {
  const {
    eyebrow,
    heading,
    description,
    pricingNote,
    finalCtaHeading,
    finalCtaDescription,
    finalCtaLabel,
    bookingPath,
  } = servicesPageContent;

  return (
    <main className="flex-1 bg-canvas px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:text-sm sm:tracking-[0.34em]">
            {eyebrow}
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-cream sm:text-7xl">
            {heading}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-soft sm:text-lg">
            {description}
          </p>
          <p className="mt-5 max-w-xl text-xs leading-relaxed text-brand sm:text-sm">
            {pricingNote}
          </p>
        </header>

        <div className="mt-16 sm:mt-24">
          <ServicesGrid bookingPath={bookingPath} services={photographyServices} />
        </div>

        <section className="mt-20 border-t border-brand/20 pt-16 sm:mt-28 sm:pt-20 lg:mt-36 lg:flex lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:text-sm sm:tracking-[0.34em]">
              Start a conversation
            </p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-cream sm:text-6xl">
              {finalCtaHeading}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-soft sm:text-lg">
              {finalCtaDescription}
            </p>
          </div>
          <Link
            className="mt-8 inline-flex min-h-12 items-center justify-center self-start rounded-full bg-brand px-6 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand lg:mt-0"
            to={bookingPath}
          >
            {finalCtaLabel}
          </Link>
        </section>
      </div>
    </main>
  );
}

export default ServicesPage;
