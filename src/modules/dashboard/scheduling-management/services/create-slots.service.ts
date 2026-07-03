const API_URL = import.meta.env.VITE_API_URL;

export interface ICreateSlotsRequest {
  date: string;
  hours: string[];
}

interface ICreateSlotsResponse {
  message: string;
}

export async function createSlotsService(
  data: ICreateSlotsRequest
): Promise<ICreateSlotsResponse> {
  const response = await fetch(`${API_URL}/slots/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || "Error al crear los horarios");
  }

  return response.json();
}