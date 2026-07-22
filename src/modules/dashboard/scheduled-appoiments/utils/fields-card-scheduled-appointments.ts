import type { IAppointment } from "../../../../interfaces/appointment.interface";

export interface IAppointmentField {
    label: string;
    text: string;
}

const serviceTypeMap: Record<string, string> = {
    ADOLESCENT_THERAPY: "Terapia de Adolescentes",
    ADULT_THERAPY: "Terapia de Adultos",
    VOCATIONAL_GUIDANCE: "Orientación Vocacional",
    COUPLES_THERAPY: "Terapia de Parejas",
    FAMILY_THERAPY: "Terapia Familiar",
};

const paymentMethodMap: Record<string, string> = {
    YAPE: "Yape",
    BANK_ACCOUNT: "Transferencia Bancaria",
    CARD: "Tarjeta de Crédito/Débito",
};

const modalityMap: Record<string, string> = {
    VIRTUAL: "Virtual (Videollamada)",
    IN_PERSON: "Presencial (Consultorio)",
};

export const getScheduledAppointmentFields = (appointment: IAppointment): IAppointmentField[] => [
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
        label: "Tipo de Servicio",
        text: serviceTypeMap[appointment.type] || appointment.type,
    },
    {
        label: "Modalidad",
        text: modalityMap[appointment.modality] || appointment.modality,
    },
    {
        label: "Método de Pago",
        text: paymentMethodMap[appointment.paymentMethodType] || appointment.paymentMethodType,
    },
    {
        label: "Contacto",
        text: `${appointment.customer.phone} / ${appointment.customer.email}`,
    },
    {
        label: "Motivo de Consulta",
        text: appointment.description || "No especificado",
    },
];