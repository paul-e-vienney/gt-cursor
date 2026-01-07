"use client"

import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputAction,
} from "@/components/ui/prompt-input";
import { ArrowUpIcon } from "@phosphor-icons/react";

export default function Page() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col h-full">
      <header className="gap-2 p-2 border-b border-border flex items-center">
        <SidebarTrigger 
          size="icon"
          className="text-muted-foreground [&_svg]:text-muted-foreground [&_svg]:size-4 hover:bg-card hover:text-card-foreground hover:[&_svg]:text-card-foreground active:bg-[oklab(0.943853_0.00107113_0.000336707_/_0.06)] active:text-card-foreground active:[&_svg]:text-card-foreground rounded-[6px]"
        />
        <h1 className="text-sm font-medium">Agents</h1>
      </header>
      <div className="flex-1 flex items-center justify-center p-4">
        <PromptInput 
          className="w-[574px] h-[132px] relative" 
          maxHeight={132}
          value={inputValue}
          onValueChange={setInputValue}
        >
          <PromptInputTextarea placeholder="Ask a question or collaborate on your next PR" disableAutosize />
          <PromptInputActions className="absolute bottom-2 right-2">
            <PromptInputAction tooltip="Send">
              <div
                onClick={(e) => {
                  if (!inputValue.trim()) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
                className={`h-7 w-7 rounded-[6px] flex items-center justify-center transition-colors ${
                  !inputValue.trim() 
                    ? "bg-[oklab(0.943853_0.00107113_0.000336707_/_0.2)] cursor-not-allowed pointer-events-none" 
                    : "bg-white hover:bg-white/90 cursor-pointer"
                }`}
              >
                <ArrowUpIcon className="size-4" style={{ color: 'var(--background)' }} />
              </div>
            </PromptInputAction>
          </PromptInputActions>
        </PromptInput>
      </div>
    </div>
  );
}