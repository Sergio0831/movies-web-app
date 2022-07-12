import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import '@/styles/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

