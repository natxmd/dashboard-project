import { useState } from "react";
import AppointmentCard from "../../../global/components/cards/CardAppoiment";
import { EAppointmentStatus, EAppointmentModality } from "../../../interfaces/appointment.interface";
import { useFetchAppointments } from "../hooks/useFetchAppointments";
import { useChangeAppointmentStatus } from "../hooks/useChangeAppointmentStatus";
import { getScheduledAppointmentFields } from "./utils/fields-card-scheduled-appointments";
import ConfirmAppointmentModal from "../../../global/components/modals/ConfirmAppointmentModal";
import DeclineAppointmentModal from "../../../global/components/modals/DeclineAppointmentModal";
import LoadingPage from "../../../global/components/loading/LoadingPage";

const MainScheduledAppointmentsPage = () => {
  const { appointments, loading, error, refetch } = useFetchAppointments([
    EAppointmentStatus.CONFIRMED,
  ]);
  const { changeStatus } = useChangeAppointmentStatus();
  
  const [selectedCancelId, setSelectedCancelId] = useState<string | null>(null);
  const [selectedCompleteId, setSelectedCompleteId] = useState<string | null>(null);

  const handleCompleteTrigger = (appointmentId: string) => {
    setSelectedCompleteId(appointmentId);
  };

  const handleCompleteModalAction = async () => {
    if (selectedCompleteId) {
      try {
        await changeStatus(selectedCompleteId, EAppointmentStatus.COMPLETED);
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
    setSelectedCompleteId(null);
  };

  const handleCancelTrigger = (appointmentId: string) => {
    setSelectedCancelId(appointmentId);
  };

  const handleCancelModalAction = async () => {
    if (selectedCancelId) {
      try {
        await changeStatus(selectedCancelId, EAppointmentStatus.CANCELED);
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
    setSelectedCancelId(null);
  };

  const totalVirtual = appointments.filter((a) => a.modality === EAppointmentModality.VIRTUAL).length;
  const totalPresencial = appointments.filter((a) => a.modality === EAppointmentModality.IN_PERSON).length;

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        Citas Programadas
      </h1>

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Agendadas</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{appointments.length}</h3>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Sesiones Virtuales</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalVirtual}</h3>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Sesiones Presenciales</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalPresencial}</h3>
          </div>
        </div>
      )}

      {loading && (
        <LoadingPage
            message="Cargando citas programadas..."
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
          <p className="text-sm text-gray-500">No hay citas programadas agendadas actualmente.</p>
        </div>
      )}

      {!loading && !error && appointments.length > 0 && (
        <div className="space-y-5">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              fields={getScheduledAppointmentFields(appointment)}
              onComplete={handleCompleteTrigger}
              onCancel={handleCancelTrigger}
            />
          ))}
        </div>
      )}

      <ConfirmAppointmentModal
        isOpen={selectedCompleteId !== null}
        onClose={() => setSelectedCompleteId(null)}
        onConfirm={handleCompleteModalAction}
        title="Cita Realizada"
        description={
          <p>
            ¿Está seguro que desea marcar esta cita como <span className="font-semibold text-gray-900">realizada</span>?
          </p>
        }
        confirmText="Confirmar"
        cancelText="Cancelar"
      />

      <DeclineAppointmentModal
        isOpen={selectedCancelId !== null}
        onClose={() => setSelectedCancelId(null)}
        onDecline={handleCancelModalAction}
        title="Cancelar Cita"
        actionText="cancelar"
        confirmText="Sí, cancelar"
        cancelText="No, cancelar"
        placeholder="Escriba el motivo de la cancelación aquí..."
      />
    </div>
  );
};

export default MainScheduledAppointmentsPage;