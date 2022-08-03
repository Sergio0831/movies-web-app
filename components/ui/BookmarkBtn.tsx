import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BookmarkIcon, Loading } from '../icons';
import classes from './BookmarkBtn.module.scss';
import Button from './Button';

type BookmarkBtnProps = {
  className?: string;
  bookmarked: boolean;
  isLoading: boolean;
  onBookmark: () => void;
};

const BookmarkBtn = ({
  className,
  onBookmark,
  bookmarked,
  isLoading
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
      disabled={isLoading ? true : false}
      className={bookmarkBtnClasses}
      onClick={(e: React.SyntheticEvent<HTMLButtonElement>) => {
        setIsBookmarked((prev) => !prev);
        onBookmark();
        e.stopPropagation();
      }}
      ariaLabel='Bookmark Movie'
    >
      {isLoading ? (
        <Loading className={classes.bookmark__loading} />
      ) : (
        <BookmarkIcon />
      )}
    </Button>
  );
};
export default BookmarkBtn;
