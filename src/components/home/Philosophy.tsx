import { philosophyContent } from '../../data/philosophy';

function Philosophy() {
  const { eyebrow, heading, description, supportingStatement } =
    philosophyContent;

  return (
    <section
      aria-labelledby="philosophy-heading"
      className="bg-surface px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:gap-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:text-sm sm:tracking-[0.34em]">
            {eyebrow}
          </p>
          <h2
            className="mt-6 max-w-4xl font-serif text-4xl leading-[1.05] tracking-[-0.035em] text-cream sm:text-6xl lg:text-7xl"
            id="philosophy-heading"
          >
            {heading}
          </h2>
        </div>

        <div className="flex flex-col justify-end lg:pb-2">
          <div aria-hidden="true" className="mb-7 h-px w-20 bg-brand" />
          <p className="max-w-xl text-base leading-relaxed text-soft sm:text-lg">
            {description}
          </p>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-brand">
            {supportingStatement}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Philosophy;
