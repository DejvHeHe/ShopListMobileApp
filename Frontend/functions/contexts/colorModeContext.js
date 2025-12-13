import React, { createContext, useContext, useState } from "react";

const ColorModeContext = createContext();

export function ColorModeProvider({ children }) {
    const [colorMode, setColorMode] = useState(false);

    const switchMode = () => {
        setColorMode(prev => !prev);
    };

    return (
        <ColorModeContext.Provider value={{ colorMode, switchMode }}>
            {children}
        </ColorModeContext.Provider>
    );
}

export function useColorMode(){
    return useContext(ColorModeContext);
}
