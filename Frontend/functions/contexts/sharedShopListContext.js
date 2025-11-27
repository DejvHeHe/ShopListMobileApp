import React, { createContext, useContext, useState } from "react";
import { listShared } from "../shopListProvider";

const SharedShopListContext = createContext();

export function SharedShopListProvider({ children }) {
  const [sharedShopLists, setSharedShopLists] = useState([]);
  const [status, setStatus] = useState("ready"); 

  const refreshShared = async () => {
    setStatus("loading");
    try {
      const data = await listShared();
      setSharedShopLists(data);
    } catch (err) {
      console.error("Chyba při načítání sdílených seznamů:", err);
    } finally {
      setStatus("ready");
    }
  };

  return (
    <SharedShopListContext.Provider
      value={{ sharedShopLists, refreshShared, status }}
    >
      {children}
    </SharedShopListContext.Provider>
  );
}

export function useSharedShopList() {
  const context = useContext(SharedShopListContext);
  if (!context) {
    throw new Error(
      "useSharedShopList musí být použit uvnitř <SharedShopListProvider>"
    );
  }
  return context;
}
