import "@/app/globals.css"
import AdminAuth from "@/components/admin/AdminAuth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ToastContainer } from "react-toastify";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export const metadata = {
    title: "admin | Nazar Brothers",
    description: "",
  };

export default function AdminLayout({ children }) {




    return (
        <AdminAuth>
               <SidebarProvider>
        <div className="flex ">
            <div >
                <AdminSidebar/>

            </div>

            <main>
                   <SidebarTrigger />
                {children}
            </main>

            <ToastContainer/>
        </div>
        </SidebarProvider>
        </AdminAuth>
    )


}