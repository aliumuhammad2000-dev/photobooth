import type { PlaceholderTone, WorkLayout, WorkPreview } from '../../types/portfolio';

interface WorkCardProps {
  work: WorkPreview;
}

const layoutClasses: Record<WorkLayout, string> = {
  feature: 'sm:col-span-2 lg:col-span-7 lg:row-span-2',
  portrait: 'lg:col-span-5 lg:row-span-2',
  landscape: 'lg:col-span-5',
  compact: 'lg:col-span-3',
};

const placeholderClasses: Record<PlaceholderTone, string> = {
  sage: 'bg-gradient-to-br from-brand/70 via-surface to-canvas',
  linen: 'bg-gradient-to-br from-cream/55 via-brand/30 to-surface',
  shadow: 'bg-gradient-to-br from-surface via-canvas to-brand/40',
  moss: 'bg-gradient-to-tr from-canvas via-brand/45 to-surface',
  stone: 'bg-gradient-to-bl from-surface via-soft/25 to-canvas',
};

const aspectClasses: Record<WorkLayout, string> = {
  feature: 'aspect-[4/5] lg:aspect-auto lg:min-h-[42rem]',
  portrait: 'aspect-[4/5] lg:aspect-auto lg:min-h-[42rem]',
  landscape: 'aspect-[16/10] lg:aspect-[16/11]',
  compact: 'aspect-[4/5]',
};

function WorkCard({ work }: WorkCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-sm bg-surface ${layoutClasses[work.layout]}`}
    >
      <div className={`relative h-full w-full ${aspectClasses[work.layout]}`}>
        {work.imageSrc ? (
          <img
            alt={work.imageAlt ?? ''}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            src={work.imageSrc}
            style={{ objectPosition: work.imagePosition ?? 'center' }}
          />
        ) : (
          <div
            aria-hidden="true"
            className={`absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03] ${placeholderClasses[work.placeholderTone]}`}
          >
            <div className="absolute -right-16 top-8 h-48 w-48 rounded-full border border-cream/20 bg-cream/10 blur-sm" />
            <div className="absolute bottom-[-5rem] left-[-3rem] h-64 w-64 rounded-full bg-canvas/35 blur-2xl" />
          </div>
        )}

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
          <p className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-soft/80">
            Demonstration placeholder
          </p>
        </div>
      </div>
    </article>
  );
}

export default WorkCard;
