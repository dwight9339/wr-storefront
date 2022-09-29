import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient } from 'react-query';
import { MedusaProvider } from 'medusa-react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MedusaProvider
      queryClientProviderProps={{
        client: queryClient
      }}
      baseUrl={process.env.NEXT_PUBLIC_BACKEND_HOST || "http://localhost:9000"}
    >
      <Component {...pageProps} />
    </MedusaProvider>
  )
}

export default MyApp;
