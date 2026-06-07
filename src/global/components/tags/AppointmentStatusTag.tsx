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
    label: "Cita Cancelada",
    className: "bg-gray-100 text-gray-600 border border-gray-200",
  },
};

const AppointmentStatusTag = ({ status }: Props) => {
  const config = statusConfig[status];
  const isCompleted = status === EAppointmentStatus.COMPLETED;

  return (
    <div
      className={`rounded-full px-4 py-1 text-xs font-medium flex items-center gap-1.5 ${config.className}`}
    >
      {isCompleted ? "✓" : "●"} {config.label}
    </div>
  );
};

export default AppointmentStatusTag;