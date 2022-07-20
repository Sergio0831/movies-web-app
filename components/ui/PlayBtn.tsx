import clsx from 'clsx';
import React, { useState } from 'react';
import { PlayIcon } from '../icons';
import Button from './Button';
import classes from './PlayBtn.module.scss';

type PlayBtnProps = {
  className: string;
};

const PlayBtn = ({ className }: PlayBtnProps) => {
  const [isPlaying, setisPlaying] = useState<boolean>(false);

  const playBtnClasses = clsx(
    {
      [classes.play]: true
    },
    className
  );

  return (
    <Button
      onClick={(e: React.SyntheticEvent<HTMLButtonElement>) => {
        setisPlaying((prev) => !prev);
        e.stopPropagation();
      }}
      className={playBtnClasses}
      ariaLabel='Play Movie'
    >
      <PlayIcon isPlaying={isPlaying} />
      <p className='heading-xs'>{isPlaying ? 'Stop' : 'Play'}</p>
    </Button>
  );
};
export default PlayBtn;
