import clsx from 'clsx';
import { PlayIcon } from '../icons';
import Button from './Button';
import classes from './PlayBtn.module.scss';

type PlayBtnProps = {
  className: string;
};

const PlayBtn = ({ className }: PlayBtnProps) => {
  const playBtnClasses = clsx(
    {
      [classes.play]: true
    },
    className
  );

  return (
    <div className={playBtnClasses}>
      <Button>
        <PlayIcon />
      </Button>
      <p className='heading-xs'>Play</p>
    </div>
  );
};
export default PlayBtn;
