import type { routePaths } from '../data/routes';

export type RoutePath = (typeof routePaths)[keyof typeof routePaths];

export interface NavigationItem {
  label: string;
  to: RoutePath;
  end?: boolean;
}
