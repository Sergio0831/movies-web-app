import List from 'generics/List';
import React, { useEffect, useRef, useState } from 'react';
import { TMovie } from 'types/movies';
import { Movie } from '../ui';
import { motion } from 'framer-motion';
import classes from './Trending.module.scss';

type TrendingProps = {
  trendingMovies: TMovie[];
};

const Trending = ({ trendingMovies }: TrendingProps) => {
  const [width, setWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(
      containerRef.current.scrollWidth - containerRef.current.offsetWidth
    );
  }, []);

  return (
    <section className={classes.trending}>
      <h1 className='heading-l'>Trending</h1>
      <motion.div
        drag='x'
        dragConstraints={{ right: 0, left: -width }}
        dragElastic={0}
        className={classes.trending__container}
        ref={containerRef}
      >
        <List
          items={trendingMovies}
          renderItem={(movie) => (
            <motion.div key={movie.id} className={classes.trending__slide}>
              <Movie movie={movie} key={movie.id} trending />
            </motion.div>
          )}
        />
      </motion.div>
    </section>
  );
};
export default Trending;
