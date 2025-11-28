import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodeJWT } from "../decode";
import { isMock } from "../../IS_MOCK";

const UserIdContext = createContext();

export function UserIdProvider({ children }) {
  const [userId, setUserId] = useState("");

  const getUserId = async () => {
    try {

      // MOCK MODE
      if (isMock) {
        console.log("Mock mode: skipping token decode");
        return; // userId nastavuje MockLoginPage
      }

      // NORMAL MODE
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const decoded = decodeJWT(token);
      setUserId(decoded.userId);
      console.log("userId:", decoded.userId);

    } catch (err) {
      console.error("Error while decoding JWT:", err);
    }
  };

  return (
    <UserIdContext.Provider value={{ userId, setUserId, getUserId }}>
      {children}
    </UserIdContext.Provider>
  );
}

export function useUserId() {
  const context = useContext(UserIdContext);
  if (!context) {
    throw new Error("useUserId must be used within a <UserIdProvider>");
  }
  return context;
}
