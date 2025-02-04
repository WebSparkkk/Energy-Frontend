import React, { createContext, useContext, useState } from 'react';

type TTheme = "green" | "purple" | "blue"
type TThemeProviderValue = {
  theme: TTheme;
  setTheme: (colorName: TTheme) => void;
};

const ThemeContext = createContext<TThemeProviderValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<TTheme>("green");

  const setTheme = (colorName: TTheme) => {
    setCurrentTheme(colorName)
    document.body.setAttribute("data-theme",currentTheme)
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme:currentTheme, 
        setTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}