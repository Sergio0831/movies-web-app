import { Loading } from '@/components/icons';
import { Grid, Main } from '@/components/layout';
import { Movies } from '@/components/sections';
import { Movie, SearchForm } from '@/components/ui';
import List from 'generics/List';
import useSearch from 'hooks/useSearch';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import prisma from 'prisma/prismaClient';
import { TMovie, TMovies } from 'types/movies';

const BookmarksPage = ({ movies }: TMovies) => {
  const { filtered, onChange, searchQuery, isLoading } =
    useSearch<TMovie>(movies);

  const moviesByCategories = movies.reduce((total, item, _, array) => {
    const { category } = item;
    total[category] = {
      label: category,
      movies: array.filter((movie) => movie.category === category)
    };

    return total;
  }, {});

  return (
    <Main>
      <SearchForm
        onSearch={onChange}
        search={searchQuery}
        placeholder='bookmarked shows'
      />
      {searchQuery ? (
        isLoading && searchQuery ? (
          <Loading />
        ) : (
          <Movies
            searchQuery={searchQuery}
            title={`Found ${filtered.length} results for `}
            aria-labelledby='Bookmarked Movies'
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
        )
      ) : (
        <section>
          {Object.values(moviesByCategories)
            .map(({ label, movies }: { label: string; movies: TMovie[] }) => (
              <Movies
                key={label}
                title={`Bookmarked ${label}`}
                aria-labelledby='Bookmarked Movies'
              >
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
            ))
            .reverse()}
        </section>
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
      isBookmarked: true
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

export default BookmarksPage;
