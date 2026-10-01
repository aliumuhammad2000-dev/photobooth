import { routePaths } from './routes';
import type { HeroContent } from '../types/hero';

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
  imageSrc: null,
  imageAlt: 'A cinematic Photobooth portrait',
};
