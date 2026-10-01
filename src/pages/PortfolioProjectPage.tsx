import { Link, useParams } from 'react-router';
import PortfolioMedia from '../components/portfolio/PortfolioMedia';
import { selectedWorks } from '../data/selectedWorks';
import { routePaths } from '../data/routes';

function PortfolioProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const work = selectedWorks.find((candidate) => candidate.slug === slug);

  if (!work) {
    return (
      <main className="flex flex-1 items-center justify-center bg-canvas px-5 py-20 sm:px-8 lg:px-12">
        <section className="w-full max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:text-sm sm:tracking-[0.3em]">
            Portfolio
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-cream sm:text-6xl">
            Project not found
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-soft sm:text-lg">
            This project does not exist or may have moved.
          </p>
          <Link
            className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full border border-brand/60 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-brand hover:bg-brand/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            to={routePaths.portfolio}
          >
            Back to Portfolio
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-canvas px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <article className="mx-auto w-full max-w-7xl">
        <Link
          className="inline-flex items-center text-sm font-semibold text-soft transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          to={routePaths.portfolio}
        >
          <span aria-hidden="true" className="mr-3 text-brand">
            ←
          </span>
          Back to Portfolio
        </Link>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-end lg:gap-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface sm:aspect-[16/10]">
            <PortfolioMedia className="absolute inset-0 h-full w-full" loading="eager" work={work} />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent" />
            {work.kind === 'placeholder' && (
              <p className="absolute bottom-5 left-5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-soft sm:bottom-6 sm:left-6">
                Demonstration placeholder
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand sm:text-sm sm:tracking-[0.34em]">
              {work.category}
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-cream sm:text-7xl">
              {work.title}
            </h1>
            {work.kind === 'placeholder' ? (
              <p className="mt-7 max-w-xl text-base leading-relaxed text-soft sm:text-lg">
                This demonstration page previews how a selected work can be presented. Approved photography and verified project details will be added in a future content pass.
              </p>
            ) : (
              <p className="mt-7 max-w-xl text-base leading-relaxed text-soft sm:text-lg">
                Approved photography preview.
              </p>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}

export default PortfolioProjectPage;
