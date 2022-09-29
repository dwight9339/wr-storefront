import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient } from 'react-query';
import { MedusaProvider, SessionCartProvider } from 'medusa-react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MedusaProvider
      queryClientProviderProps={{
        client: queryClient
      }}
      baseUrl={process.env.NEXT_PUBLIC_BACKEND_HOST || "http://localhost:9000"}
    >
      <SessionCartProvider>
        <Component {...pageProps} />
      </SessionCartProvider>
    </MedusaProvider>
  )
}

export default MyApp;
