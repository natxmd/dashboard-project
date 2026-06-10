import { useState } from "react";
import { appointmentsMock } from "../../../datamock";
import AppointmentCard from "../../../global/components/cards/CardAppoiment";
import ConfirmAppointmentModal from "../../../global/components/modals/ConfirmAppointmentModal";
import DeclineAppointmentModal from "../../../global/components/modals/DeclineAppointmentModal";

const MainNewAppointmentsPage = () => {
  const [selectedConfirmId, setSelectedConfirmId] = useState<string | null>(null);
  const [selectedDeclineId, setSelectedDeclineId] = useState<string | null>(null);

  const handleConfirmTrigger = (appointmentId: string) => {
    setSelectedConfirmId(appointmentId);
  };

  const handleDeclineTrigger = (appointmentId: string) => {
    setSelectedDeclineId(appointmentId);
  };

  const handleConfirmModalAction = () => {
    console.log("Confirmar cita:", selectedConfirmId);
    setSelectedConfirmId(null);
  };

  const handleDeclineModalAction = (reason: string) => {
    console.log("Rechazar cita:", selectedDeclineId, "Razón:", reason);
    setSelectedDeclineId(null);
  };

  const handleComplete = (appointmentId: string) => {
    console.log("Realizado", appointmentId);
  };

  const handleCancel = (appointmentId: string) => {
    console.log("Cancelar", appointmentId);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        Nuevas Citas
      </h1>

      <div className="space-y-5">
        {appointmentsMock.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onConfirm={handleConfirmTrigger}
            onDecline={handleDeclineTrigger}
            onComplete={handleComplete}
            onCancel={handleCancel}
          />
        ))}
      </div>

      <ConfirmAppointmentModal
        isOpen={selectedConfirmId !== null}
        onClose={() => setSelectedConfirmId(null)}
        onConfirm={handleConfirmModalAction}
      />

      <DeclineAppointmentModal
        isOpen={selectedDeclineId !== null}
        onClose={() => setSelectedDeclineId(null)}
        onDecline={handleDeclineModalAction}
      />
    </div>
  );
};

export default MainNewAppointmentsPage;