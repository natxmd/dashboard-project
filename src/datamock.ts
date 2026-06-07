import {
  EAppointmentStatus,
  EAppointmentModality,
  EAppointmentType,
  EPaymentMethodType,
  type IAppointment,
} from "./interfaces/appointment.interface";

export const appointmentsMock: IAppointment[] = [
  {
    id: "1",
    status: EAppointmentStatus.CREATE,
    customer: {
      fullName: "Juan Casas",
      email: "juan_casas@gmail.com",
      phone: "4085000000",
    },
    modality: EAppointmentModality.VIRTUAL,
    type: EAppointmentType.ADOLESCENT_THERAPY,
    paymentMethodType: EPaymentMethodType.YAPE,
    appointmentDateTime: "2026-06-15T09:00:00Z",
    createAt: "2026-06-06T23:01:06Z",
    reason: "",
    image: "",
  },
  {
    id: "2",
    status: EAppointmentStatus.CONFIRMED,
    customer: {
      fullName: "María López",
      email: "maria@gmail.com",
      phone: "999888777",
    },
    modality: EAppointmentModality.IN_PERSON,
    type: EAppointmentType.ADULT_THERAPY,
    paymentMethodType: EPaymentMethodType.BANK_ACCOUNT,
    appointmentDateTime: "2026-06-16T14:00:00Z",
    createAt: "2026-06-06T23:01:06Z",
    reason: "",
    image: "",
  },
  {
    id: "3",
    status: EAppointmentStatus.CANCELED,
    customer: {
      fullName: "Carlos Díaz",
      email: "carlos@gmail.com",
      phone: "987654321",
    },
    modality: EAppointmentModality.VIRTUAL,
    type: EAppointmentType.FAMILY_THERAPY,
    paymentMethodType: EPaymentMethodType.CARD,
    appointmentDateTime: "2026-06-18T10:00:00Z",
    createAt: "2026-06-06T23:01:06Z",
    reason: "El paciente solicitó reprogramar la cita.",
    image: "",
  },
];