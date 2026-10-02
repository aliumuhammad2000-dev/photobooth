export type PortraitPlaceholderTone = 'sage' | 'linen' | 'shadow' | 'moss' | 'stone';

export interface PortraitPlaceholder {
  kind: 'placeholder';
  label: string;
  tone: PortraitPlaceholderTone;
}

export interface PortraitPhotograph {
  kind: 'photograph';
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
}

export type PhotographerPortrait = PortraitPlaceholder | PortraitPhotograph;

export interface CreativeValue {
  id: string;
  title: string;
  description: string;
}

export interface AboutContent {
  homepage: {
    eyebrow: string;
    heading: string;
    description: string;
    ctaLabel: string;
    ctaTo: string;
  };
  page: {
    eyebrow: string;
    heading: string;
    introduction: string;
    creativeHeading: string;
    creativeDescription: string;
    biographyNote: string;
  };
  portrait: PhotographerPortrait;
  creativeValues: CreativeValue[];
  portfolioCtaLabel: string;
  portfolioCtaTo: string;
  bookingCtaLabel: string;
  bookingCtaTo: string;
}
