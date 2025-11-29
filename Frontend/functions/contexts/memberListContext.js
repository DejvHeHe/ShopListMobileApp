import React, { createContext, useContext, useState } from "react";
import { viewSharedTo } from "../shopListProvider";
import { isMock } from "../../IS_MOCK";
import { UsersMock } from "../../UserMock";

const MemberListContext = createContext();

export function MemberListProvider({ children }) {
  const [memberList, setMemberList] = useState([]);
  const [status, setStatus] = useState("ready"); 

  const refreshMemberList = async (shopListId) => {
    setStatus("loading");
    try {

      // 🔥 MOCK režim
      if (isMock) {
        const members = UsersMock.filter(user =>
          user.sharedShopList.includes(shopListId)
        );

        setMemberList(members);
        setStatus("ready");
        return;
      }

      // 🔥 Reálné API
      const members = await viewSharedTo(shopListId);
      setMemberList(members);

    } catch (err) {
      console.error("Chyba při načítání členů seznamu:", err);
    } finally {
      setStatus("ready");
    }
  };

  return (
    <MemberListContext.Provider
      value={{ memberList, refreshMemberList, status }}
    >
      {children}
    </MemberListContext.Provider>
  );
}

export function useMemberList() {
  const context = useContext(MemberListContext);
  if (!context) {
    throw new Error(
      "useMemberList musí být použit uvnitř <MemberListProvider>"
    );
  }
  return context;
}
