import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar"
import { Home, Earth, Scale } from "lucide-react"
import { SidebarHeaderContent } from "./SidebarHeader"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"

const AppSidebar = () => {
    return (
        <Sidebar variant="floating" collapsible="icon" >
            <SidebarHeader>
                <SidebarHeaderContent />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="flex flex-col mx-2 my-3 gap-4">
                    <SidebarMenuItem>
                        <Link href="/">
                            <SidebarMenuButton>
                                <Home />
                                <span className="max-md:text-lg">Home</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <Link href="/world">
                            <SidebarMenuButton>
                                <Earth />
                                <span className="max-md:text-lg">World</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <Link href="/compare">
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
