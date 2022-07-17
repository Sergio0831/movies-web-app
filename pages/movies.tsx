import { Main } from '@/components/layout';
import Grid from '@/components/layout/Grid';
import { Movies } from '@/components/sections';
import { SearchForm } from '@/components/ui';
import Movie from '@/components/ui/Movie';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import prisma from 'prisma/prismaClient';
import { TMovies } from 'types/movies';

const MoviesPage = ({ movies }: TMovies) => {
  console.log(movies);

  return (
    <Main>
      <SearchForm placeholder='movies' />
      <Movies title='Movies'>
        <Grid>
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </Grid>
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
      category: 'Movie'
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

export default MoviesPage;
