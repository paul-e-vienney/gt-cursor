"use client"

import * as React from "react"

export type IconPack = "phosphor" | "lucide"

type IconPackProviderProps = {
  children: React.ReactNode
  defaultIconPack?: IconPack
  storageKey?: string
}

type IconPackProviderState = {
  iconPack: IconPack
  setIconPack: (iconPack: IconPack) => void
}

const initialState: IconPackProviderState = {
  iconPack: "phosphor",
  setIconPack: () => null,
}

const IconPackProviderContext = React.createContext<IconPackProviderState>(initialState)

export function IconPackProvider({
  children,
  defaultIconPack = "phosphor",
  storageKey = "icon-pack",
  ...props
}: IconPackProviderProps) {
  const [iconPack, setIconPack] = React.useState<IconPack>(
    () => (typeof window !== "undefined" && (localStorage.getItem(storageKey) as IconPack)) || defaultIconPack
  )

  React.useEffect(() => {
    // Save to localStorage
    localStorage.setItem(storageKey, iconPack)
  }, [iconPack, storageKey])

  const value = {
    iconPack,
    setIconPack,
  }

  return (
    <IconPackProviderContext.Provider {...props} value={value}>
      {children}
    </IconPackProviderContext.Provider>
  )
}

export const useIconPack = () => {
  const context = React.useContext(IconPackProviderContext)

  if (context === undefined)
    throw new Error("useIconPack must be used within an IconPackProvider")

  return context
}

