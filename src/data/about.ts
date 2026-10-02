import { routePaths } from './routes';
import photographerImage from '../assets/images/about/me-photography.png';
import type { AboutContent } from '../types/about';

export const aboutContent: AboutContent = {
  homepage: {
    eyebrow: 'BEHIND THE LENS',
    heading: 'The perspective behind every frame.',
    description:
      'Great photography begins with attention—to people, emotion, light, and the moments that often pass unnoticed. Discover the creative approach behind Photobooth.',
    ctaLabel: 'Meet the Photographer',
    ctaTo: routePaths.about,
  },
  page: {
    eyebrow: 'ABOUT PHOTOBOOTH',
    heading: 'Photography with intention.',
    introduction:
      'Photobooth is built around a simple idea: meaningful photographs should preserve more than appearances. They should hold the atmosphere, emotion, and character of a moment.',
    creativeHeading: 'An eye for the moments that matter.',
    creativeDescription:
      'Whether documenting a celebration, creating a portrait, or bringing a visual concept to life, the approach remains thoughtful, collaborative, and attentive to detail.',
    biographyNote:
      "The photographer's name and verified biography details will be added when supplied.",
  },
  portrait: {
    kind: 'photograph',
    imageSrc: photographerImage,
    imageAlt: 'Photographer holding a camera in a softly lit room',
    imagePosition: 'center 45%',
  },
  creativeValues: [
    {
      id: 'connection',
      title: 'Connection',
      description: 'Creating space for genuine expression and meaningful moments.',
    },
    {
      id: 'intention',
      title: 'Intention',
      description: 'Considering the light, composition, and details that shape each photograph.',
    },
    {
      id: 'storytelling',
      title: 'Storytelling',
      description: 'Looking beyond appearances to preserve the feeling of an experience.',
    },
  ],
  portfolioCtaLabel: 'Explore Portfolio',
  portfolioCtaTo: routePaths.portfolio,
  bookingCtaLabel: 'Book a Session',
  bookingCtaTo: routePaths.bookSession,
};
