import { useRouter } from 'next/router';
import classes from './Movies.module.scss';

type MoviesProps = {
  title?: string;
  children?: React.ReactNode;
};

const Movies = ({ title, children }: MoviesProps) => {
  const router = useRouter();

  return (
    <section className={classes.movies}>
      {router.pathname === '/' ? (
        <h2 className='heading-l'>Recommended for you</h2>
      ) : (
        <h1 className='heading-l'>{title}</h1>
      )}
      {children}
    </section>
  );
};
export default Movies;
