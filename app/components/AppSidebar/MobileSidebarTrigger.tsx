"use client"

import { Menu } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

export function MobileSidebarTrigger() {
    const { setOpenMobile } = useSidebar()

    return (
        <div className="flex justify-center items-center w-7 h-7 border rounded-full bg-white shadow-md active:scale-95">

            <button
                onClick={() => setOpenMobile(true)}
            >
                <Menu className="h-4 w-4 cursor-pointer" />
            </button>
        </div>


    )
}