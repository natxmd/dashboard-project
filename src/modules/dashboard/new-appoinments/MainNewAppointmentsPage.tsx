import { useState } from "react";
import AppointmentCard from "../../../global/components/cards/CardAppoiment";
import ConfirmAppointmentModal from "../../../global/components/modals/ConfirmAppointmentModal";
import DeclineAppointmentModal from "../../../global/components/modals/DeclineAppointmentModal";
import { useFetchAppointments } from "../hooks/useFetchAppointments";
import { useChangeAppointmentStatus } from "../hooks/useChangeAppointmentStatus";
import { EAppointmentStatus } from "../../../interfaces/appointment.interface";
import LoadingPage from "../../../global/components/loading/LoadingPage";

const MainNewAppointmentsPage = () => {
  const { appointments, loading, error, refetch } = useFetchAppointments([
    EAppointmentStatus.CREATE,
  ]);
  const { changeStatus } = useChangeAppointmentStatus();
  
  const [selectedConfirmId, setSelectedConfirmId] = useState<string | null>(null);
  const [selectedDeclineId, setSelectedDeclineId] = useState<string | null>(null);

  const handleConfirmTrigger = (appointmentId: string) => {
    setSelectedConfirmId(appointmentId);
  };

  const handleDeclineTrigger = (appointmentId: string) => {
    setSelectedDeclineId(appointmentId);
  };

  const handleConfirmModalAction = async () => {
    if (selectedConfirmId) {
      try {
        await changeStatus(selectedConfirmId, EAppointmentStatus.CONFIRMED);
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
    setSelectedConfirmId(null);
  };

  const handleDeclineModalAction = async () => {
    if (selectedDeclineId) {
      try {
        await changeStatus(selectedDeclineId, EAppointmentStatus.DECLINED);
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
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

      {loading && (
          <LoadingPage
              message="Cargando nuevas citas..."
          />
      )}

      {error && (
        <div className="p-6 bg-white border border-gray-200 rounded-xl text-center shadow-sm max-w-md mx-auto">
          <h3 className="text-base font-semibold text-gray-800">Error al cargar las citas</h3>
          <p className="text-sm text-gray-500 mt-1">No se pudo conectar con el servidor.</p>
          <button
            onClick={refetch}
            className="mt-4 rounded-lg bg-gray-800 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-900 transition"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <div className="py-16 text-center bg-white border border-gray-200 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">No hay nuevas citas actualmente.</p>
        </div>
      )}

      {!loading && !error && appointments.length > 0 && (
        <div className="space-y-5">
          {appointments.map((appointment) => (
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
      )}

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