import Head from 'next/head';

type SEOProps = {
  title: string;
  description?: string;
};

const SEO = ({ description, title }: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='shortcut icon' href='../../favicon.ico' type='image/x-icon' />
      {description ? (
        <meta itemProp='description' name='description' content={description} />
      ) : (
        <meta name='robots' content='noindex, nofollow' />
      )}
    </Head>
  );
};
export default SEO;
