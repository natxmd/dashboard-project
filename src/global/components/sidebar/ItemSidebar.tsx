import type { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface Props {
    icon: IconType;
    label: string;
    to: string;
}

const SidebarItem = ({
    icon: Icon,
    label,
    to,
}: Props) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                transition-all
                duration-200
                ${
                    isActive
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }
                `
            }
        >
            <Icon size={20} />

            <span className="font-medium">
                {label}
            </span>
        </NavLink>
    );
};

export default SidebarItem;