const API_URL = import.meta.env.VITE_API_URL;

export enum ESlotStatus {
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  DISABLED = "DISABLED",
}

export interface ISlotHour {
  id: string;
  hour: string;
  status: ESlotStatus;
  appointmentId: string | null;
}

export interface ISlotDay {
  date: string;
  hours: ISlotHour[];
}

interface GetSlotsByRangeResponse {
  message: string;
  data: {
    days: ISlotDay[];
  };
}

export async function getSlotsByRangeService(
  startDate: string,
  endDate: string
): Promise<ISlotDay[]> {
  const response = await fetch(
    `${API_URL}/slots/by-range?date_from=${startDate}&date_to=${endDate}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener los horarios disponibles");
  }

  const result: GetSlotsByRangeResponse = await response.json();

  return result.data.days;
}