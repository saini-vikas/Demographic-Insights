"use client"
import { Globe, PanelLeft, X } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarHeaderContent() {
  const { open, setOpen, setOpenMobile } = useSidebar()

  return (
    <div className="relative flex items-center h-8">
      <div className="flex items-center gap-2 px-1.5">
        <div className="group/globe flex items-center relative gap-3">
          {open ? <Globe className="h-5 w-5 transition-opacity" /> : <Globe className="h-5 w-5 transition-opacity group-hover/globe:opacity-0" />}
          <span className="font-bold text-lg md:hidden">Demographic Insights</span>
          {!open && (
            <PanelLeft
              onClick={() => setOpen(true)}
              className="absolute inset-0 h-5 w-5 opacity-0 transition-opacity group-hover/globe:opacity-100 cursor-pointer"
            />
          )}
        </div>
      </div>
      {open && (
        <button onClick={() => setOpen(false)} className="ml-auto rounded p-2 cursor-pointer hover:bg-muted hidden md:block">
          <PanelLeft className="h-4 w-4" />
        </button>
      )}
      <button onClick={() => setOpenMobile(false)} className="ml-auto p-2 z-50 rounded cursor-pointer hover:bg-muted md:hidden">
        <X className="h-4 w-4 cursor-pointer" />
      </button>
    </div>
  )
}
