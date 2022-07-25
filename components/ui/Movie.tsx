import axios from 'axios';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useState } from 'react';
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
  const movieImageClasses = clsx({
    [classes.movie__image]: true,
    [classes.image__trending]: trending
  });

  const movieDescriptionClasses = clsx({
    [classes.movie__description]: true,
    [classes.description__trending]: trending
  });

  const notify = useCallback((message: string) => {
    toast(message, {
      className: `${classes.movie__toast}`
    });
  }, []);

  const handleBookmark = async (isBookmarked: boolean) => {
    await fetch('/api/bookmarks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: movie.id, isBookmarked })
    });
  };

  return (
    <article className={classes.movie}>
      <BookmarkBtn
        notify={notify}
        bookmarked={movie.isBookmarked}
        onBookmark={handleBookmark}
        movieTitle={movie.title}
        className={`${classes.movie__bookmark} ${
          trending ? classes.bookmark__trending : ''
        }`}
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
