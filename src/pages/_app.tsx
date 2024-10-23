import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import '@/styles/Globals.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
