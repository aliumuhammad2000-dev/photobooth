import WorkCard from '../home/WorkCard';
import type { WorkPreview } from '../../types/portfolio';

interface PortfolioGridProps {
  works: WorkPreview[];
}

function PortfolioGrid({ works }: PortfolioGridProps) {
  if (works.length === 0) {
    return (
      <div className="rounded-sm border border-brand/20 bg-surface/50 px-6 py-16 text-center">
        <p className="text-lg text-cream">No projects match this category yet.</p>
        <p className="mt-3 text-sm text-soft">
          Try another filter to explore the available demonstrations.
        </p>
      </div>
    );
  }

  return (
    <div aria-live="polite" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  );
}

export default PortfolioGrid;
