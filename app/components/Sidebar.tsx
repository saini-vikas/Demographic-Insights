import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar"
import { Moon, Sun } from "lucide-react"
const AppSidebar = () => {
    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <Globe className="h-5 w-5" />
              <span className="font-semibold text-sm">Insights</span>
            </div>
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
