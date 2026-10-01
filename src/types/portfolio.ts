export type WorkLayout = 'feature' | 'portrait' | 'landscape' | 'compact';

export type PlaceholderTone = 'sage' | 'linen' | 'shadow' | 'moss' | 'stone';

export interface WorkPreview {
  id: string;
  slug: string;
  title: string;
  category: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  layout: WorkLayout;
  placeholderTone: PlaceholderTone;
}

export interface SelectedWorksContent {
  eyebrow: string;
  heading: string;
  description: string;
  assetNote: string;
  ctaLabel: string;
  ctaTo: string;
}
