import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BaseModal = ({ isOpen, onClose, children }: BaseModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#0e0f11]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-[480px] overflow-hidden rounded-[32px] bg-white shadow-2xl transition-all duration-300 ease-out scale-100 flex flex-col">
        <div className="flex h-14 items-center justify-end px-6">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
          >
            <IoClose size={18} />
          </button>
        </div>

        <div className="h-[1px] w-full bg-gray-100" />

        <div className="flex-1 px-6 pb-6 pt-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default BaseModal;
