import clsx from 'clsx';
import { BookmarkIcon } from '../icons';
import classes from './BookmarkBtn.module.scss';
import Button from './Button';

type BookmarkBtnProps = {
  className?: string;
};

const BookmarkBtn = ({ className }: BookmarkBtnProps) => {
  const bookmarkBtnClasses = clsx(
    {
      [classes.bookmark]: true
    },
    className
  );

  return (
    <Button className={bookmarkBtnClasses}>
      <BookmarkIcon />
    </Button>
  );
};
export default BookmarkBtn;
