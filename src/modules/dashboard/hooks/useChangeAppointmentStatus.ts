import { useState } from "react";
import { EAppointmentStatus } from "../../../interfaces/appointment.interface";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://gestion-citas-d3ux.onrender.com";

export const useChangeAppointmentStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeStatus = async (appointmentId: string, newStatus: EAppointmentStatus) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_BASE_URL}/appointments/change-appointment-status?appointment_id=${appointmentId}&new_status=${newStatus}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const json = await response.json();
      return json;
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error(err);
      setError(errorMsg || "Error al actualizar el estado.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { changeStatus, loading, error };
};

export default useChangeAppointmentStatus;
