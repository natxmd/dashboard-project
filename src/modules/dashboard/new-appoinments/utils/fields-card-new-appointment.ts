import type { IAppointment } from "../../../../interfaces/appointment.interface";

export interface IAppointmentField {
  label: string;
  text: string;
}

export const getNewAppointmentFields = (
  appointment: IAppointment
): IAppointmentField[] => [
    {
      label: "Paciente",
      text: appointment.customer.fullName,
    },
    {
      label: "Fecha y Hora",
      text: new Date(appointment.appointmentDateTime).toLocaleString("es-PE", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    },
    {
      label: "Contacto",
      text: `${appointment.customer.phone} / ${appointment.customer.email}`,
    },
    {
      label: "Tipo",
      text: appointment.type,
    },
    {
      label: "Modalidad",
      text: appointment.modality,
    },
    {
      label: "Método de Pago",
      text: appointment.paymentMethodType,
    },
    {
      label: "Motivo de Consulta",
      text: appointment.description || "No especificado",
    },
  ];