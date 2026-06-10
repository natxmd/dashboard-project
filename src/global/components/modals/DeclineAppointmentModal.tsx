import { useState } from "react";
import BaseModal from "./BaseModal";
import { FaTrashAlt } from "react-icons/fa";

interface DeclineAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDecline: (reason: string) => void;
  title?: string;
  actionText?: string;
  confirmText?: string;
  cancelText?: string;
  placeholder?: string;
  reasonLabel?: string;
}

export const DeclineAppointmentModal = ({
  isOpen,
  onClose,
  onDecline,
  title = "Rechazar Cita",
  actionText = "rechazar",
  confirmText = "Sí, rechazar",
  cancelText = "No, cancelar",
  // placeholder = "Escriba la razón aquí...",
  // reasonLabel = "Razón",
}: DeclineAppointmentModalProps) => {
  const [reason, setReason] = useState("");

  const handleDeclineClick = () => {
    onDecline(reason);
    setReason("");
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff5f5] text-[#e53e3e]">
          <FaTrashAlt size={24} />
        </div>

        <h3 className="mt-5 text-xl font-bold text-[#0e0f11] text-center">{title}</h3>

        <p className="mt-3 text-sm text-gray-500 px-4 text-center leading-relaxed">
          Estás seguro que deseas <span className="font-semibold text-red-500">{actionText}</span> esta cita?
        </p>

        {/* TODO: Habilitar cuando se soporte razón/motivo en BD
        <div className="mt-6 w-full px-1">
          <label htmlFor="decline-reason" className="block text-sm font-medium text-gray-800 mb-2">
            {reasonLabel}
          </label>
          <textarea
            id="decline-reason"
            placeholder={placeholder}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full h-24 resize-none rounded-2xl border border-gray-100 bg-white p-4 text-sm text-gray-850 placeholder-gray-300 outline-none transition-all focus:border-red-400 focus:ring-1 focus:ring-red-400/20"
          />
        </div>
        */}

        <div className="h-6" />
      </div>

      <div className="-mx-6 -mb-6 mt-2 grid grid-cols-2 border-t border-gray-100">
        <button
          onClick={handleClose}
          className="flex h-14 items-center justify-center text-sm font-semibold text-red-500 transition-colors hover:bg-gray-50 cursor-pointer active:bg-gray-100 border-r border-gray-100"
        >
          {cancelText}
        </button>
        <button
          onClick={handleDeclineClick}
          className="flex h-14 items-center justify-center text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50 cursor-pointer active:bg-gray-100"
        >
          {confirmText}
        </button>
      </div>
    </BaseModal>
  );
};

export default DeclineAppointmentModal;
