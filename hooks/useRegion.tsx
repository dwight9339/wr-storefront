import { useRegions } from "medusa-react";
import { Region } from "@medusajs/medusa";
import { useEffect, useState } from "react";

const useRegion = () => {
  const { regions } = useRegions();
  const [userRegion, setUserRegion] = useState<Region>();
  
  // To do: Fetch region based on user's location
  const getUserRegion = () => {
    setUserRegion(regions && regions[0]);
  }

  useEffect(() => {
    if (!userRegion) getUserRegion();
  }, [regions, userRegion]);

  return { userRegion };
}

export default useRegion;