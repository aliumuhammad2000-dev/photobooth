export const routePaths = {
  home: '/',
  portfolio: '/portfolio',
  portfolioProject: '/portfolio/:slug',
  services: '/services',
  about: '/about',
  contact: '/contact',
  bookSession: '/book-session',
} as const;

export function getPortfolioProjectPath(slug: string) {
  return `${routePaths.portfolio}/${encodeURIComponent(slug)}`;
}

export function getBookSessionPath(serviceSlug: string) {
  return `${routePaths.bookSession}?service=${encodeURIComponent(serviceSlug)}`;
}
