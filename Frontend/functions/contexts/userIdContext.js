import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodeJWT } from "../decode";


const UserIdContext = createContext();

export function UserIdProvider({ children }) {
  const [userId, setUserId] = useState("");

  const getUserId = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const decoded = decodeJWT(token);
      setUserId(decoded.userId);
      console.log("userId:",userId)
    } catch (err) {
      console.error("Error while decoding JWT:", err);
    }
  };

  return (
    <UserIdContext.Provider value={{ userId, getUserId }}>
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
