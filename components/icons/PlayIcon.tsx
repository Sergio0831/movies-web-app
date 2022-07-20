import classes from './PlayIcon.module.scss';

type PlayIconProps = {
  isPlaying: boolean;
};

const PlayIcon = ({ isPlaying }: PlayIconProps) => {
  return (
    <svg width='30' height='30'>
      <path
        className={isPlaying ? classes.pause : classes.play}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 15C0 6.7125 6.7125 0 15 0C23.2875 0 30 6.7125 30 15C30 23.2875 23.2875 30 15 30C6.7125 30 0 23.2875 0 15ZM9 10H14V19H9V10ZM17 10H22V19H17V10Z'
        fill='#fff'
      />
      <path
        className={isPlaying ? classes.play : classes.pause}
        d='M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z'
        fill='#fff'
      />
    </svg>
  );
};
export default PlayIcon;
