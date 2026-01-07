"use client"

import * as React from "react"
import * as PhosphorIcons from "@phosphor-icons/react"
import * as LucideIcons from "lucide-react"
import { useIconPack } from "@/components/icon-pack-provider"

// Icon name mappings from Phosphor (without Icon suffix) to Lucide
const iconMappings: Record<string, string> = {
  ArrowUpIcon: "ArrowUp",
  PaperclipIcon: "Paperclip",
  GearIcon: "Settings",
  PaletteIcon: "Palette",
  CheckIcon: "Check",
  CaretRightIcon: "ChevronRight",
  CaretDownIcon: "ChevronDown",
  CaretUpIcon: "ChevronUp",
  SidebarIcon: "Menu",
  XIcon: "X",
  TrayIcon: "Inbox",
  GitMergeIcon: "GitMerge",
  RobotIcon: "Bot",
  ClipboardTextIcon: "ClipboardText",
  ChartLineIcon: "TrendingUp",
  ShieldIcon: "Shield",
  BellIcon: "Bell",
  MagnifyingGlassIcon: "Search",
  HexagonIcon: "Hexagon",
  QuestionIcon: "HelpCircle",
}

type IconProps = React.ComponentProps<"svg"> & {
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
}

// Generic icon component that switches based on icon pack
export function createIcon(phosphorName: string, lucideName?: string) {
  // Phosphor icons are named without "Icon" suffix, but we export them with it
  const PhosphorIconName = phosphorName.replace(/Icon$/, "")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PhosphorIcon = (PhosphorIcons as any)[PhosphorIconName] as React.ComponentType<IconProps> | undefined
  const LucideIconName = lucideName || iconMappings[phosphorName] || phosphorName.replace(/Icon$/, "")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LucideIcon = LucideIconName ? ((LucideIcons as any)[LucideIconName] as React.ComponentType<React.ComponentProps<"svg">> | undefined) : null

  return function DynamicIcon(props: IconProps) {
    const { iconPack } = useIconPack()
    const { weight, ...restProps } = props

    if (iconPack === "lucide" && LucideIcon) {
      return <LucideIcon {...restProps} />
    }

    // Default to Phosphor
    if (PhosphorIcon) {
      return <PhosphorIcon weight={weight} {...restProps} />
    }

    return null
  }
}

// Export individual icon components
// Note: Phosphor exports icons without "Icon" suffix (e.g., "ArrowUp", not "ArrowUpIcon")
export const ArrowUpIcon = createIcon("ArrowUpIcon", "ArrowUp")
export const PaperclipIcon = createIcon("PaperclipIcon", "Paperclip")
export const GearIcon = createIcon("GearIcon", "Settings")
export const PaletteIcon = createIcon("PaletteIcon", "Palette")
export const CheckIcon = createIcon("CheckIcon", "Check")
export const CaretRightIcon = createIcon("CaretRightIcon", "ChevronRight")
export const CaretDownIcon = createIcon("CaretDownIcon", "ChevronDown")
export const CaretUpIcon = createIcon("CaretUpIcon", "ChevronUp")
export const SidebarIcon = createIcon("SidebarIcon", "Menu")
export const XIcon = createIcon("XIcon", "X")
export const TrayIcon = createIcon("TrayIcon", "Inbox")
export const GitMergeIcon = createIcon("GitMergeIcon", "GitMerge")
export const RobotIcon = createIcon("RobotIcon", "Bot")
export const ClipboardTextIcon = createIcon("ClipboardTextIcon", "ClipboardText")
export const ChartLineIcon = createIcon("ChartLineIcon", "TrendingUp")
export const ShieldIcon = createIcon("ShieldIcon", "Shield")
export const BellIcon = createIcon("BellIcon", "Bell")
export const MagnifyingGlassIcon = createIcon("MagnifyingGlassIcon", "Search")
export const HexagonIcon = createIcon("HexagonIcon", "Hexagon")
export const QuestionIcon = createIcon("QuestionIcon", "HelpCircle")

