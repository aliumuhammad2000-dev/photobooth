export type WorkLayout = 'feature' | 'portrait' | 'landscape' | 'compact';

export type PlaceholderTone = 'sage' | 'linen' | 'shadow' | 'moss' | 'stone';

interface WorkPreviewBase {
  id: string;
  slug: string;
  title: string;
  category: string;
  layout: WorkLayout;
}

export interface PlaceholderWorkPreview extends WorkPreviewBase {
  kind: 'placeholder';
  placeholderTone: PlaceholderTone;
}

export interface PhotographWorkPreview extends WorkPreviewBase {
  kind: 'photograph';
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
}

export type WorkPreview = PlaceholderWorkPreview | PhotographWorkPreview;

export interface SelectedWorksContent {
  eyebrow: string;
  heading: string;
  description: string;
  assetNote: string;
  ctaLabel: string;
  ctaTo: string;
}
