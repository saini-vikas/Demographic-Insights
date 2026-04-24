import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { Moon, Sun, Globe, Home, BarChart, Settings } from "lucide-react"
import { SidebarHeaderContent } from "./SidebarHeader"
const AppSidebar = () => {
    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader>
                <SidebarHeaderContent />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="flex flex-col mx-2 my-3 gap-4">
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Home />
                            <span>Home</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <BarChart />
                            <span>Analytics</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Settings />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar
