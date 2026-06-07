import { FiHome, FiCalendar, FiClock, FiBookOpen, FiLogOut } from "react-icons/fi";

import SidebarItem from "./ItemSidebar";
import { ERoutes } from "../../../routes.enum";

const Sidebar = () => {
    return (
        <aside
            className=" flex h-screen w-72 flex-col px-6 py-8
            border-r border-zinc-900 bg-black"
        >
            <div>
                <h1 className=" text-3xl font-semibold tracking-wider text-white">
                    DASHBOARD
                </h1>

                <p className="mt-2 text-sm text-zinc-500">
                    Appointment Manager
                </p>
            </div>

            <div className="my-8 h-px bg-zinc-900" />

            <nav className="flex flex-col gap-2">
                <SidebarItem
                    icon={FiHome}
                    label="Inicio"
                    to={ERoutes.home}
                />

                <SidebarItem
                    icon={FiCalendar}
                    label="Nuevas Citas"
                    to={ERoutes.newAppointments}
                />

                <SidebarItem
                    icon={FiClock}
                    label="Citas Programadas"
                    to={ERoutes.scheduledAppointments}
                />

                <SidebarItem
                    icon={FiBookOpen}
                    label="Historial"
                    to={ERoutes.appointmentsHistory}
                />
            </nav>

            <div className="mt-auto">
                <div className="h-px bg-zinc-900" />

                <button
                    className="
            mt-4
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-zinc-400
            transition-all hover:bg-red-500/10 hover:text-red-500
        "
                >
                    <FiLogOut size={20} />
                    <span>Cerrar Sesión</span>
                </button>

                <p className="mt-4 text-xs text-zinc-600">
                    Admin Panel v1.0
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;