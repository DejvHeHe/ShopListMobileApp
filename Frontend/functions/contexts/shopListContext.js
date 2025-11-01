import React, { createContext, useContext, useState } from "react";
import { list } from "../shopListProvider"; 


const ShopListContext = createContext();


export function ShopListProvider({ children }) {
  const [shopLists, setShopLists] = useState([]);

  const refresh = async () => {
    const data = await list();
    setShopLists(data);
  };

  return (
    <ShopListContext.Provider value={{ shopLists, refresh }}>
      {children}
    </ShopListContext.Provider>
  );
}


export function useShopList() {
  const context = useContext(ShopListContext);
  if (!context) {
    throw new Error("useShopList musí být použit uvnitř <ShopListProvider>");
  }
  return context;
}
