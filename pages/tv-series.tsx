import { Loading } from '@/components/icons';
import { Container, Main } from '@/components/layout';
import Grid from '@/components/layout/Grid';
import { Movies, SectionLoading } from '@/components/sections';
import { SearchForm } from '@/components/ui';
import Movie from '@/components/ui/Movie';
import { useGetMoviesByCategoryQuery } from 'app/movie.api';
import List from 'generics/List';
import useSearch from 'hooks/useSearch';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { TMovie } from 'types/movies';

const TvSeriesPage = () => {
  const {
    data,
    isSuccess,
    isLoading: loading
  } = useGetMoviesByCategoryQuery('TV Series');
  const { onChange, movies, searchQuery, isLoading } = useSearch('TV Series');

  return (
    <Container>
      <Main>
        <SearchForm
          placeholder='TV series'
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
                    : 'TV Series'
                }
                aria-labelledby='TV Series'
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

export default TvSeriesPage;
