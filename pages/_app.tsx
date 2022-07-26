import { Provider as SessionProvider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '@/styles/main.scss';
import { store } from 'app/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;

