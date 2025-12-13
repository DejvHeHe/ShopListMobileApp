import React, { createContext, useContext, useState } from "react";
import cs from "../../cs";
import en from "../../en";

const translations = { cs, en };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("cs");

  const t = (key) => translations[lang][key] || key;

 
  const switchLanguage = () => {
    setLang((prev) => (prev === "cs" ? "en" : "cs"));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, language: lang, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
