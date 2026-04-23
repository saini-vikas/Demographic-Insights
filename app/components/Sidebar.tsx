import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { Moon, Sun, Globe, Home, BarChart, Settings } from "lucide-react"
import SidebarHeader from "./SidebarHeader"
const AppSidebar = () => {
    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader>
            <SidebarHeader/>
          </SidebarHeader>
            <SidebarContent>
        <SidebarMenu>
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
