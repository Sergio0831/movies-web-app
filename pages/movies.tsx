import { Loading } from '@/components/icons';
import { Main } from '@/components/layout';
import Grid from '@/components/layout/Grid';
import { Movies } from '@/components/sections';
import { SearchForm } from '@/components/ui';
import Movie from '@/components/ui/Movie';
import List from 'generics/List';
import useSearch from 'hooks/useSearch';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import prisma from 'prisma/prismaClient';
import { TMovie, TMovies } from 'types/movies';

const MoviesPage = ({ movies }: TMovies) => {
  const { onChange, filtered, searchQuery, isLoading } = useSearch<TMovie>(
    movies,
    'Movie'
  );

  return (
    <Main>
      <SearchForm
        placeholder='movies'
        onSearch={onChange}
        search={searchQuery}
      />
      {isLoading && searchQuery ? (
        <Loading />
      ) : (
        <Movies
          searchQuery={searchQuery}
          title={
            searchQuery.length > 0
              ? `Found ${filtered.length} results for `
              : 'Movie'
          }
          aria-labelledby='Movies'
        >
          {movies.length > 0 ? (
            <Grid>
              <List
                items={filtered}
                renderItem={(movie: TMovie) => (
                  <Movie key={movie.id} movie={movie} />
                )}
              />
            </Grid>
          ) : (
            <Loading />
          )}
        </Movies>
      )}
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
