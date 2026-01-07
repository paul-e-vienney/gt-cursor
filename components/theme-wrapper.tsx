"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { IconPackProvider } from "@/components/icon-pack-provider"
import { AppSidebar } from "@/components/app-sidebar"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark-cursor">
      <IconPackProvider defaultIconPack="phosphor">
        <AppSidebar>{children}</AppSidebar>
      </IconPackProvider>
    </ThemeProvider>
  )
}

