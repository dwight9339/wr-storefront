import { useState, createContext, useContext, useEffect } from "react";
import { useProduct as useMedusaProduct } from "medusa-react";
import { Product, ProductVariant } from "@medusajs/medusa";

interface ProductState {
  product?: Product;
  selectedVariant?: ProductVariant;
  quantity: Number;
}

interface ProductContext extends ProductState {
  selectVariant: (variant: ProductVariant) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  setQuantity: (num: number) => void;
}

const ProductContext = createContext<ProductContext | null>(null);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within ProductProvider");
  }

  return context;
}

interface ProviderProps {
  children: JSX.Element;
  productId: string;
}

export const ProductProvider = ({ children, productId }: ProviderProps) => {
  const [quantity, updateQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const { product } = useMedusaProduct(productId, {
    onSuccess: ({ product }) => {
      setSelectedVariant(product.variants[0]);
    }
  });

  const selectVariant = (variant: ProductVariant) => {
    if (variant === selectedVariant) return;
    setSelectedVariant(variant);
    setQuantity(1);
  }

  const incrementQuantity = () => updateQuantity((prev) => prev + 1);

  const decrementQuantity = () => {
    if (quantity === 1) return;
    updateQuantity((prev) => prev - 1);
  }

  const setQuantity = (num: number) => {
    if (num <= 0) throw new Error("num must be a positive integer");
    updateQuantity(num);
  }

  return (
    <ProductContext.Provider value={{
      product,
      quantity,
      selectedVariant,
      selectVariant,
      incrementQuantity,
      decrementQuantity,
      setQuantity
    }}>
      {children}
    </ProductContext.Provider>
  )
}