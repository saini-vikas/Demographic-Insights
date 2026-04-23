import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar"
import { Moon, Sun } from "lucide-react"
const AppSidebar = () => {
    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader >
                Insights
            </SidebarHeader>
            <SidebarMenu>
                <SidebarMenuButton>
                    <Sun /> <span>Light</span>
                </SidebarMenuButton>
            </SidebarMenu>
        </Sidebar>
    )
}

export default AppSidebar