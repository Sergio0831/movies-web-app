import {
  NavBookmark,
  NavHome,
  NavMovies,
  NavTvSeries
} from '@/components/icons';

export const navLinks = [
  { link: '/', icon: <NavHome /> },
  { link: '/movies', icon: <NavMovies /> },
  { link: '/tv-series', icon: <NavTvSeries /> },
  { link: '/bookmarks', icon: <NavBookmark /> }
];
