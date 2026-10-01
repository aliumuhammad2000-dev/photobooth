import type { PhotographerPortrait } from '../../types/about';

interface PhotographerPortraitProps {
  portrait: PhotographerPortrait;
}

const placeholderClasses = {
  sage: 'bg-gradient-to-br from-brand/70 via-surface to-canvas',
  linen: 'bg-gradient-to-br from-cream/55 via-brand/30 to-surface',
  shadow: 'bg-gradient-to-br from-surface via-canvas to-brand/40',
  moss: 'bg-gradient-to-tr from-canvas via-brand/45 to-surface',
  stone: 'bg-gradient-to-bl from-surface via-soft/25 to-canvas',
} as const;

function PhotographerPortraitVisual({ portrait }: PhotographerPortraitProps) {
  if (portrait.kind === 'photograph') {
    return (
      <figure className="relative aspect-[4/5] overflow-hidden bg-surface">
        <img
          alt={portrait.imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
          src={portrait.imageSrc}
          style={{ objectPosition: portrait.imagePosition ?? 'center' }}
        />
      </figure>
    );
  }

  return (
    <figure
      aria-label={portrait.label}
      className={`relative isolate flex aspect-[4/5] items-end overflow-hidden ${placeholderClasses[portrait.tone]}`}
    >
      <div aria-hidden="true" className="absolute -right-16 top-10 h-56 w-56 rounded-full border border-cream/20 bg-cream/10 blur-sm" />
      <div aria-hidden="true" className="absolute bottom-[-5rem] left-[-3rem] h-72 w-72 rounded-full bg-canvas/35 blur-2xl" />
      <figcaption className="relative max-w-xs p-6 text-sm font-semibold uppercase tracking-[0.18em] text-cream">
        {portrait.label}
      </figcaption>
    </figure>
  );
}

export default PhotographerPortraitVisual;
