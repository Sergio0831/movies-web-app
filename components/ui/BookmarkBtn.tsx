import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BookmarkIcon } from '../icons';
import classes from './BookmarkBtn.module.scss';
import Button from './Button';

type BookmarkBtnProps = {
  className?: string;
  movieTitle: string;
  bookmarked: boolean;
  notify: (message: string) => void;
  onBookmark: (isBookmarked: boolean) => void;
};

const BookmarkBtn = ({
  className,
  movieTitle,
  notify,
  onBookmark,
  bookmarked
}: BookmarkBtnProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const bookmarkBtnClasses = clsx(
    {
      [classes.bookmark]: true,
      [classes.bookmark__active]: isBookmarked || bookmarked
    },
    className
  );

  const handleBookmark = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    setIsBookmarked((prev) => !prev);
    onBookmark(isBookmarked);
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
