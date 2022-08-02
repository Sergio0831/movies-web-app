import { useToggleBookmarksMutation } from 'app/movie.api';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { TMovie } from 'types/movies';
import BookmarkBtn from './BookmarkBtn';
import Description from './Description';
import classes from './Movie.module.scss';
import PlayBtn from './PlayBtn';

type MovieProps = {
  movie: TMovie;
  trending?: boolean;
};

const Movie = ({ movie, trending }: MovieProps) => {
  const movieClasses = clsx({
    [classes.movie]: true,
    [classes.movie__trending]: trending
  });

  const movieImageClasses = clsx({
    [classes.movie__image]: true,
    [classes.image__trending]: trending
  });

  const movieDescriptionClasses = clsx({
    [classes.movie__description]: true,
    [classes.description__trending]: trending
  });

  const [toggleBookmarks, { isLoading, isSuccess }] =
    useToggleBookmarksMutation();

  const handleBookmark = async () => {
    await toggleBookmarks({ id: movie.id, isBookmarked: !movie.isBookmarked });
  };

  useEffect(() => {
    if (isSuccess && !movie.isBookmarked) {
      toast.success(`${movie.title} added to bookmarks`);
    } else if (isSuccess && movie.isBookmarked) {
      toast.success(`${movie.title} removed from bookmarks`);
    }
  }, [isLoading]);

  return (
    <article className={movieClasses}>
      <BookmarkBtn
        bookmarked={movie.isBookmarked}
        onBookmark={handleBookmark}
        className={`${classes.movie__bookmark} ${
          trending ? classes.bookmark__trending : ''
        }`}
        isLoading={isLoading}
      />
      <div className={movieImageClasses}>
        <Image
          src={movie.thumbnail.regular.large}
          layout='fill'
          alt={movie.title}
          objectFit='cover'
          quality={100}
          placeholder='blur'
          blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
          priority
        />
        <PlayBtn className={classes.movie__play} />
        {trending && <div className={classes.movie__darken}></div>}
      </div>
      <Description
        category={movie.category}
        rating={movie.rating}
        title={movie.title}
        year={movie.year}
        className={movieDescriptionClasses}
        trending={trending}
      />
    </article>
  );
};
export default Movie;
