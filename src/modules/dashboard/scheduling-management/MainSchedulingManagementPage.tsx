import { useEffect, useMemo, useState } from "react";
import { createSlotsService } from "./services/create-slots.service";
import {
  ESlotStatus,
  getSlotsByRangeService,
  type ISlotDay,
} from "./services/get-slots-by-range.service";

const DEFAULT_HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const MainSchedulingManagementPage = () => {
  const [date, setDate] = useState("");
  const [selectedHours, setSelectedHours] = useState<string[]>(DEFAULT_HOURS);
  const [slotDays, setSlotDays] = useState<ISlotDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [message, setMessage] = useState("");

  const formatDateFromDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  };

  const startDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDateFromDate(tomorrow);
  }, []);

  const endDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return formatDateFromDate(date);
  }, []);

  const selectedDay = slotDays.find((day) => day.date === date);

  const disabledHours =
    selectedDay?.hours
      .filter((slot) => slot.status === ESlotStatus.DISABLED)
      .map((slot) => slot.hour) ?? [];

  const loadSlots = async () => {
    try {
      setLoadingSlots(true);

      const days = await getSlotsByRangeService(startDate, endDate);
      setSlotDays(days);
    } catch (error) {
      console.error(error);
      setSlotDays([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    const loadInitialSlots = async () => {
      try {
        setLoadingSlots(true);

        const days = await getSlotsByRangeService(startDate, endDate);
        setSlotDays(days);
      } catch (error) {
        console.error(error);
        setSlotDays([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    void loadInitialSlots();
  }, [startDate, endDate]);

  const toggleHour = (hour: string) => {
    if (disabledHours.includes(hour)) return;

    setSelectedHours((prev) =>
      prev.includes(hour)
        ? prev.filter((item) => item !== hour)
        : [...prev, hour]
    );
  };

  const handleSelectAll = () => {
    setSelectedHours(
      DEFAULT_HOURS.filter((hour) => !disabledHours.includes(hour))
    );
  };

  const handleClear = () => {
    setSelectedHours([]);
  };

  const handleDateChange = (value: string) => {
    setDate(value);

    const day = slotDays.find((item) => item.date === value);

    const blockedHours =
      day?.hours
        .filter((slot) => slot.status === ESlotStatus.DISABLED)
        .map((slot) => slot.hour) ?? [];

    setSelectedHours(
      DEFAULT_HOURS.filter((hour) => !blockedHours.includes(hour))
    );
  };

  const handleSubmit = async () => {
    if (!date) {
      setMessage("Seleccione una fecha.");
      return;
    }

    if (selectedHours.length === 0) {
      setMessage("Seleccione al menos un horario.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await createSlotsService({
        date,
        hours: [...selectedHours].sort(),
      });

      setMessage(response.message || "Horarios creados correctamente.");
      setDate("");
      setSelectedHours(DEFAULT_HOURS);

      await loadSlots();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Error al crear los horarios."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-6  max-w-4xl mx-auto">
      <div className="w-full flex flex-col gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h1 className="text-2xl font-semibold text-slate-950">
            Gestión de horarios
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Crea y visualiza los horarios disponibles para las citas.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Crear horarios
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Selecciona una fecha y los horarios disponibles.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fecha
            </label>

            <input
              type="date"
              value={date}
              min={startDate}
              max={endDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full max-w-xs border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-slate-900"
            />
          </div>

          <div className="border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="font-semibold text-slate-950 text-sm">
                  Horarios disponibles
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {selectedHours.length} de {DEFAULT_HOURS.length} horarios seleccionados
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs text-slate-950 font-medium"
                >
                  Seleccionar todos
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-slate-500 font-medium"
                >
                  Limpiar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {DEFAULT_HOURS.map((hour) => {
                const isSelected = selectedHours.includes(hour);
                const isDisabled = disabledHours.includes(hour);

                return (
                  <button
                    key={hour}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => toggleHour(hour)}
                    className={`rounded-lg px-3 py-2 text-xs font-medium border transition-colors
                      ${isDisabled
                        ? "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed"
                        : isSelected
                          ? "bg-slate-950 text-white border-slate-950"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }
                    `}
                  >
                    {hour}
                  </button>
                );
              })}
            </div>
          </div>

          {message && (
            <div className="border border-slate-200 rounded-xl px-4 py-3 bg-slate-50">
              <p className="text-sm text-slate-600">{message}</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="bg-slate-950 text-white rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-60"
            >
              {loading ? "Guardando..." : "Guardar horarios"}
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Horarios registrados
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Estos son los horarios creados para los próximos 30 días.
            </p>
          </div>

          {loadingSlots ? (
            <p className="text-sm text-slate-500">Cargando horarios...</p>
          ) : slotDays.length > 0 ? (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">
                      Fecha
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">
                      Horarios
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {slotDays.map((day) => (
                    <tr
                      key={day.date}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-4 py-4 text-slate-700 font-medium whitespace-nowrap">
                        {day.date}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          {day.hours.map((slot) => (
                            <span
                              key={slot.id}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-medium
                                ${slot.status === ESlotStatus.DISABLED
                                  ? "border-slate-200 bg-slate-100 text-slate-300"
                                  : "border-slate-200 bg-slate-50 text-slate-600"
                                }
                              `}
                            >
                              {slot.hour}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
              <p className="text-sm text-slate-500">
                Aún no hay horarios registrados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSchedulingManagementPage;