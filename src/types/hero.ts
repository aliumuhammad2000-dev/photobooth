import type { RoutePath } from './navigation';

export interface HeroAction {
  label: string;
  to: RoutePath;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  description: string;
  primaryAction: HeroAction;
  secondaryAction: HeroAction;
  imageSrc: string | null;
  imageAlt: string;
}
