import { Loading } from "@/components/icons";
import { Container, Grid, Main } from "@/components/layout";
import { Movies, SectionLoading, Trending } from "@/components/sections";
import { Movie, SearchForm, SEO } from "@/components/ui";
import { useGetMoviesQuery } from "app/movie.api";
import List from "generics/List";
import useSearch from "hooks/useSearch";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { TMovie } from "types/movies";

const Home: NextPage = () => {
  const { data, isSuccess, isLoading: loading } = useGetMoviesQuery();
  const { onChange, searchQuery, isLoading, movies } = useSearch();

  const trendingMovies = isSuccess && data.filter((movie) => movie.isTrending);
  const recommended = isSuccess && data.filter((movie) => !movie.isTrending);

  return (
    <>
      <SEO
        title='Entertainment Web App'
        description='Unlimited films, TV programmes and more.'
      />
      <Container>
        <Main>
          <SearchForm
            placeholder='movies or TV series'
            onSearch={onChange}
            search={searchQuery}
          />
          {isLoading && searchQuery ? (
            <SectionLoading />
          ) : (
            <>
              {loading && <SectionLoading />}
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
                        : "Recommendet for you"
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
        destination: "/login",
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });

