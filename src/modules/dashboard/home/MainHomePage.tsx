import { useFetchAppointments } from "../hooks/useFetchAppointments";
import { EAppointmentStatus } from "../../../interfaces/appointment.interface";

const MainHomePage = () => {
    const { appointments, loading, error, refetch } = useFetchAppointments([
        EAppointmentStatus.CREATE,
        EAppointmentStatus.CONFIRMED,
        EAppointmentStatus.COMPLETED,
        EAppointmentStatus.CANCELED,
        EAppointmentStatus.DECLINED,
    ]);

    const newAppointmentsCount = appointments.filter((a) => a.status === EAppointmentStatus.CREATE).length;
    const scheduledCount = appointments.filter((a) => a.status === EAppointmentStatus.CONFIRMED).length;
    const historyCount = appointments.filter((a) =>
        a.status === EAppointmentStatus.COMPLETED ||
        a.status === EAppointmentStatus.CANCELED ||
        a.status === EAppointmentStatus.DECLINED
    ).length;

    return (
        <div className="min-h-screen bg-white p-10">

            <div>
                <h1 className="text-4xl font-bold text-zinc-900">
                    ¡Bienvenida! 👋
                </h1>

                <p className="mt-2 text-zinc-500">
                    Gestiona tus citas y monitorea tu actividad desde un solo lugar.
                </p>
            </div>

            {loading && (
                <div className="mt-10 py-16 text-center border border-zinc-150 rounded-3xl bg-zinc-50/50">
                    <p className="text-zinc-500 font-medium">Cargando métricas...</p>
                </div>
            )}

            {error && (
                <div className="mt-10 p-6 border border-red-200 rounded-3xl bg-red-50/20 text-center max-w-md mx-auto">
                    <h3 className="text-base font-semibold text-zinc-900">Error al cargar métricas</h3>
                    <p className="text-sm text-zinc-500 mt-1">No se pudo conectar con el servidor.</p>
                    <button
                        onClick={refetch}
                        className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition"
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {!loading && !error && (
                <div className="mt-10 grid gap-6 md:grid-cols-3">

                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-zinc-500">
                            Nuevas Citas
                        </p>

                        <h2 className="mt-2 text-4xl font-bold text-zinc-900">
                            {newAppointmentsCount}
                        </h2>

                        <p className="mt-2 text-sm text-success">
                            Pendientes de revisión
                        </p>
                    </div>

                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-zinc-500">
                            Citas Programadas
                        </p>

                        <h2 className="mt-2 text-4xl font-bold text-zinc-900">
                            {scheduledCount}
                        </h2>

                        <p className="mt-2 text-sm text-primary">
                            Próximas citas
                        </p>
                    </div>

                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-zinc-500">
                            Historial
                        </p>

                        <h2 className="mt-2 text-4xl font-bold text-zinc-900">
                            {historyCount}
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Completadas / Canceladas / Rechazadas
                        </p>
                    </div>

                </div>
            )}

            <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-zinc-900">
                    Bienvenida a tu Panel de Control
                </h3>

                <p className="mt-3 max-w-2xl text-zinc-500">
                    Desde aquí puedes revisar las nuevas solicitudes de citas,
                    gestionar las citas programadas y acceder al historial completo
                    de las consultas.
                </p>
            </div>

        </div>
    );
};

export default MainHomePage;