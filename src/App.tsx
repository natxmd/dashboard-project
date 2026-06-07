import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLoginPage from "./modules/auth/pages/MainLoginPage";
import MainHomePage from "./modules/dashboard/home/MainHomePage";
import MainNewAppointmentsPage from "./modules/dashboard/new-appoinments/MainNewAppointmentsPage";
import MainScheduledAppointmentsPage from "./modules/dashboard/scheduled-appoiments/MainScheduledAppointmentsPage";
import MainAppointmentsHistoryPage from "./modules/dashboard/appoiments-history/MainAppointmentsHistoryPage";
import { ERoutes } from "./routes.enum";


function App() {
  return (
    <Routes>

      {/* Public routes */}
      <Route path={ERoutes.login} element={<MainLoginPage />} />

      {/* Private routes */}
      <Route element={<DashboardLayout />}>
        <Route index element={<MainHomePage />} />
        <Route path={ERoutes.newAppointments} element={<MainNewAppointmentsPage />} />
        <Route path={ERoutes.scheduledAppointments} element={<MainScheduledAppointmentsPage />} />
        <Route path={ERoutes.appointmentsHistory} element={<MainAppointmentsHistoryPage />} />
      </Route>

      <Route path="*" element={<Navigate to={ERoutes.login} />} />

    </Routes>
  );
}

export default App;