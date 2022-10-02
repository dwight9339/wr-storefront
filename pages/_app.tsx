import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient } from 'react-query';
import { MedusaProvider, CartProvider, useGetCart } from 'medusa-react';
import store from "store2";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const cartId = store.get("cartId");
  const cartQuery = cartId && useGetCart(cartId);

  return (
    <MedusaProvider
      queryClientProviderProps={{
        client: queryClient
      }}
      baseUrl={process.env.NEXT_PUBLIC_BACKEND_HOST || "http://localhost:9000"}
    >
      <CartProvider initialState={cartId && cartQuery.cart}>
        <Component {...pageProps} />
      </CartProvider>
    </MedusaProvider>
  )
}

export default MyApp;
