import { Loading } from '@/components/icons';
import { Grid, Main } from '@/components/layout';
import { AuthSection, Movies, Trending } from '@/components/sections';
import { Movie, SearchForm, SEO } from '@/components/ui';
import List from 'generics/List';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/client';
import prisma from 'prisma/prismaClient';
import { TMovie, TMovies } from 'types/movies';

const Home: NextPage = ({ movies }: TMovies) => {
  const [loading] = useSession();

  const trendingMovies = movies.filter((movie) => movie.isTrending);
  const recommended = movies.filter((movie) => !movie.isTrending);

  if (loading) {
    <AuthSection>
      <Loading />
    </AuthSection>;
  }

  return (
    <>
      <SEO
        title='Entertainment Web App'
        content='Unlimited films, TV programmes and more.'
      />
      <Main>
        <SearchForm placeholder='movies or TV series' />
        <Trending
          trendingMovies={trendingMovies}
          aria-labelledby='Trending Shows'
        />
        <Movies aria-labelledby='Recomendet for you'>
          <Grid>
            <List
              items={recommended}
              renderItem={(movie: TMovie) => (
                <Movie key={movie.id} movie={movie} />
              )}
            />
          </Grid>
        </Movies>
      </Main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({
    req: context.req
  });
  const movies = await prisma.movie.findMany();

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

export default Home;

