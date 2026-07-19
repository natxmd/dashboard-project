import type { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  color?: string;
  onClick?: () => void;
}

export default function ServiceCard({
  title,
  subtitle,
  icon,
  color,
  onClick,
}: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col items-center text-center gap-4 border border-slate-200 rounded-2xl px-6 py-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-full ${
          color || "bg-[#F2EDFE]"
        }`}
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="text-sm text-slate-600 leading-6 h-full">
        {subtitle}
      </p>

      <span className="text-[#00A4E5] font-medium group-hover:underline">
        Conoce más →
      </span>
    </div>
  );
}