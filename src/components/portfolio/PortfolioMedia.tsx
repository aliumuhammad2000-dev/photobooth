import type { WorkPreview } from '../../types/portfolio';

interface PortfolioMediaProps {
  work: WorkPreview;
  loading?: 'eager' | 'lazy';
  className?: string;
}

const placeholderClasses = {
  sage: 'bg-gradient-to-br from-brand/70 via-surface to-canvas',
  linen: 'bg-gradient-to-br from-cream/55 via-brand/30 to-surface',
  shadow: 'bg-gradient-to-br from-surface via-canvas to-brand/40',
  moss: 'bg-gradient-to-tr from-canvas via-brand/45 to-surface',
  stone: 'bg-gradient-to-bl from-surface via-soft/25 to-canvas',
} as const;

function PortfolioMedia({ work, loading = 'lazy', className = '' }: PortfolioMediaProps) {
  if (work.kind === 'photograph') {
    return (
      <img
        alt={work.imageAlt}
        className={`object-cover ${className}`}
        loading={loading}
        src={work.imageSrc}
        style={{ objectPosition: work.imagePosition ?? 'center' }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${placeholderClasses[work.placeholderTone]} ${className}`}
    >
      <div className="absolute -right-16 top-8 h-48 w-48 rounded-full border border-cream/20 bg-cream/10 blur-sm" />
      <div className="absolute bottom-[-5rem] left-[-3rem] h-64 w-64 rounded-full bg-canvas/35 blur-2xl" />
    </div>
  );
}

export default PortfolioMedia;
