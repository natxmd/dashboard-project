import { Outlet } from "react-router-dom"
import Sidebar from "../global/components/sidebar/Sidebat"

const DashboardLayout = () => {
    return (
        <div className="flex max-h-screen overflow-hidden">
            <Sidebar />

            <main className="flex-1 bg-white overflow-y-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
