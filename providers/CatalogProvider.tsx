import { useState, createContext, useContext } from "react";
import { useProducts, useCollections } from "medusa-react";
import type { Product, ProductCollection as Collection } from "@medusajs/medusa";

interface CatalogState {
  products?: Product[];
  collections?: Collection[];
  selectedCollection?: string;
  pageSize: number;
  currentPage: number;
}

interface CatalogContext extends CatalogState {
  setSelectedCollection: (id: string) => void;
  resetCollection: () => void;
  changePageSize: (size: number) => void;
  hasNext: () => boolean;
  hasPrev: () => boolean;
  nextPage: () => void;
  prevPage: () => void;
  jumpToPage: (page: number) => void;
}

const CatalogContext = createContext<CatalogContext | null>(null);

interface ProviderProps {
  children: JSX.Element;
}

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used withing CatalogProvider");
  }

  return context;
}

export const CatalogProvider = ({ children }: ProviderProps) => {
  const [currentCollection, setCurrentCollection] = useState<string[]>();
  const [pageSize, setPageSize] = useState<number>(/*24*/9);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { collections, refetch: refetchCollections } = useCollections();
  const { products, count } = useProducts({
    collection_id: currentCollection,
    offset: pageSize * currentPage,
    limit: pageSize
  });
  
  const setSelectedCollection = (id: string) => {
    setCurrentCollection([id]);
    setCurrentPage(0);
  }

  const resetCollection = () => {
    setCurrentCollection(undefined);
    setCurrentPage(0);
  };

  const changePageSize = (size: number) => {
    if (size <= 0) {
      throw new Error("Page size cannot be less than 1");
    }

    setPageSize(size);
  }

  const hasNext = () => {
    if (!count) return false;
    return currentPage * pageSize < count
  }

  const hasPrev = () => {
    return currentPage > 0;
  }

  const nextPage = () => {
    if (hasNext()) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  const prevPage = () => {
    if (hasPrev()) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  const jumpToPage = (page: number) => {
    if (page <= 0) {
      throw new Error("Cannot jump to page less than 1");
    }

    setCurrentPage(page);
  }

  return (
    <CatalogContext.Provider value={{
      products,
      collections,
      selectedCollection: currentCollection && currentCollection[0],
      pageSize,
      currentPage,
      setSelectedCollection,
      resetCollection,
      changePageSize,
      hasNext,
      hasPrev,
      nextPage,
      prevPage,
      jumpToPage
    }}>
      {children}
    </CatalogContext.Provider>
  )
}