import Image from 'next/image';
import { TMovie } from 'types/movies';
import BookmarkBtn from './BookmarkBtn';
import Description from './Description';
import classes from './Movie.module.scss';

type MovieProps = {
  movie: TMovie;
};

const Movie = ({ movie }: MovieProps) => {
  return (
    <article className={classes.movie}>
      <div className={classes.movie__image}>
        <BookmarkBtn className={classes.movie__bookmark} />
        <Image
          src={movie.thumbnail.regular.large}
          layout='fill'
          alt={movie.title}
          objectFit='cover'
          quality={100}
        />
      </div>
      <Description
        category={movie.category}
        rating={movie.rating}
        title={movie.title}
        year={movie.year}
        className={classes.movie__description}
      />
    </article>
  );
};
export default Movie;
