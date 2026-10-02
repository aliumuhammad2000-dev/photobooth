import { routePaths } from './routes';
import eventImage from '../assets/images/portfolio/event-photography.png';
import fashionImage from '../assets/images/portfolio/fashion-photography.png';
import lifestyleImage from '../assets/images/portfolio/lifestyle-photography.png';
import portraitImage from '../assets/images/portfolio/portrait-photography.png';
import weddingImage from '../assets/images/portfolio/wedding-photography.png';
import type { SelectedWorksContent, WorkPreview } from '../types/portfolio';

export const selectedWorksContent: SelectedWorksContent = {
  eyebrow: 'CURATED PORTFOLIO',
  heading: 'Selected Works',
  description:
    'A collection of moments, stories, and perspectives captured through the lens.',
  assetNote:
    'A selection of photography across portraits, events, lifestyle, fashion, and weddings.',
  ctaLabel: 'View All Works',
  ctaTo: routePaths.portfolio,
};

export const selectedWorks: WorkPreview[] = [
  {
    kind: 'photograph',
    id: 'quiet-light-study',
    slug: 'quiet-light-study',
    title: 'Quiet Light Study',
    category: 'Portraits',
    layout: 'feature',
    imageSrc: portraitImage,
    imageAlt: 'Close black-and-white portrait of an older woman wearing a patterned headscarf',
    imagePosition: 'center',
  },
  {
    kind: 'photograph',
    id: 'soft-gathering-study',
    slug: 'soft-gathering-study',
    title: 'Soft Gathering Study',
    category: 'Events',
    layout: 'portrait',
    imageSrc: eventImage,
    imageAlt: 'Audience seated at an event while a panel presents on stage',
    imagePosition: 'center',
  },
  {
    kind: 'photograph',
    id: 'after-rain-study',
    slug: 'after-rain-study',
    title: 'After Rain Study',
    category: 'Lifestyle',
    layout: 'landscape',
    imageSrc: lifestyleImage,
    imageAlt: 'People gathered beneath string lights in a lively evening street scene',
    imagePosition: 'center',
  },
  {
    kind: 'photograph',
    id: 'form-and-stillness-study',
    slug: 'form-and-stillness-study',
    title: 'Form & Stillness Study',
    category: 'Fashion',
    layout: 'compact',
    imageSrc: fashionImage,
    imageAlt: 'Three children posing outdoors in coordinated caps and clothing',
    imagePosition: 'center',
  },
  {
    kind: 'photograph',
    id: 'open-air-study',
    slug: 'open-air-study',
    title: 'Open Air Study',
    category: 'Weddings',
    layout: 'compact',
    imageSrc: weddingImage,
    imageAlt: 'Newly married couple embracing beneath a translucent veil',
    imagePosition: 'center',
  },
];
