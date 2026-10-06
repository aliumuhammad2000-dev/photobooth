import { routePaths } from './routes';
import photographerImage from '../assets/images/about/me-photography.png';
import type { AboutContent } from '../types/about';

export const aboutContent: AboutContent = {
  photographer: {
    name: 'Femi Leah',
    location: 'Surulere',
    professionalIdentity: 'Photographer & Visual Storyteller',
    specialties: [
      'Portrait & Personal Branding',
      'Weddings & Celebrations',
      'Fashion & Editorial',
      'Lifestyle & Documentary',
      'Events',
      'Commercial & Brand Storytelling',
    ],
    biography:
      'Femi Leah is a photographer based in Surulere, with a creative vision rooted in emotion, individuality, and authentic storytelling.\n\nDrawn to the beauty of ordinary moments and the energy of extraordinary celebrations, Femi approaches photography with an eye for natural expressions, thoughtful lighting, and meaningful details.\n\nFrom intimate portraits and elegant weddings to fashion editorials and lifestyle photography, the goal is simple: to create images that do more than capture appearances. Images that preserve feelings, celebrate personalities, and tell stories worth remembering.',
    creativePhilosophy:
      "Photography is more than capturing what a moment looks like. It's preserving what it feels like.",
  },
  homepage: {
    eyebrow: 'BEHIND THE LENS',
    heading: 'Meet Femi Leah.',
    description:
      'Based in Surulere, Femi Leah creates thoughtful photography inspired by genuine emotion, expressive personalities, and the beauty of storytelling through images.',
    ctaLabel: 'Discover My Story',
    ctaTo: routePaths.about,
  },
  page: {
    eyebrow: 'ABOUT THE PHOTOGRAPHER',
    heading: 'Meet the photographer.',
    introduction:
      'Thoughtful photography for stories, people, and moments worth remembering.',
    creativeHeading: 'An eye for the moments that matter.',
    creativeDescription:
      'Whether documenting a celebration, creating a portrait, or bringing a visual concept to life, the approach remains thoughtful, collaborative, and attentive to detail.',
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
