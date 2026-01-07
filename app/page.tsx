"use client"

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <div className="flex flex-col h-full">
      <header className="gap-2 p-2 border-b border-border flex items-center">
        <SidebarTrigger 
          size="icon"
          className="text-muted-foreground [&_svg]:text-muted-foreground [&_svg]:size-4 hover:bg-card hover:text-card-foreground hover:[&_svg]:text-card-foreground active:bg-[oklab(0.943853_0.00107113_0.000336707_/_0.06)] active:text-card-foreground active:[&_svg]:text-card-foreground rounded-[6px]"
        />
        <h1 className="text-sm font-medium">Agents</h1>
      </header>
    </div>
  );
}