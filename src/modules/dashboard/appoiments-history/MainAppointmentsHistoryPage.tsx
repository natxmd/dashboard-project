import AppointmentCard from "../../../global/components/cards/CardAppoiment";
import { EAppointmentStatus } from "../../../interfaces/appointment.interface";
import { useFetchAppointments } from "../hooks/useFetchAppointments";
import { getHistoryAppointmentFields } from "./utils/fields-card-appoiments-history";

const MainAppointmentsHistoryPage = () => {
  const { appointments, loading, error, refetch } = useFetchAppointments([
    EAppointmentStatus.COMPLETED,
    EAppointmentStatus.CANCELED,
  ]);

  const totalCompleted = appointments.filter((a) => a.status === EAppointmentStatus.COMPLETED).length;
  const totalCanceled = appointments.filter((a) => a.status === EAppointmentStatus.CANCELED).length;

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        Historial de Citas
      </h1>

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Historial</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{appointments.length}</h3>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Completadas</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalCompleted}</h3>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Canceladas</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalCanceled}</h3>
          </div>
        </div>
      )}

      {loading && (
        <div className="py-20 text-center">
          <p className="text-gray-500 font-medium">Cargando el historial de citas...</p>
        </div>
      )}

      {error && (
        <div className="p-6 bg-white border border-gray-200 rounded-xl text-center shadow-sm max-w-md mx-auto">
          <h3 className="text-base font-semibold text-gray-800">Error al cargar las citas</h3>
          <p className="text-sm text-gray-500 mt-1">
            No se pudo conectar con el servidor en Render.
          </p>
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
          <p className="text-sm text-gray-500">No hay citas registradas en el historial.</p>
        </div>
      )}

      {!loading && !error && appointments.length > 0 && (
        <div className="space-y-5">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              fields={getHistoryAppointmentFields(appointment)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainAppointmentsHistoryPage;