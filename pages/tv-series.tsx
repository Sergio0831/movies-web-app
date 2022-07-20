import { Loading } from '@/components/icons';
import { Main } from '@/components/layout';
import Grid from '@/components/layout/Grid';
import { Movies } from '@/components/sections';
import { SearchForm } from '@/components/ui';
import Movie from '@/components/ui/Movie';
import List from 'generics/List';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import prisma from 'prisma/prismaClient';
import { TMovie, TMovies } from 'types/movies';

const TvSeriesPage = ({ movies }: TMovies) => {
  return (
    <Main>
      <SearchForm placeholder='TV series' />
      <Movies title='TV Series' aria-labelledby='TV Series'>
        {movies.length > 0 ? (
          <Grid>
            <List
              items={movies}
              renderItem={(movie: TMovie) => (
                <Movie key={movie.id} movie={movie} />
              )}
            />
          </Grid>
        ) : (
          <Loading />
        )}
      </Movies>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({
    req: context.req
  });
  const movies = await prisma.movie.findMany({
    where: {
      category: 'TV Series'
    }
  });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: { session, movies }
  };
};

export default TvSeriesPage;
