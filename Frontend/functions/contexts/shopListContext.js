import React, { createContext, useContext, useState, useEffect } from "react";
import { list } from "../shopListProvider";
import { ShopListsMock } from "../../ShopListMock";
import { isMock } from "../../IS_MOCK";
import { useUserId } from "./userIdContext";

const ShopListContext = createContext();

export function ShopListProvider({ children }) {
  const [shopLists, setShopLists] = useState([]);
  const [status, setStatus] = useState("loading");
  const { userId } = useUserId(); 

  const refresh = async () => {
    if (!userId) return; 

    setStatus("loading");

    if (isMock) {
      // malý loading delay
      await new Promise(res => setTimeout(res, 800));

      const dtoIn = ShopListsMock
        .filter(list => list.isArchived === false)
        .filter(list => list.ownerId === userId);  
      setShopLists(dtoIn);
    } else {
      const data = await list();

   
      const filtered = data.filter(list => list.ownerId === userId);

      setShopLists(filtered);
    }

    setStatus("ready");
  };

  useEffect(() => {
    refresh();
  }, [userId]);

  return (
    <ShopListContext.Provider value={{ shopLists, refresh, status }}>
      {children}
    </ShopListContext.Provider>
  );
}

export function useShopList() {
  const context = useContext(ShopListContext);
  if (!context) throw new Error("useShopList must be inside <ShopListProvider>");
  return context;
}
