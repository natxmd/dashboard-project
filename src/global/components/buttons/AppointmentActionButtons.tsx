import { FaCheck, FaTimes } from "react-icons/fa";
import { EAppointmentStatus } from "../../../interfaces/appointment.interface";

interface Props {
  status: EAppointmentStatus;
  onConfirm?: () => void;
  onDecline?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
}

const AppointmentActionButtons = ({
  status,
  onConfirm,
  onDecline,
  onComplete,
  onCancel,
}: Props) => {
  switch (status) {
    case EAppointmentStatus.CREATE:
      return (
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-lg bg-green-500 px-5 py-2 text-sm font-medium text-white hover:bg-green-600"
          >
            <FaCheck size={12} />
            Confirmar
          </button>

          <button
            onClick={onDecline}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            <FaTimes size={12} />
            Rechazar
          </button>
        </div>
      );

    case EAppointmentStatus.CONFIRMED:
      return (
        <div className="flex gap-3">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 rounded-lg bg-green-500 px-5 py-2 text-sm font-medium text-white hover:bg-green-600"
          >
            <FaCheck size={12} />
            Realizada
          </button>

          <button
            onClick={onCancel}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            <FaTimes size={12} />
            Cancelar
          </button>
        </div>
      );

    default:
      return null;
  }
};

export default AppointmentActionButtons;