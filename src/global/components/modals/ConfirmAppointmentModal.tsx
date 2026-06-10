import BaseModal from "./BaseModal";
import { FaCheck } from "react-icons/fa";

interface ConfirmAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmAppointmentModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar Cita",
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmAppointmentModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0fbf6] text-[#10b981]">
          <FaCheck size={26} className="stroke-[1.5]" />
        </div>

        <h3 className="mt-5 text-xl font-bold text-[#0e0f11]">{title}</h3>

        <div className="mt-3 text-sm text-gray-500 px-4 leading-relaxed">
          {description || (
            <p>
              Si <span className="font-semibold text-gray-900">confirma esta cita</span>, se agregará a su agenda
            </p>
          )}
        </div>

        <div className="h-6" />
      </div>

      <div className="-mx-6 -mb-6 mt-2 grid grid-cols-2 border-t border-gray-100">
        <button
          onClick={onClose}
          className="flex h-14 items-center justify-center text-sm font-semibold text-red-500 transition-colors hover:bg-gray-50 cursor-pointer active:bg-gray-100 border-r border-gray-100"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className="flex h-14 items-center justify-center text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50 cursor-pointer active:bg-gray-100"
        >
          {confirmText}
        </button>
      </div>
    </BaseModal>
  );
};

export default ConfirmAppointmentModal;
