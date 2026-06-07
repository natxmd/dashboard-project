import { useState, useEffect, useCallback } from "react";
import { EAppointmentStatus, type IAppointment } from "../../../../interfaces/appointment.interface";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://gestion-citas-d3ux.onrender.com";

export const useFetchAppointments = (statuses: EAppointmentStatus[]) => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchPromises = statuses.map(async (status) => {
        const url = `${API_BASE_URL}/appointments/fetch-appointments?status=${status}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 404) return [];
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const json = await response.json();
        const data: any[] = json.data || [];

        return data.map((item) => ({
          ...item,
          createAt: item.createdAt || item.createAt || new Date().toISOString(),
        })) as IAppointment[];
      });

      const results = await Promise.all(fetchPromises);
      const merged = results.flat();

      const sorted = merged.sort((a, b) => {
        return new Date(b.appointmentDateTime).getTime() - new Date(a.appointmentDateTime).getTime();
      });

      setAppointments(sorted);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al obtener las citas.");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(statuses)]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return { appointments, loading, error, refetch: fetchAppointments };
};