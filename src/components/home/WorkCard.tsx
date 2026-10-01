import { Link } from 'react-router';
import PortfolioMedia from '../portfolio/PortfolioMedia';
import { getPortfolioProjectPath } from '../../data/routes';
import type { WorkLayout, WorkPreview } from '../../types/portfolio';

interface WorkCardProps {
  work: WorkPreview;
}

const layoutClasses: Record<WorkLayout, string> = {
  feature: 'sm:col-span-2 lg:col-span-7',
  portrait: 'lg:col-span-5',
  landscape: 'lg:col-span-6',
  compact: 'lg:col-span-3',
};

const aspectClasses: Record<WorkLayout, string> = {
  feature: 'aspect-[4/5]',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[16/11]',
  compact: 'aspect-[4/5]',
};

function WorkCard({ work }: WorkCardProps) {
  return (
    <article
      className={`relative overflow-hidden rounded-sm bg-surface ${layoutClasses[work.layout]}`}
    >
      <Link
        aria-label={`${work.title}, ${work.category}`}
        className="group block h-full rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        to={getPortfolioProjectPath(work.slug)}
      >
        <div className={`relative h-full w-full ${aspectClasses[work.layout]}`}>
          <PortfolioMedia
            className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            work={work}
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-canvas/95 via-canvas/10 to-transparent"
          />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
              {work.category}
            </p>
            <h3 className="mt-2 max-w-xs text-2xl font-semibold tracking-[-0.03em] text-cream sm:text-3xl">
              {work.title}
            </h3>
            {work.kind === 'placeholder' && (
              <p className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-soft/80">
                Demonstration placeholder
              </p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default WorkCard;
