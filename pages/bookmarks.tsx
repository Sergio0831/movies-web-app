import { Loading } from "@/components/icons";
import { Grid, Main } from "@/components/layout";
import { Movies, SectionLoading } from "@/components/sections";
import { Movie, SearchForm } from "@/components/ui";
import { useGetBookmarkedMoviesQuery } from "app/movie.api";
import List from "generics/List";
import useSearch from "hooks/useSearch";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { TMovie } from "types/movies";

const BookmarksPage = () => {
  const { data, isSuccess, isLoading: loading } = useGetBookmarkedMoviesQuery();

  const { onChange, searchQuery, isLoading, movies } = useSearch();

  const moviesByCategories =
    isSuccess &&
    data.reduce((total, item, _, array) => {
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
          <SectionLoading />
        ) : (
          <Movies
            searchQuery={searchQuery}
            title={`Found ${movies.length} results for `}
            aria-labelledby='Bookmarked Movies'
          >
            <Grid>
              <List
                items={movies}
                renderItem={(movie: TMovie) => (
                  <Movie key={movie.id} movie={movie} />
                )}
              />
            </Grid>
          </Movies>
        )
      ) : (
        <>
          {loading && <SectionLoading />}
          <section>
            {isSuccess && (
              <>
                {Object.values(moviesByCategories)
                  .map(
                    ({
                      label,
                      movies
                    }: {
                      label: string;
                      movies: TMovie[];
                    }) => (
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
                    )
                  )
                  .reverse()}
              </>
            )}
          </section>
        </>
      )}
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({
    req: context.req
  });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
};

export default BookmarksPage;

