"use client"

import { Menu } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

export function MobileSidebarTrigger() {
    const { setOpenMobile } = useSidebar()

    return (
        <div className="flex justify-center items-center p-2 border rounded-full bg-white shadow-md active:scale-95 cursor-pointer dark:bg-gray-800 z-10 dark:border-gray-300 dark:shadow-gray-800">

            <button
                onClick={() => setOpenMobile(true)}
            >
                <Menu className="h-5 w-5" />
            </button>
        </div>


    )
}