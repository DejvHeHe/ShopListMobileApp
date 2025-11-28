import React, { createContext, useContext, useState, useEffect } from "react";
import { listArchived } from "../shopListProvider";
import { ShopListsMock } from "../../ShopListMock";
import { isMock } from "../../IS_MOCK";
import { useUserId } from "./userIdContext";

const ArchivedShopListContext = createContext();

export function ArchivedShopListProvider({ children }) {
  const [archivedShopLists, setArchivedShopLists] = useState([]);
  const [status, setStatus] = useState("loading");

  const { userId } = useUserId();  // 🔥 potřebujeme userId

  const refreshArchived = async () => {
    if (!userId) return; // čekáme na userId

    setStatus("loading");

    try {
      if (isMock) {
        await new Promise(res => setTimeout(res, 800));

        const dtoIn = ShopListsMock
          .filter(list => list.isArchived === true)
          .filter(list => list.ownerId === userId); // 🔥 filtrování podle uživatele

        setArchivedShopLists(dtoIn);

      } else {
        const data = await listArchived();

        const filtered = (data || []).filter(
          list => list.ownerId === userId
        );

        setArchivedShopLists(filtered);
      }

    } catch (err) {
      console.error("Chyba při načítání archivovaných seznamů:", err);

    } finally {
      setStatus("ready");
    }
  };

  useEffect(() => {
    refreshArchived();
  }, [userId]);   // 🔥 refresh při změně uživatele

  return (
    <ArchivedShopListContext.Provider
      value={{ archivedShopLists, refreshArchived, status }}
    >
      {children}
    </ArchivedShopListContext.Provider>
  );
}

export function useArchivedShopList() {
  const context = useContext(ArchivedShopListContext);
  if (!context) {
    throw new Error(
      "useArchivedShopList musí být použit uvnitř <ArchivedShopListProvider>"
    );
  }
  return context;
}
