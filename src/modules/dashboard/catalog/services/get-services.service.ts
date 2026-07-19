import type { IGetServicesResponse, IService } from "../types/catalog.types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getServicesService(): Promise<IService[]> {
  const response = await fetch(`${API_URL}/catalog/all`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.detail || "Error al obtener los servicios"
    );
  }

  const result: IGetServicesResponse = await response.json();

  return result.data;
}