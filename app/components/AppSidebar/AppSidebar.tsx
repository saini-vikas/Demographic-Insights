"use client"

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, useSidebar } from "@/components/ui/sidebar"
import { Home, Earth, Scale } from "lucide-react"
import { SidebarHeaderContent } from "./SidebarHeader"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"

const AppSidebar = () => {
    const { setOpenMobile } = useSidebar();

    return (
        <Sidebar variant="floating" collapsible="icon" >
            <SidebarHeader>
                <SidebarHeaderContent />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="flex flex-col mx-2 my-3 gap-4">
                    <SidebarMenuItem>
                        <Link href="/" onClick={() => setOpenMobile(false)}>
                            <SidebarMenuButton>
                                <Home />
                                <span className="max-md:text-lg">Home</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <Link href="/world" onClick={() => setOpenMobile(false)}>
                            <SidebarMenuButton>
                                <Earth />
                                <span className="max-md:text-lg">World</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <Link href="/compare" onClick={() => setOpenMobile(false)}>
                            <SidebarMenuButton>
                                <Scale />
                                <span className="max-md:text-lg">Compare</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="mb-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <ThemeToggle />
                    </SidebarMenuItem>
                </SidebarMenu>

            </SidebarFooter>
        </Sidebar >
    )
}

export default AppSidebar
