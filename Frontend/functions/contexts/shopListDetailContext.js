import React, { createContext, useContext, useState, useEffect } from "react";
import { get } from "../shopListProvider";
import { ShopListsMock } from "../../ShopListMock";
import { isMock } from "../../IS_MOCK";

const ShopListDetailContext = createContext();


export function ShopListDetailProvider({ children, shopListId }) {
  const [shopList, setShopList] = useState(null);
  const [status, setStatus] = useState("loading");

 
  const refresh = async () => {
    if (!shopListId) return; 

    setStatus("loading");
    try {
      let data;

      if (isMock) {
        // simulace latence pro mock
        await new Promise(r => setTimeout(r, 500));
        data = ShopListsMock.find(sl => sl._id === shopListId);
      } else {
        // reálné API volání
        data = await get(shopListId);
      }

      setShopList(data);
    } catch (err) {
      console.error("Chyba při načítání detailu shopListu:", err);
      setShopList(null);
    } finally {
      setStatus("ready");
    }
  };

  // Načíst data při změně shopListId
  useEffect(() => {
    refresh();
  }, [shopListId]);

  return (
    <ShopListDetailContext.Provider value={{ shopList, status, refresh }}>
      {children}
    </ShopListDetailContext.Provider>
  );
}

/**
 * Hook pro přístup k detailu ShopListu uvnitř komponent.
 */
export function useShopListDetail() {
  const context = useContext(ShopListDetailContext);
  if (!context) {
    throw new Error("useShopListDetail musí být uvnitř <ShopListDetailProvider>");
  }
  return context;
}
