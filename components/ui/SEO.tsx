import Head from 'next/head';

type SEOProps = {
  title: string;
  content: string;
};

const SEO = ({ content, title }: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={content} />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
  );
};
export default SEO;
