import React, { createContext, useContext, useState, useEffect } from "react";
import { list } from "../shopListProvider";
import { ShopListsMock } from "../../ShopListMock";
import { isMock } from "../../IS_MOCK";

const ShopListContext = createContext();

export function ShopListProvider({ children }) {
  const [shopLists, setShopLists] = useState([]);
  const [status, setStatus] = useState('loading');

  

  const refresh = async () => {
    setStatus('loading');
    if (isMock) {
      await new Promise(res => setTimeout(res, 1000));
      const dtoIn = ShopListsMock.filter(list => list.isArchived === false);
      setShopLists(dtoIn);
    } else {
      const data = await list();
      setShopLists(data);
    }
    setStatus('ready');
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ShopListContext.Provider value={{ shopLists, refresh, status }}>
      {children}
    </ShopListContext.Provider>
  );
}

export function useShopList() {
  const context = useContext(ShopListContext);
  if (!context) throw new Error("useShopList musí být uvnitř ShopListProvider");
  return context;
}
