import clsx from 'clsx';
import Image from 'next/image';
import classes from './Avatar.module.scss';

type AvatarProps = {
  avatar: string;
  className?: string;
};

const Avatar = ({ avatar, className }: AvatarProps) => {
  const avatarClasses = clsx(
    {
      [classes['image-container']]: true
    },
    className
  );

  return (
    <div className={avatarClasses}>
      <Image src={avatar} alt='avatar' layout='fill' priority={true} />
    </div>
  );
};
export default Avatar;
