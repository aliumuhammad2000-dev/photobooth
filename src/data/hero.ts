import { routePaths } from './routes';
import type { HeroContent } from '../types/hero';
import heroPhotograph from '../assets/images/hero-photograph.png';

export const heroContent: HeroContent = {
  eyebrow: 'PHOTOGRAPHY · ART · STORYTELLING',
  headline: 'Every moment tells a story.',
  description:
    "Capturing the beauty, emotion, and authenticity of life's most meaningful moments.",
  primaryAction: {
    label: 'Explore Portfolio',
    to: routePaths.portfolio,
  },
  secondaryAction: {
    label: 'Book a Session',
    to: routePaths.bookSession,
  },
  imageSrc: heroPhotograph,
  imageAlt:
    'Elegantly dressed African couple in a cinematic studio portrait with muted sage tones and dark negative space to the left',
};
