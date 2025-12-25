import * as React from "react";

const ThemeProviderContext = React.createContext(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  disableTransitionOnChange = false,
}) {
  const [theme, setThemeState] = React.useState(() => {
    if (typeof window === "undefined") return defaultTheme;
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  React.useEffect(() => {
    const root = window.document.documentElement;

    if (disableTransitionOnChange) {
      root.classList.add("[&_*]:!transition-none");
      setTimeout(() => {
        root.classList.remove("[&_*]:!transition-none");
      }, 0);
    }

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme, disableTransitionOnChange]);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (theme) => {
        localStorage.setItem(storageKey, theme);
        setThemeState(theme);
      },
    }),
    [theme, storageKey]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
