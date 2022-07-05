import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
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
    </>
  );
};

export default Home;

