import { routePaths } from './routes';
import type { NavigationItem } from '../types/navigation';

export const navigationItems: NavigationItem[] = [
  { label: 'Home', to: routePaths.home, end: true },
  { label: 'Portfolio', to: routePaths.portfolio },
  { label: 'Services', to: routePaths.services },
  { label: 'About', to: routePaths.about },
  { label: 'Contact', to: routePaths.contact },
];
