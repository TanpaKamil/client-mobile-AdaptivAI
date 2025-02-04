import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    background: "#262626",
    text: "#FFFFFF",
    fonts: {
      regular: "InterRegular",
      bold: "InterBold",
    },
    gradientColors: ["#FBA459", "#D95E6F"],
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
