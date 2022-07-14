import Loading from '@/components/icons/Loading';
import Main from '@/components/layout/Main';
import { AuthSection } from '@/components/sections';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/client';
import Head from 'next/head';

const Home: NextPage = () => {
  const [session, loading] = useSession();

  if (loading) {
    <AuthSection>
      <Loading />
    </AuthSection>;
  }

  return (
    <>
      <Head>
        <title>Entertainment Web App</title>
        <meta
          name='description'
          content='Unlimited films, TV programmes and more.'
        />
      </Head>
      <Main></Main>
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

