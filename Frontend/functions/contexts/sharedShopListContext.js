import React, { createContext, useContext, useState, useEffect } from "react";
import { listShared } from "../shopListProvider";
import { isMock } from "../../IS_MOCK";
import { UsersMock } from "../../UserMock";
import { ShopListsMock } from "../../ShopListMock";
import { useUserId } from "./userIdContext";

const SharedShopListContext = createContext();

export function SharedShopListProvider({ children }) {
  const [sharedShopLists, setSharedShopLists] = useState([]);
  const [status, setStatus] = useState("ready");
  const { userId } = useUserId();

  const refreshShared = async () => {
    setStatus("loading");

    try {
      if (isMock) {
        const user = UsersMock.find(u => u._id === userId);

        if (!user) {
          setSharedShopLists([]);
          return;
        }
        await new Promise(res => setTimeout(res, 800));

        const sharedIds = user.sharedShopList;

        const dtoIn = ShopListsMock.filter(list =>
          sharedIds.includes(list._id)
        );

        setSharedShopLists(dtoIn);
      } else {
        const data = await listShared();
        setSharedShopLists(data || []);
      }
    } catch (err) {
      console.error("Chyba při načítání sdílených seznamů:", err);
    } finally {
      setStatus("ready");
    }
  };

  useEffect(() => {
    refreshShared();
  }, [userId]);

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
