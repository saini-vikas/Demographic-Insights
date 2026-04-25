import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar"
import { Home, BarChart, Settings } from "lucide-react"
import { SidebarHeaderContent } from "./SidebarHeader"
const AppSidebar = () => {
    return (
        <Sidebar variant="floating" collapsible="icon" >
            <SidebarHeader>
                <SidebarHeaderContent />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="flex flex-col mx-2 my-3 gap-4">
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Home />
                            <span className="max-md:text-lg">Home</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <BarChart />
                            <span className="max-md:text-lg">World</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <BarChart />
                            <span className="max-md:text-lg">Compare</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="mb-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Settings />
                            <span className="max-md:text-lg">Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

            </SidebarFooter>
        </Sidebar >
    )
}

export default AppSidebar
