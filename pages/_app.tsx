import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient } from 'react-query';
import { MedusaProvider, CartProvider, useGetCart } from 'medusa-react';
import store from 'store2';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <MedusaProvider
      queryClientProviderProps={{
        client: queryClient
      }}
      baseUrl={process.env.NEXT_PUBLIC_BACKEND_HOST || "http://localhost:9000"}
    >
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </MedusaProvider>
  )
}

export default MyApp;
