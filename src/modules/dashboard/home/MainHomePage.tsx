const MainHomePage = () => {
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

            <div className="mt-10 grid gap-6 md:grid-cols-3">

                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-zinc-500">
                        New Appointments
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-zinc-900">
                        12
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
                        8
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
                        156
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                        Completed appointments
                    </p>
                </div>

            </div>

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