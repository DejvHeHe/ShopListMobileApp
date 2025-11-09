import React, { createContext, useContext, useState } from "react";
import { listArchived } from "../shopListProvider";

const ArchivedShopListContext = createContext();

export function ArchivedShopListProvider({ children }) {
  const [archivedShopLists, setArchivedShopLists] = useState([]);

  
  const refreshArchived = async () => {
    try {
      const data = await listArchived();
      setArchivedShopLists(data || []);
    } catch (err) {
      console.error("Chyba při načítání archivovaných seznamů:", err);
    }
  };

  return (
    <ArchivedShopListContext.Provider value={{ archivedShopLists, refreshArchived }}>
      {children}
    </ArchivedShopListContext.Provider>
  );
}

// ✅ Custom hook pro použití kontextu
export function useArchivedShopList() {
  const context = useContext(ArchivedShopListContext);
  if (!context) {
    throw new Error(
      "useArchivedShopList musí být použit uvnitř <ArchivedShopListProvider>"
    );
  }
  return context;
}
