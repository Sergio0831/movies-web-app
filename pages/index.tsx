import { Loading } from '@/components/icons';
import { Grid, Main } from '@/components/layout';
import { Movies, Trending } from '@/components/sections';
import { Movie, SearchForm, SEO } from '@/components/ui';
import { useGetMoviesQuery } from 'app/movie.api';
import List from 'generics/List';
import useSearch from 'hooks/useSearch';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import { TMovie } from 'types/movies';

const Home: NextPage = () => {
  const { data, isSuccess, isLoading: loading } = useGetMoviesQuery();
  const { onChange, searchQuery, isLoading, movies } = useSearch<TMovie>(data);

  const trendingMovies = isSuccess && data.filter((movie) => movie.isTrending);
  const recommended = isSuccess && data.filter((movie) => !movie.isTrending);

  return (
    <>
      <SEO
        title='Entertainment Web App'
        content='Unlimited films, TV programmes and more.'
      />
      <Main searchQuery={searchQuery}>
        <SearchForm
          placeholder='movies or TV series'
          onSearch={onChange}
          search={searchQuery}
        />
        {isLoading && searchQuery ? (
          <Loading />
        ) : (
          <>
            {loading && <Loading />}
            {isSuccess && (
              <>
                {!searchQuery && (
                  <Trending
                    trendingMovies={trendingMovies}
                    aria-labelledby='Trending Shows'
                  />
                )}
                <Movies
                  aria-labelledby='Recomendet for you'
                  searchQuery={searchQuery}
                  title={
                    searchQuery.length > 0
                      ? `Found ${movies.length} results for `
                      : 'Recommendet for you'
                  }
                >
                  <Grid>
                    <List
                      items={searchQuery ? movies : recommended}
                      renderItem={(movie: TMovie) => (
                        <Movie key={movie.id} movie={movie} />
                      )}
                    />
                  </Grid>
                </Movies>
              </>
            )}
          </>
        )}
      </Main>
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

export default Home;

