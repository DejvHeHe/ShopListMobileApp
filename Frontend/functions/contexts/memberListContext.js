import React, { createContext, useContext, useState } from "react";
import { viewSharedTo } from "../shopListProvider";

const MemberListContext = createContext();

export function MemberListProvider({ children }) {
  const [memberList, setMemberList] = useState([]);
  const [status, setStatus] = useState("ready"); // "ready" | "loading"

  // Načte členy konkrétního seznamu
  const refreshMemberList = async (shopListId) => {
    setStatus("loading");
    try {
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
