import clsx from 'clsx';
import { MovieIcon, TvIcon } from '../icons';
import classes from './Description.module.scss';

type DescriptionProps = {
  year: number;
  category: string;
  rating: string;
  title: string;
  className?: string;
  trending?: boolean;
};

const Description = ({
  category,
  rating,
  title,
  year,
  className,
  trending
}: DescriptionProps) => {
  const descriptionClasses = clsx(
    {
      [classes.description]: true
    },
    className
  );
  const descriptionArray = [year, category, rating];

  return (
    <div className={descriptionClasses}>
      <ul>
        {descriptionArray.map((item) => (
          <li key={item}>
            <p className={trending ? 'body-m' : 'body-s'}>
              {item === rating ? (
                <>
                  {category === 'Movie' ? <MovieIcon /> : <TvIcon />}
                  {item}
                </>
              ) : (
                item
              )}
            </p>
          </li>
        ))}
      </ul>
      <h3 className={trending ? 'heading-s' : 'heading-xs'}>{title}</h3>
    </div>
  );
};
export default Description;
