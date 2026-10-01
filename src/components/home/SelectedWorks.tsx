import { Link } from 'react-router';
import WorkCard from './WorkCard';
import { selectedWorks, selectedWorksContent } from '../../data/selectedWorks';

function SelectedWorks() {
  const { eyebrow, heading, description, assetNote, ctaLabel, ctaTo } =
    selectedWorksContent;

  return (
    <section
      aria-labelledby="selected-works-heading"
      className="bg-canvas px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:text-sm sm:tracking-[0.34em]">
              {eyebrow}
            </p>
            <h2
              className="mt-6 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-cream sm:text-7xl"
              id="selected-works-heading"
            >
              {heading}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-soft sm:text-lg">
              {description}
            </p>
            <p className="mt-5 max-w-lg text-xs leading-relaxed text-brand sm:text-sm">
              {assetNote}
            </p>
          </div>

          <Link
            className="inline-flex min-h-12 shrink-0 items-center justify-center self-start rounded-full border border-brand/60 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-brand hover:bg-brand/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand lg:self-auto"
            to={ctaTo}
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-12 lg:items-start">
          {selectedWorks.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SelectedWorks;
