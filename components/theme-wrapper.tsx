"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark-cursor">
      <AppSidebar>{children}</AppSidebar>
    </ThemeProvider>
  )
}

