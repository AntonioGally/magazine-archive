import { SidebarProvider } from "@/components/ui/sidebar"
import PanelSidebar from "../pages/panel/components/panel-sidebar/panel-sidebar";
import { Outlet } from "react-router";

const PanelLayout = () => {
    return (
        <SidebarProvider>
            <PanelSidebar />
            <main className="w-full">
                <div className="p-4 h-full">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}

export default PanelLayout;