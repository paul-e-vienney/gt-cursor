"use client"

import * as React from "react"

type Theme = "light" | "dark" | "dark-cursor" | "dark-graphite"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark-cursor",
  setTheme: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark-cursor",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(
    () => (typeof window !== "undefined" && (localStorage.getItem(storageKey) as Theme)) || defaultTheme
  )

  React.useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme classes
    root.classList.remove("light", "dark", "dark-cursor", "dark-graphite")

    // Add the current theme class
    if (theme === "light") {
      root.classList.remove("dark", "dark-cursor", "dark-graphite")
    } else if (theme === "dark") {
      root.classList.add("dark")
      root.classList.remove("dark-cursor", "dark-graphite")
    } else if (theme === "dark-cursor") {
      root.classList.add("dark-cursor")
      root.classList.remove("dark", "dark-graphite")
    } else if (theme === "dark-graphite") {
      root.classList.add("dark-graphite")
      root.classList.remove("dark", "dark-cursor")
    }

    // Save to localStorage
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const value = {
    theme,
    setTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

