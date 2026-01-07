"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  TrayIcon,
  GitMergeIcon,
  RobotIcon,
  ClipboardTextIcon,
  ChartLineIcon,
  GearIcon,
  ShieldIcon,
  BellIcon,
} from "@phosphor-icons/react"

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { label: "Inbox", icon: TrayIcon },
    { label: "Merge queue", icon: GitMergeIcon },
    { label: "Agents", icon: RobotIcon },
    { label: "Reviews", icon: ClipboardTextIcon },
    { label: "Insights", icon: ChartLineIcon },
    { label: "Automations", icon: GearIcon },
    { label: "Protections", icon: ShieldIcon },
    { label: "Notifications", icon: BellIcon },
  ]

  return (
    <SidebarProvider className="bg-background">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton>
                        <Icon data-icon="inline-start" />
                        {item.label}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}

