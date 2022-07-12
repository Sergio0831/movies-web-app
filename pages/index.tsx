import { Button } from '@/components/ui';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession, signOut, useSession } from 'next-auth/client';
import Head from 'next/head';

const Home: NextPage = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <h2>Loading...</h2>;
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
      <h1 className='heading-l'>Entertainment Web App</h1>
      <h2>Hi {session.user.email}</h2>
      <Button onClick={() => signOut()} className='btn-fill'>
        Logout
      </Button>
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

