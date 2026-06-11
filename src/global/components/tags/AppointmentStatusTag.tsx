import { EAppointmentStatus } from "../../../interfaces/appointment.interface";

interface Props {
  status: EAppointmentStatus;
}

const statusConfig = {
  [EAppointmentStatus.CREATE]: {
    label: "Nueva Cita",
    className: "bg-indigo-50 text-indigo-600 border border-indigo-100",
  },

  [EAppointmentStatus.CONFIRMED]: {
    label: "Paciente Nuevo",
    className: "bg-indigo-50 text-indigo-600 border border-indigo-100",
  },

  [EAppointmentStatus.DECLINED]: {
    label: "Cita Rechazada",
    className: "bg-red-50 text-red-600 border border-red-100",
  },

  [EAppointmentStatus.COMPLETED]: {
    label: "Sesión Realizada",
    className: "bg-emerald-500 text-white border border-emerald-600",
  },

  [EAppointmentStatus.CANCELED]: {
    label: "Sesión cancelada",
    className: "bg-[#de4343] text-white border border-[#d63d3d]",
  },
};

const AppointmentStatusTag = ({ status }: Props) => {
  const config = statusConfig[status];
  const isCompleted = status === EAppointmentStatus.COMPLETED;
  const isCanceled = status === EAppointmentStatus.CANCELED;

  return (
    <div
      className={`rounded-full px-4 py-1 text-xs font-medium flex items-center gap-1.5 ${config.className}`}
    >
      {isCompleted ? "✓" : isCanceled ? "✕" : "●"} {config.label}
    </div>
  );
};

export default AppointmentStatusTag;