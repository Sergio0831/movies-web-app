type Trending = {
  small: string;
  large: string;
};

type Regular = {
  small: string;
  medium: string;
  large: string;
};

type Thumbnail = {
  trending?: Trending;
  regular: Regular;
};

export type TMovie = {
  id: string;
  title: string;
  thumbnail: Thumbnail;
  year: number;
  category: string;
  rating: string;
  isBookmarked: string;
  isTrending: string;
};

export type TMovies = {
  movies: TMovie[];
};
