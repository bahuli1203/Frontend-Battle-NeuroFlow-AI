"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "blue" | "purple" | "green";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  themeHex: number; // For Three.js materials
  themeColorStr: string; // Tailwind color matching
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("purple");

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  useEffect(() => {
    // Add theme class to html element
    const root = document.documentElement;
    root.classList.remove("theme-blue", "theme-purple", "theme-green");
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  // Hex values for Three.js WebGL scenes
  const themeHex = {
    blue: 0x00D4FF,
    purple: 0x7B61FF,
    green: 0x00FFB2,
  }[theme];

  const themeColorStr = {
    blue: "#00D4FF",
    purple: "#7B61FF",
    green: "#00FFB2",
  }[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeHex, themeColorStr }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
