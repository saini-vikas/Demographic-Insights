"use client"

import * as React from "react"
import { Settings, SunMedium, Check } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { SidebarMenuButton } from "@/components/ui/sidebar"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <Settings />
          <span className="max-md:text-lg">Settings</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end" className="min-w-[10rem] px-2 ml-2" onCloseAutoFocus={(e) => e.preventDefault()}>
        <DropdownMenuLabel className="flex items-center gap-2"><SunMedium size={16} />Theme</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center text-md justify-between cursor-pointer">
          Light
          {theme === "light" && <Check size={16} />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center text-md justify-between cursor-pointer">
          Dark
          {theme === "dark" && <Check size={16} />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center text-md justify-between cursor-pointer">
          System
          {theme === "system" && <Check size={16} />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
