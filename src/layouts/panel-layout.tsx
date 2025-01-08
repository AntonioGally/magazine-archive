import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import PanelSidebar from "../pages/panel/components/panel-sidebar/panel-sidebar";
import { Outlet } from "react-router";

const PanelLayout = () => {
    return (
        <SidebarProvider>
            <PanelSidebar />
            <main className="flex w-full">
                <SidebarTrigger />
                <div className="p-4 w-full h-full">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}

export default PanelLayout;