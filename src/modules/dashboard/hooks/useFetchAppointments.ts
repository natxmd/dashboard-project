import { useState, useEffect, useCallback } from "react";
import { EAppointmentStatus, type IAppointment } from "../../../interfaces/appointment.interface";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://gestion-citas-d3ux.onrender.com";

export const useFetchAppointments = (statuses: EAppointmentStatus[]) => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const statusesKey = statuses.join(",");

  const fetchAppointments = useCallback(async () => {
    await Promise.resolve();
    setLoading(true);
    setError(null);

    try {
      const statusList = statusesKey.split(",") as EAppointmentStatus[];
      const fetchPromises = statusList.map(async (status) => {
        const url = `${API_BASE_URL}/appointments/fetch-appointments?status=${status}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 404) return [];
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const json = await response.json();
        const data: Record<string, unknown>[] = json.data || [];

        return data.map((item) => ({
          ...item,
          createAt: String(item.createdAt || item.createAt || new Date().toISOString()),
        })) as unknown as IAppointment[];
      });

      const results = await Promise.all(fetchPromises);
      const merged = results.flat();

      const sorted = merged.sort((a, b) => {
        return new Date(b.appointmentDateTime).getTime() - new Date(a.appointmentDateTime).getTime();
      });

      setAppointments(sorted);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error(err);
      setError(errorMsg || "Error al obtener las citas.");
    } finally {
      setLoading(false);
    }
  }, [statusesKey]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAppointments();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchAppointments]);

  return { appointments, loading, error, refetch: fetchAppointments };
};

export default useFetchAppointments;
