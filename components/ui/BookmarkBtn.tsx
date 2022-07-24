import clsx from 'clsx';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { BookmarkIcon } from '../icons';
import classes from './BookmarkBtn.module.scss';
import Button from './Button';

type BookmarkBtnProps = {
  className?: string;
  movieTitle: string;
  notify: (message: string) => void;
};

const BookmarkBtn = ({ className, movieTitle, notify }: BookmarkBtnProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const bookmarkBtnClasses = clsx(
    {
      [classes.bookmark]: true,
      [classes.bookmark__active]: isBookmarked
    },
    className
  );

  const handleBookmark = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    setIsBookmarked((prev) => !prev);
    isBookmarked
      ? notify(`${movieTitle} removed from bookmarks`)
      : notify(`${movieTitle} added to bookmarks`);
    e.stopPropagation();
  };

  return (
    <Button
      className={bookmarkBtnClasses}
      onClick={handleBookmark}
      ariaLabel='Bookmark Movie'
    >
      <BookmarkIcon />
    </Button>
  );
};
export default BookmarkBtn;
