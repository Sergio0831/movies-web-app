import clsx from 'clsx';
import { useState } from 'react';
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

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <Button className={bookmarkBtnClasses} onClick={handleBookmark}>
      <BookmarkIcon />
    </Button>
  );
};
export default BookmarkBtn;
