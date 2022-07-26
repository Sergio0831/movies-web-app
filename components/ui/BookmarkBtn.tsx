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
  onBookmark: () => void;
};

const BookmarkBtn = ({
  className,
  onBookmark,
  bookmarked
}: BookmarkBtnProps) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  const bookmarkBtnClasses = clsx(
    {
      [classes.bookmark]: true,
      [classes.bookmark__active]: isBookmarked
    },
    className
  );

  return (
    <Button
      className={bookmarkBtnClasses}
      onClick={(e: React.SyntheticEvent<HTMLButtonElement>) => {
        setIsBookmarked((prev) => !prev);
        onBookmark();
        e.stopPropagation();
      }}
      ariaLabel='Bookmark Movie'
    >
      <BookmarkIcon />
    </Button>
  );
};
export default BookmarkBtn;
