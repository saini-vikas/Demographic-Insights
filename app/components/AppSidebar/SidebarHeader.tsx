"use client"
import { Globe, PanelLeft } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarHeaderContent() {
  const { open, setOpen } = useSidebar()

  return (
    <div className="relative flex items-center p-1.5">
      <div className="flex items-center gap-2">
        <div className="group/globe relative h-5 w-5">
          {open === true ? <Globe className="h-5 w-5 transition-opacity" /> : <Globe className="h-5 w-5 transition-opacity group-hover/globe:opacity-0" />}
          {!open && (
            <PanelLeft
              onClick={() => setOpen(true)}
              className="absolute inset-0 h-5 w-5 opacity-0 transition-opacity group-hover/globe:opacity-100 cursor-pointer"
            />
          )}
        </div>
      </div>
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="ml-auto rounded cursor-pointer hover:bg-muted"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
