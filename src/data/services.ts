import { routePaths } from './routes';
import type { PhotographyService, ServicesPageContent } from '../types/services';

export const servicesPageContent: ServicesPageContent = {
  eyebrow: 'WHAT WE OFFER',
  heading: 'Photography for every story.',
  description:
    'From intimate portraits to unforgettable celebrations, we bring care, creativity, and intention to every frame.',
  pricingNote: 'Packages and custom quotations are available upon enquiry.',
  finalCtaHeading: "Let's create something worth remembering.",
  finalCtaDescription:
    "Have a story in mind? Tell us what you're envisioning, and let's explore how to bring it to life.",
  finalCtaLabel: 'Book a Session',
  bookingPath: routePaths.bookSession,
};

export const photographyServices: PhotographyService[] = [
  {
    id: 'wedding-photography',
    slug: 'wedding-photography',
    number: '01',
    name: 'Wedding Photography',
    description:
      'Thoughtfully documenting the emotion, details, and unforgettable moments that make your wedding story unique.',
    layout: 'wide',
    media: { kind: 'placeholder', tone: 'sage' },
    ctaLabel: 'Enquire About This Service',
  },
  {
    id: 'portrait-photography',
    slug: 'portrait-photography',
    number: '02',
    name: 'Portrait Photography',
    description:
      'Expressive portraits that celebrate personality, confidence, and the beauty of being yourself.',
    layout: 'standard',
    media: { kind: 'placeholder', tone: 'linen' },
    ctaLabel: 'Enquire About This Service',
  },
  {
    id: 'event-photography',
    slug: 'event-photography',
    number: '03',
    name: 'Event Photography',
    description:
      'Capturing the atmosphere, connections, and defining moments of gatherings worth remembering.',
    layout: 'standard',
    media: { kind: 'placeholder', tone: 'shadow' },
    ctaLabel: 'Enquire About This Service',
  },
  {
    id: 'fashion-photography',
    slug: 'fashion-photography',
    number: '04',
    name: 'Fashion Photography',
    description:
      'Bold, considered imagery that brings creative concepts, style, and visual identity to life.',
    layout: 'compact',
    media: { kind: 'placeholder', tone: 'moss' },
    ctaLabel: 'Enquire About This Service',
  },
  {
    id: 'commercial-photography',
    slug: 'commercial-photography',
    number: '05',
    name: 'Commercial Photography',
    description:
      'Purposeful photography that helps businesses communicate their products, people, and brand story.',
    layout: 'compact',
    media: { kind: 'placeholder', tone: 'stone' },
    ctaLabel: 'Enquire About This Service',
  },
  {
    id: 'lifestyle-photography',
    slug: 'lifestyle-photography',
    number: '06',
    name: 'Lifestyle Photography',
    description:
      'Natural, authentic imagery celebrating everyday experiences and meaningful human connections.',
    layout: 'compact',
    media: { kind: 'placeholder', tone: 'clay' },
    ctaLabel: 'Enquire About This Service',
  },
];
