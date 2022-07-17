import Loading from '@/components/icons/Loading';
import Grid from '@/components/layout/Grid';
import Main from '@/components/layout/Main';
import { AuthSection, Movies, Trending } from '@/components/sections';

import { SearchForm } from '@/components/ui';
import SEO from '@/components/ui/SEO';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/client';
import Head from 'next/head';
import prisma from 'prisma/prismaClient';
import { TMovies } from 'types/movies';

const Home: NextPage = ({ movies }: TMovies) => {
  const [loading] = useSession();

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
        <Trending />
        <Movies>
          <Grid>
            {movies.map((movie) => (
              <h3>{movie.title}</h3>
            ))}
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

