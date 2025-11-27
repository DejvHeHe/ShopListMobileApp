import React, { createContext, useContext, useState, useEffect } from "react";
import { listArchived } from "../shopListProvider";
import { ShopListsMock } from "../../ShopListMock";

const ArchivedShopListContext = createContext();

export function ArchivedShopListProvider({ children }) {
  const [archivedShopLists, setArchivedShopLists] = useState([]);
  const [status, setStatus] = useState("loading"); // "ready" | "loading"

  const isMock = process.env.IS_MOCK;

  const refreshArchived = async () => {
    setStatus("loading");
    try {
      if (isMock) {
        // simulace načítání mock dat
        await new Promise(res => setTimeout(res, 1000));
        const dtoIn = ShopListsMock.filter(list => list.isArchived === true);
        setArchivedShopLists(dtoIn);
      } else {
        const data = await listArchived();
        setArchivedShopLists(data || []);
      }
    } catch (err) {
      console.error("Chyba při načítání archivovaných seznamů:", err);
    } finally {
      setStatus("ready");
    }
  };

  useEffect(() => {
    refreshArchived();
  }, []);

  return (
    <ArchivedShopListContext.Provider
      value={{ archivedShopLists, refreshArchived, status }}
    >
      {children}
    </ArchivedShopListContext.Provider>
  );
}

// Custom hook
export function useArchivedShopList() {
  const context = useContext(ArchivedShopListContext);
  if (!context) {
    throw new Error(
      "useArchivedShopList musí být použit uvnitř <ArchivedShopListProvider>"
    );
  }
  return context;
}
