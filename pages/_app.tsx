import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { useState, createContext } from "react";
import { LineItem as Item } from '@medusajs/medusa';
import CartContext from "../contexts/CartContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [cart, setCart] = useState<Item[]>([]);

  return (
    <CartContext.Provider value={{cart, setCart}}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CartContext.Provider>
  )
}

export default MyApp;
