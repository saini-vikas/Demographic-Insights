"use client"
import { Globe, PanelLeft } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

function SidebarHeaderContent() {
  const { open, setOpen } = useSidebar()

  return (
    <div className="group relative flex items-center px-3 py-2">
      {/* LEFT SIDE (icon / logo) */}
      <div className="flex items-center gap-2">
        <div className="relative h-5 w-5">
          {/* Globe (default) */}
          <Globe className="h-5 w-5 transition-opacity group-hover:opacity-0" />

          {/* Trigger icon (on hover when collapsed) */}
          {!open && (
            <PanelLeft
              onClick={() => setOpen(true)}
              className="absolute inset-0 h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
            />
          )}
        </div>

        {/* Title (hidden when collapsed automatically) */}
        {open && <span className="font-semibold text-sm">Insights</span>}
      </div>

      {/* RIGHT SIDE (collapse button when expanded) */}
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="ml-auto p-1 rounded hover:bg-muted"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
