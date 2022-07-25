import { useRouter } from 'next/router';
import classes from './Movies.module.scss';

type MoviesProps = {
  title?: string;
  children?: React.ReactNode;
  searchQuery?: string;
};

const Movies = ({ title, children, searchQuery }: MoviesProps) => {
  const router = useRouter();

  return (
    <section className={classes.movies}>
      {router.pathname === '/' && !searchQuery ? (
        <h2 className='heading-l'>{title}</h2>
      ) : (
        <h1 className='heading-l'>
          {title}
          {searchQuery && <span>&lsquo;{searchQuery}&rsquo;</span>}
        </h1>
      )}
      {children}
    </section>
  );
};
export default Movies;
