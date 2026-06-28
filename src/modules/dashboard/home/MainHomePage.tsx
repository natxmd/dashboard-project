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
                    Welcome Back 👋
                </h1>

                <p className="mt-2 text-zinc-500">
                    Manage appointments and monitor your activity from one place.
                </p>
            </div>

            {loading && (
                <div className="mt-10 py-16 text-center border border-zinc-150 rounded-3xl bg-zinc-50/50">
                    <p className="text-zinc-500 font-medium">Cargando métricas en tiempo real...</p>
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
                            New Appointments
                        </p>

                        <h2 className="mt-2 text-4xl font-bold text-zinc-900">
                            {newAppointmentsCount}
                        </h2>

                        <p className="mt-2 text-sm text-success">
                            Pending review
                        </p>
                    </div>

                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-zinc-500">
                            Scheduled
                        </p>

                        <h2 className="mt-2 text-4xl font-bold text-zinc-900">
                            {scheduledCount}
                        </h2>

                        <p className="mt-2 text-sm text-primary">
                            Upcoming appointments
                        </p>
                    </div>

                    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-zinc-500">
                            History
                        </p>

                        <h2 className="mt-2 text-4xl font-bold text-zinc-900">
                            {historyCount}
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Completed / Cancelled / Rejected
                        </p>
                    </div>

                </div>
            )}

            <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-zinc-900">
                    Welcome to your Dashboard
                </h3>

                <p className="mt-3 max-w-2xl text-zinc-500">
                    From here you can review new appointment requests,
                    manage scheduled appointments and access the complete
                    history of consultations.
                </p>
            </div>

        </div>
    );
};

export default MainHomePage;