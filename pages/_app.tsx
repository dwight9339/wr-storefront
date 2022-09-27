import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { useState, createContext } from "react";
import { ProductVariant as Variant } from '@medusajs/medusa';
import CartContext from "../contexts/CartContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [cart, setCart] = useState<Variant[]>([]);

  const addIfNotPresent = (arr: Array<Variant>, item: Variant) => {
    if (arr.find((v) => v.id === item.id)) return arr;
    return [...arr, item];
  }

  return (
    <CartContext.Provider value={{
      cart,
      addItem: (item: Variant) => setCart((prev) => addIfNotPresent(prev, item)),
      removeItem: (itemId: string) => setCart((prev) => {
        return prev.filter((item) => item.id !== itemId);
      })
    }}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CartContext.Provider>
  )
}

export default MyApp;
