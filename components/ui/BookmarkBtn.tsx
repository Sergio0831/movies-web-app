import clsx from 'clsx';
import React, { useState } from 'react';
import { BookmarkIcon } from '../icons';
import classes from './BookmarkBtn.module.scss';
import Button from './Button';

type BookmarkBtnProps = {
  className?: string;
};

const BookmarkBtn = ({ className }: BookmarkBtnProps) => {
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
