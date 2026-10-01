export type ServiceLayout = 'wide' | 'standard' | 'compact';

export type ServicePlaceholderTone =
  | 'sage'
  | 'linen'
  | 'shadow'
  | 'moss'
  | 'stone'
  | 'clay';

interface ServiceMediaBase {
  imagePosition?: string;
}

export interface ServicePlaceholderMedia extends ServiceMediaBase {
  kind: 'placeholder';
  tone: ServicePlaceholderTone;
}

export interface ServicePhotographMedia extends ServiceMediaBase {
  kind: 'photograph';
  imageSrc: string;
  imageAlt: string;
}

export type ServiceMedia =
  | ServicePlaceholderMedia
  | ServicePhotographMedia;

export interface PhotographyService {
  id: string;
  slug: string;
  number: string;
  name: string;
  description: string;
  layout: ServiceLayout;
  media: ServiceMedia;
  ctaLabel: string;
}

export interface ServicesPageContent {
  eyebrow: string;
  heading: string;
  description: string;
  pricingNote: string;
  finalCtaHeading: string;
  finalCtaDescription: string;
  finalCtaLabel: string;
  bookingPath: string;
}
