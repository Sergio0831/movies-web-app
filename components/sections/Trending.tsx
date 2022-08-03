import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NEXT, PREV } from 'app/movie.slice';
import List from 'generics/List';
import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { TMovie } from 'types/movies';
import { Movie } from '../ui';
import classes from './Trending.module.scss';

type TrendingProps = {
  trendingMovies: TMovie[];
};

const Trending = ({ trendingMovies }: TrendingProps) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const { pos } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const slide = (dir: string): void => {
    if (dir === 'NEXT' && !isIntersecting) {
      dispatch(NEXT());
    }
    if (dir === 'PREV' && pos > 0) {
      dispatch(PREV());
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide('NEXT'),
    onSwipedRight: () => slide('PREV'),
    trackMouse: true
  });

  useEffect(() => {
    const slideObserve = new IntersectionObserver(
      (slide) => {
        setIsIntersecting(slide[0].isIntersecting);
      },
      {
        threshold: 0.75
      }
    );
    const observer =
      containerRef.current.children[containerRef.current.children.length - 1];
    slideObserve.observe(observer);

    return () => {
      slideObserve.unobserve(observer);
    };
  }, []);

  useEffect(() => {
    const styles = getComputedStyle(containerRef.current);
    const gap = parseInt(styles.columnGap);
    containerRef.current.style.transform = `translateX(-${
      pos * containerRef.current.children[0].clientWidth + pos * gap
    }px )`;
  }, [pos]);

  return (
    <section className={classes.trending}>
      <h1 className='heading-l'>Trending</h1>
      <div
        className={classes.trending__container}
        {...handlers}
        ref={containerRef}
      >
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
