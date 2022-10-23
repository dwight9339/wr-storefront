import { useState, createContext, useContext, useEffect } from "react";
import { useRegion as useMedusaRegion, useRegions } from "medusa-react";
import { Region } from "@medusajs/medusa";

interface RegionState {
  userRegion: Region | undefined;
  availableRegions: Region[] | undefined;
}

interface RegionContext extends RegionState {
  updateUserRegion: (regionId: string) => void;
}

const RegionContext = createContext<RegionContext | null>(null);

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within RegionProvider");
  }

  return context;
}

interface ProviderProps {
  children: JSX.Element;
}

export const RegionProvider = ({ children }: ProviderProps) => {
  const { regions } = useRegions();
  const [userRegion, setUserRegion] = useState<Region>();

  useEffect(() => {
    if (regions && !userRegion) {
      setUserRegion(regions[0]);
    }
  }, [regions, userRegion]);

  const updateUserRegion = (regionId: string) => {
    if (!regions) return;
    setUserRegion(regions.find((region) => region.id === regionId));
  }

  return (
    <RegionContext.Provider value={{
      userRegion,
      availableRegions: regions,
      updateUserRegion
    }}>
      {children}
    </RegionContext.Provider>
  )
}