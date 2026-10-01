import { routePaths } from './routes';
import type { SelectedWorksContent, WorkPreview } from '../types/portfolio';

export const selectedWorksContent: SelectedWorksContent = {
  eyebrow: 'CURATED PORTFOLIO',
  heading: 'Selected Works',
  description:
    'A collection of moments, stories, and perspectives captured through the lens.',
  assetNote:
    'Demonstration compositions shown until approved portfolio photography is connected.',
  ctaLabel: 'View All Works',
  ctaTo: routePaths.portfolio,
};

export const selectedWorks: WorkPreview[] = [
  {
    id: 'quiet-light-study',
    slug: 'quiet-light-study',
    title: 'Quiet Light Study',
    category: 'Portraits',
    layout: 'feature',
    placeholderTone: 'sage',
  },
  {
    id: 'soft-gathering-study',
    slug: 'soft-gathering-study',
    title: 'Soft Gathering Study',
    category: 'Events',
    layout: 'portrait',
    placeholderTone: 'linen',
  },
  {
    id: 'after-rain-study',
    slug: 'after-rain-study',
    title: 'After Rain Study',
    category: 'Lifestyle',
    layout: 'landscape',
    placeholderTone: 'shadow',
  },
  {
    id: 'form-and-stillness-study',
    slug: 'form-and-stillness-study',
    title: 'Form & Stillness Study',
    category: 'Fashion',
    layout: 'compact',
    placeholderTone: 'moss',
  },
  {
    id: 'open-air-study',
    slug: 'open-air-study',
    title: 'Open Air Study',
    category: 'Weddings',
    layout: 'compact',
    placeholderTone: 'stone',
  },
];
