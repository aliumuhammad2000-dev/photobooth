import { Link } from 'react-router';
import type { PhotographyService, ServiceLayout, ServicePlaceholderTone } from '../../types/services';

interface ServiceCardProps {
  service: PhotographyService;
  bookingPath: string;
}

const layoutClasses: Record<ServiceLayout, string> = {
  wide: 'sm:col-span-2 lg:col-span-7',
  standard: 'lg:col-span-5',
  compact: 'lg:col-span-4',
};

const aspectClasses: Record<ServiceLayout, string> = {
  wide: 'aspect-[4/3]',
  standard: 'aspect-[4/3]',
  compact: 'aspect-square',
};

const placeholderClasses: Record<ServicePlaceholderTone, string> = {
  sage: 'bg-gradient-to-br from-brand/70 via-surface to-canvas',
  linen: 'bg-gradient-to-br from-cream/55 via-brand/30 to-surface',
  shadow: 'bg-gradient-to-br from-surface via-canvas to-brand/40',
  moss: 'bg-gradient-to-tr from-canvas via-brand/45 to-surface',
  stone: 'bg-gradient-to-bl from-surface via-soft/25 to-canvas',
  clay: 'bg-gradient-to-br from-brand/45 via-surface to-canvas',
};

function ServiceCard({ service, bookingPath }: ServiceCardProps) {
  const { media } = service;

  return (
    <article
      className={`relative overflow-hidden rounded-sm bg-surface ${layoutClasses[service.layout]}`}
    >
      <Link
        aria-label={`${service.ctaLabel}: ${service.name}`}
        className="group block h-full rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
        to={bookingPath}
      >
        <div className={`relative overflow-hidden ${aspectClasses[service.layout]}`}>
          {media.kind === 'photograph' ? (
            <img
              alt={media.imageAlt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              src={media.imageSrc}
              style={{ objectPosition: media.imagePosition ?? 'center' }}
            />
          ) : (
            <div
              aria-hidden="true"
              className={`absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03] ${placeholderClasses[media.tone]}`}
            >
              <div className="absolute -right-12 top-8 h-44 w-44 rounded-full border border-cream/20 bg-cream/10 blur-sm" />
              <div className="absolute bottom-[-4rem] left-[-2rem] h-56 w-56 rounded-full bg-canvas/35 blur-2xl" />
            </div>
          )}

          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-canvas/10 to-transparent" />
          <p className="absolute left-5 top-5 text-xs font-semibold tracking-[0.24em] text-brand sm:left-6 sm:top-6">
            {service.number}
          </p>
          {media.kind === 'placeholder' && (
            <p className="absolute bottom-5 right-5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-soft/80 sm:bottom-6 sm:right-6">
              Demonstration visual
            </p>
          )}
        </div>

        <div className="border-t border-brand/15 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-cream sm:text-3xl">
            {service.name}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-soft sm:text-base">
            {service.description}
          </p>
          <span className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-[0.18em] text-brand transition-colors group-hover:text-cream">
            {service.ctaLabel}
            <span aria-hidden="true" className="ml-3 text-base">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

export default ServiceCard;
