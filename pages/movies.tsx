import { Container, Main } from '@/components/layout';
import Grid from '@/components/layout/Grid';
import { Movies, SectionLoading } from '@/components/sections';
import { SearchForm, SEO } from '@/components/ui';
import Movie from '@/components/ui/Movie';
import { useGetMoviesByCategoryQuery } from 'app/movie.api';
import List from 'generics/List';
import useSearch from 'hooks/useSearch';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { TMovie } from 'types/movies';

const MoviesPage = () => {
  const {
    data,
    isSuccess,
    isLoading: loading
  } = useGetMoviesByCategoryQuery('Movie');
  const { onChange, searchQuery, isLoading, movies } = useSearch('Movie');

  return (
    <>
      <SEO title='Movies' />
      <Container>
        <Main>
          <SearchForm
            placeholder='movies'
            onSearch={onChange}
            search={searchQuery}
          />
          {isLoading && searchQuery ? (
            <SectionLoading />
          ) : (
            <>
              {loading && <SectionLoading />}
              {isSuccess && (
                <Movies
                  searchQuery={searchQuery}
                  title={
                    searchQuery.length > 0
                      ? `Found ${movies.length} results for `
                      : 'Movie'
                  }
                  aria-labelledby='Movies'
                >
                  <Grid>
                    <List
                      items={searchQuery ? movies : data}
                      renderItem={(movie: TMovie) => (
                        <Movie key={movie.id} movie={movie} />
                      )}
                    />
                  </Grid>
                </Movies>
              )}
            </>
          )}
        </Main>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({
    req: context.req
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
    props: { session }
  };
};

export default dynamic(() => Promise.resolve(MoviesPage), { ssr: false });
