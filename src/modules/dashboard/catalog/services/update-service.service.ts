import type { IServiceMutationResponse, IUpdateServiceRequest } from "../../catalog/types/catalog.types";


const API_URL = import.meta.env.VITE_API_URL;

export async function updateServiceService(
  serviceId: string,
  data: IUpdateServiceRequest
): Promise<IServiceMutationResponse> {
  const response = await fetch(
    `${API_URL}/catalog/${serviceId}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      getErrorMessage(errorData, "Error al actualizar el servicio")
    );
  }

  return response.json();
}

function getErrorMessage(
  errorData: unknown,
  defaultMessage: string
): string {
  if (
    typeof errorData === "object" &&
    errorData !== null &&
    "detail" in errorData
  ) {
    const detail = errorData.detail;

    if (typeof detail === "string") {
      return detail;
    }

    if (Array.isArray(detail)) {
      return detail
        .map((error) =>
          typeof error?.msg === "string" ? error.msg : null
        )
        .filter(Boolean)
        .join(", ");
    }
  }

  return defaultMessage;
}