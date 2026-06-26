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
    blue: 0xD9E8E2, // Mystic Mint
    purple: 0xFF9932, // Deep Saffron
    green: 0xFFC801, // Forsythia
  }[theme];

  const themeColorStr = {
    blue: "#D9E8E2", // Mystic Mint
    purple: "#FF9932", // Deep Saffron
    green: "#FFC801", // Forsythia
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
