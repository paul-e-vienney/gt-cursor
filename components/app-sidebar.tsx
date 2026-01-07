"use client"

import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
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
  MagnifyingGlassIcon,
  HexagonIcon,
  QuestionIcon,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [selectedWorkspace, setSelectedWorkspace] = useState("screenplay")
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
        <SidebarHeader className="border-b border-border">
          <div className="flex items-center gap-2 w-full">
            <Select value={selectedWorkspace} onValueChange={setSelectedWorkspace}>
              <SelectTrigger className="w-fit text-[13px] text-muted-foreground [&_svg]:text-muted-foreground border-transparent bg-transparent hover:bg-card hover:text-card-foreground hover:[&_svg]:text-card-foreground active:bg-[oklab(0.943853_0.00107113_0.000336707_/_0.06)] active:text-card-foreground active:[&_svg]:text-card-foreground rounded-[6px] whitespace-normal *:data-[slot=select-value]:line-clamp-none gap-2 min-w-fit">
                <HexagonIcon className="size-4 shrink-0" />
                <SelectValue placeholder="Select workspace" className="min-w-0 max-w-[calc(100%-2rem)] overflow-hidden text-ellipsis whitespace-nowrap capitalize" />
              </SelectTrigger>
              <SelectContent className="min-w-fit w-auto max-w-[300px]">
                <SelectItem value="screenplay">
                  <HexagonIcon className="size-4" />
                  Screenplay
                </SelectItem>
                <SelectItem value="graphite">
                  <HexagonIcon className="size-4" />
                  Graphite
                </SelectItem>
                <SelectItem value="anysphere">
                  <HexagonIcon className="size-4" />
                  Anysphere
                </SelectItem>
                <SelectItem value="cursor">
                  <HexagonIcon className="size-4" />
                  Cursor
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Search"
              className="text-muted-foreground [&_svg]:text-muted-foreground [&_svg]:size-4 hover:bg-card hover:text-card-foreground hover:[&_svg]:text-card-foreground active:bg-[oklab(0.943853_0.00107113_0.000336707_/_0.06)] active:text-card-foreground active:[&_svg]:text-card-foreground rounded-[6px]"
            >
              <MagnifyingGlassIcon />
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton isActive={item.label === "Agents"}>
                        <Icon data-icon="inline-start" />
                        {item.label}
                        {item.label === "Notifications" && (
                          <SidebarMenuBadge className="!text-muted-foreground peer-hover/menu-button:!text-muted-foreground peer-data-active/menu-button:!text-muted-foreground">4</SidebarMenuBadge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <Button
            variant="ghost"
            aria-label="Help"
            className="h-[28px] w-[28px] text-muted-foreground [&_svg]:text-muted-foreground [&_svg]:w-4 [&_svg]:h-4 hover:bg-card hover:text-card-foreground hover:[&_svg]:text-card-foreground active:bg-[oklab(0.943853_0.00107113_0.000336707_/_0.06)] active:text-card-foreground active:[&_svg]:text-card-foreground rounded-full p-0"
          >
            <QuestionIcon />
          </Button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
