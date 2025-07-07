import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Safely get theme from localStorage during initialization
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme | null;
      return stored && (stored === "light" || stored === "dark")
        ? stored
        : "light";
    }
    return "light";
  });

  // Apply theme to DOM and save to localStorage when theme changes
  useEffect(() => {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove("light", "dark");

    // Add current theme class
    root.classList.add(theme);

    // Save to localStorage
    localStorage.setItem("theme", theme);

    // Debug log to verify theme is being applied
    console.log("Theme applied:", theme, "Classes:", root.classList.toString());
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
