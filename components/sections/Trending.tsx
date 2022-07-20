import List from 'generics/List';
import { TMovie, TMovies } from 'types/movies';
import { Movie } from '../ui';
import classes from './Trending.module.scss';

type TrendingProps = {
  trendingMovies: TMovie[];
};

const Trending = ({ trendingMovies }: TrendingProps) => {
  return (
    <section className={classes.trending}>
      <h1 className='heading-l'>Trending</h1>
      <div className={classes.trending__container}>
        <List
          items={trendingMovies}
          renderItem={(movie) => (
            <Movie movie={movie} key={movie.id} trending />
          )}
        />
      </div>
    </section>
  );
};
export default Trending;
