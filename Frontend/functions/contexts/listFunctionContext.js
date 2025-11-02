import React, { createContext, useContext, useState } from "react";

// Vytvoření kontextu
const ListFunctionContext = createContext();

// Provider komponenta
export function ListFunctionProvider({ children }) {
  const [listFunction, setListFunction] = useState("list");

  return (
    <ListFunctionContext.Provider value={{ listFunction, setListFunction }}>
      {children}
    </ListFunctionContext.Provider>
  );
}

// Hook pro použití kontextu
export function useListFunction() {
  const context = useContext(ListFunctionContext);
  if (!context) {
    throw new Error("useListFunction musí být použit uvnitř <ListFunctionProvider>");
  }
  return context;
}
