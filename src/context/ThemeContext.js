import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [textColor, setTextColor] = useState("white");
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ textColor, setTextColor, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
