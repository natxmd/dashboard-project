import { EAppointmentStatus } from "../../../interfaces/appointment.interface";

interface Props {
  status: EAppointmentStatus;
}

const statusConfig = {
  [EAppointmentStatus.CREATE]: {
    label: "Pendiente",
    className: "bg-yellow-50 text-yellow-600",
  },

  [EAppointmentStatus.CONFIRMED]: {
    label: "Confirmada",
    className: "bg-green-50 text-green-600",
  },

  [EAppointmentStatus.DECLINED]: {
    label: "Rechazada",
    className: "bg-red-50 text-red-600",
  },

  [EAppointmentStatus.COMPLETED]: {
    label: "Completada",
    className: "bg-blue-50 text-blue-600",
  },

  [EAppointmentStatus.CANCELED]: {
    label: "Cancelada",
    className: "bg-gray-100 text-gray-600",
  },
};

const AppointmentStatusTag = ({ status }: Props) => {
  const config = statusConfig[status];

  return (
    <div
      className={`rounded-full px-4 py-1 text-xs font-medium ${config.className}`}
    >
      ● {config.label}
    </div>
  );
};

export default AppointmentStatusTag;