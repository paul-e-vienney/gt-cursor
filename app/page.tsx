"use client"

import { useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputAction,
} from "@/components/ui/prompt-input";
import { ArrowUpIcon, PaperclipIcon, GearIcon, PaletteIcon, CheckIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PromptSuggestion } from "@/components/ui/prompt-suggestion";
import { useTheme } from "@/components/theme-provider";
import { useIconPack } from "@/components/icon-pack-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState("Claude Sonnet 4.5");
  const [selectedRepo, setSelectedRepo] = useState("gt-cursor");
  const [selectedBranch, setSelectedBranch] = useState("main");
  const { theme, setTheme } = useTheme();
  const { iconPack, setIconPack } = useIconPack();
  const [density, setDensity] = useState<"default" | "comfortable">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("density") as "default" | "comfortable") || "default";
    }
    return "default";
  });
  const [fontSize, setFontSize] = useState<"default" | "large">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("fontSize") as "default" | "large") || "default";
    }
    return "default";
  });
  
  const themes: Array<{ value: "light" | "dark" | "dark-cursor" | "dark-graphite"; label: string }> = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "dark-cursor", label: "Dark Cursor" },
    { value: "dark-graphite", label: "Dark Graphite" },
  ];
  
  const densities: Array<{ value: "default" | "comfortable"; label: string }> = [
    { value: "default", label: "Default" },
    { value: "comfortable", label: "Comfortable" },
  ];
  
  const iconPacks: Array<{ value: "phosphor" | "lucide"; label: string }> = [
    { value: "phosphor", label: "Phosphor" },
    { value: "lucide", label: "Lucide" },
  ];
  
  const fontSizes: Array<{ value: "default" | "large"; label: string }> = [
    { value: "default", label: "Default" },
    { value: "large", label: "Large" },
  ];
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("density", density);
      document.documentElement.setAttribute("data-density", density);
    }
  }, [density]);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fontSize", fontSize);
      document.documentElement.setAttribute("data-font-size", fontSize);
    }
  }, [fontSize]);
  
  const modelOptions = {
    "Claude Sonnet 4.5": "Claude Sonnet 4.5",
    "Claude Opus 4.5": "Claude Opus 4.5",
    "Claude Haiku 4.5": "Claude Haiku 4.5",
  };

  return (
    <div className="flex flex-col h-full">
      <header className="gap-2 border-b border-border flex items-center relative z-10" style={{ padding: 'var(--density-padding)' }}>
        <SidebarTrigger 
          size="icon"
          className="text-muted-foreground [&_svg]:text-muted-foreground [&_svg]:size-4 hover:bg-card hover:text-card-foreground hover:[&_svg]:text-card-foreground active:bg-[oklab(0.943853_0.00107113_0.000336707_/_0.06)] active:text-card-foreground active:[&_svg]:text-card-foreground rounded-[6px] relative z-10"
        />
        <h1 className="text-sm font-medium">Agents</h1>
        <div className="flex-1" />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Settings"
          className="text-muted-foreground [&_svg]:text-muted-foreground [&_svg]:size-4 hover:bg-card hover:text-card-foreground hover:[&_svg]:text-card-foreground active:bg-[oklab(0.943853_0.00107113_0.000336707_/_0.06)] active:text-card-foreground active:[&_svg]:text-card-foreground rounded-[6px] relative z-10"
        >
          <GearIcon />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="text-muted-foreground [&_svg]:text-muted-foreground [&_svg]:size-4 hover:bg-card hover:text-card-foreground hover:[&_svg]:text-card-foreground active:bg-[oklab(0.943853_0.00107113_0.000336707_/_0.06)] active:text-card-foreground active:[&_svg]:text-card-foreground rounded-[6px] relative z-10 size-[var(--density-button-height)] flex items-center justify-center"
            aria-label="Switch theme"
          >
            <PaletteIcon weight="fill" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-fit w-auto">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="whitespace-normal">
                <div className="flex items-center justify-between gap-4 min-w-0 w-full">
                  <span>Theme</span>
                  {themes.find(t => t.value === theme) && (
                    <span className="text-muted-foreground text-xs shrink-0">
                      {themes.find(t => t.value === theme)?.label}
                    </span>
                  )}
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {themes.map((themeOption) => (
                  <DropdownMenuItem
                    key={themeOption.value}
                    onClick={() => setTheme(themeOption.value)}
                    className="flex items-center justify-between"
                  >
                    <span>{themeOption.label}</span>
                    {theme === themeOption.value && (
                      <CheckIcon className="size-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="whitespace-normal">
                <div className="flex items-center justify-between gap-4 min-w-0 w-full">
                  <span>Density</span>
                  {densities.find(d => d.value === density) && (
                    <span className="text-muted-foreground text-xs shrink-0">
                      {densities.find(d => d.value === density)?.label}
                    </span>
                  )}
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {densities.map((densityOption) => (
                  <DropdownMenuItem
                    key={densityOption.value}
                    onClick={() => setDensity(densityOption.value)}
                    className="flex items-center justify-between"
                  >
                    <span>{densityOption.label}</span>
                    {density === densityOption.value && (
                      <CheckIcon className="size-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="whitespace-normal">
                <div className="flex items-center justify-between gap-4 min-w-0 w-full">
                  <span>Icon Pack</span>
                  {iconPacks.find(p => p.value === iconPack) && (
                    <span className="text-muted-foreground text-xs shrink-0">
                      {iconPacks.find(p => p.value === iconPack)?.label}
                    </span>
                  )}
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {iconPacks.map((iconPackOption) => (
                  <DropdownMenuItem
                    key={iconPackOption.value}
                    onClick={() => setIconPack(iconPackOption.value)}
                    className="flex items-center justify-between"
                  >
                    <span>{iconPackOption.label}</span>
                    {iconPack === iconPackOption.value && (
                      <CheckIcon className="size-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="whitespace-normal">
                <div className="flex items-center justify-between gap-4 min-w-0 w-full">
                  <span>Font</span>
                  {fontSizes.find(f => f.value === fontSize) && (
                    <span className="text-muted-foreground text-xs shrink-0">
                      {fontSizes.find(f => f.value === fontSize)?.label}
                    </span>
                  )}
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {fontSizes.map((fontSizeOption) => (
                  <DropdownMenuItem
                    key={fontSizeOption.value}
                    onClick={() => setFontSize(fontSizeOption.value)}
                    className="flex items-center justify-between"
                  >
                    <span>{fontSizeOption.label}</span>
                    {fontSize === fontSizeOption.value && (
                      <CheckIcon className="size-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4 -mt-12">
        <div className="w-[574px] flex flex-col gap-1">
          <h2 className="text-[24px] font-medium text-center mb-8 tracking-[0.38px]">Create your first pull request</h2>
          <div className="flex gap-2 pl-2">
            <Select value={selectedRepo} onValueChange={(value) => value && setSelectedRepo(value)}>
              <SelectTrigger className="w-fit text-muted-foreground [&_svg]:text-muted-foreground border-transparent bg-transparent hover:text-card-foreground hover:[&_svg]:text-card-foreground active:bg-[oklab(0.943853_0.00107113_0.000336707_/_0.06)] active:text-card-foreground active:[&_svg]:text-card-foreground rounded-[6px] whitespace-normal *:data-[slot=select-value]:line-clamp-none gap-2 min-w-fit [&>svg:last-of-type]:!rotate-0 data-[open]:[&>svg:last-of-type]:!rotate-0 aria-expanded:[&>svg:last-of-type]:!rotate-0 px-0 h-[var(--density-button-height)] items-center">
                <SelectValue className="min-w-0 max-w-[calc(100%-2rem)] overflow-hidden text-ellipsis whitespace-nowrap" />
              </SelectTrigger>
              <SelectContent className="min-w-fit w-auto max-w-[300px]" side="bottom" sideOffset={8} flip={false}>
                <SelectItem value="gt-cursor" className="pl-2">gt-cursor</SelectItem>
                <SelectItem value="other-repo" className="pl-2">other-repo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedBranch} onValueChange={(value) => value && setSelectedBranch(value)}>
              <SelectTrigger className="w-fit text-muted-foreground [&_svg]:text-muted-foreground border-transparent bg-transparent hover:text-card-foreground hover:[&_svg]:text-card-foreground active:bg-[oklab(0.943853_0.00107113_0.000336707_/_0.06)] active:text-card-foreground active:[&_svg]:text-card-foreground rounded-[6px] whitespace-normal *:data-[slot=select-value]:line-clamp-none gap-2 min-w-fit [&>svg:last-of-type]:!rotate-0 data-[open]:[&>svg:last-of-type]:!rotate-0 aria-expanded:[&>svg:last-of-type]:!rotate-0 px-0 h-[var(--density-button-height)] items-center">
                <SelectValue className="min-w-0 max-w-[calc(100%-2rem)] overflow-hidden text-ellipsis whitespace-nowrap" />
              </SelectTrigger>
              <SelectContent className="min-w-fit w-auto max-w-[300px]" side="bottom" sideOffset={8} flip={false}>
                <SelectItem value="main" className="pl-2">main</SelectItem>
                <SelectItem value="develop" className="pl-2">develop</SelectItem>
                <SelectItem value="feature/new-feature" className="pl-2">feature/new-feature</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <PromptInput 
            className="w-[574px] h-[132px] relative" 
            maxHeight={132}
            value={inputValue}
            onValueChange={setInputValue}
          >
            <PromptInputTextarea placeholder="Ask a question or collaborate on your next PR" disableAutosize />
            <div className="absolute bottom-2 left-2">
              <Select value={selectedModel} onValueChange={(value) => value && setSelectedModel(value)}>
                <SelectTrigger className="w-fit text-muted-foreground [&_svg]:text-muted-foreground border-transparent bg-transparent hover:bg-card hover:text-card-foreground hover:[&_svg]:text-card-foreground active:bg-[oklab(0.943853_0.00107113_0.000336707_/_0.06)] active:text-card-foreground active:[&_svg]:text-card-foreground rounded-[6px] whitespace-normal *:data-[slot=select-value]:line-clamp-none gap-2 min-w-fit [&>svg:last-of-type]:!rotate-0 data-[open]:[&>svg:last-of-type]:!rotate-0 aria-expanded:[&>svg:last-of-type]:!rotate-0 px-2">
                  <SelectValue className="min-w-0 max-w-[calc(100%-2rem)] overflow-hidden text-ellipsis whitespace-nowrap">
                    {modelOptions[selectedModel as keyof typeof modelOptions] || selectedModel}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="min-w-fit w-auto max-w-[300px]" side="bottom" sideOffset={8} flip={false}>
                  <SelectItem value="Claude Sonnet 4.5" className="pl-2">Claude Sonnet 4.5</SelectItem>
                  <SelectItem value="Claude Opus 4.5" className="pl-2">Claude Opus 4.5</SelectItem>
                  <SelectItem value="Claude Haiku 4.5" className="pl-2">Claude Haiku 4.5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <PromptInputActions className="absolute bottom-2 right-2">
              <PromptInputAction tooltip="Attach">
                <div
                  className="h-[var(--density-button-height)] w-[var(--density-button-height)] rounded-[6px] flex items-center justify-center transition-colors bg-transparent hover:bg-card hover:text-card-foreground cursor-pointer group"
                >
                  <PaperclipIcon className="size-4 text-muted-foreground group-hover:text-card-foreground transition-colors" />
                </div>
              </PromptInputAction>
              <div
                onClick={(e) => {
                  if (!inputValue.trim()) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
                className={`h-[var(--density-button-height)] w-[var(--density-button-height)] rounded-[6px] flex items-center justify-center transition-colors ${
                  !inputValue.trim() 
                    ? "bg-[oklab(0.943853_0.00107113_0.000336707_/_0.2)] cursor-not-allowed pointer-events-none" 
                    : "bg-foreground hover:bg-foreground/90 cursor-pointer"
                }`}
              >
                <ArrowUpIcon 
                  className={`size-4 ${
                    !inputValue.trim() 
                      ? "text-muted-foreground" 
                      : "text-background"
                  }`} 
                />
              </div>
            </PromptInputActions>
          </PromptInput>
        </div>
        <div className="flex gap-2 justify-center flex-wrap max-w-[574px]">
          <PromptSuggestion onClick={() => setInputValue("Find and fix a bug")} className="bg-muted dark-cursor:bg-[rgb(27,26,21)] dark-graphite:bg-[rgb(27,27,27)] text-muted-foreground">
            Find and fix a bug
          </PromptSuggestion>
          <PromptSuggestion onClick={() => setInputValue("Optimize performance")} className="bg-muted dark-cursor:bg-[rgb(27,26,21)] dark-graphite:bg-[rgb(27,27,27)] text-muted-foreground">
            Optimize performance
          </PromptSuggestion>
          <PromptSuggestion onClick={() => setInputValue("Update missing README section")} className="bg-muted dark-cursor:bg-[rgb(27,26,21)] dark-graphite:bg-[rgb(27,27,27)] text-muted-foreground">
            Update missing README section
          </PromptSuggestion>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">Powered by Claude Code · $10 credit applied</p>
      </div>
    </div>
  );
}