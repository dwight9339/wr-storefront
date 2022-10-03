import { useRegions } from "medusa-react";
import { Region } from "@medusajs/medusa";
import { useEffect, useState } from "react";

const useRegion = () => {
  const { regions } = useRegions();
  const [userRegion, setUserRegion] = useState<Region>({
    name: "US",
    currency_code: "usd",
    tax_rate: 0
  } as Region);
  
  const updateUserRegion = () => {
    if (!regions?.length) return;
    setUserRegion(regions[0]);
  }

  useEffect(() => {
    updateUserRegion();
  }, [regions]);

  return { userRegion };
}

export default useRegion;