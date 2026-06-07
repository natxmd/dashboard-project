import { appointmentsMock } from "../../../datamock";
import AppointmentCard from "../../../global/components/cards/CardAppoiment";

const MainNewAppointmentsPage = () => {
  const handleConfirm = (appointmentId: string) => {
    console.log("Confirmar", appointmentId);
  };

  const handleDecline = (appointmentId: string) => {
    console.log("Rechazar", appointmentId);
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
            onConfirm={handleConfirm}
            onDecline={handleDecline}
            onComplete={handleComplete}
            onCancel={handleCancel}
          />
        ))}
      </div>
    </div>
  );
};

export default MainNewAppointmentsPage;