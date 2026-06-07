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

const statusMap: Record<string, string> = {
    CREATE: "Pendiente",
    CONFIRMED: "Confirmada",
    DECLINED: "Rechazada",
    COMPLETED: "Completada",
    CANCELED: "Cancelada",
};

export const getHistoryAppointmentFields = (appointment: IAppointment): IAppointmentField[] => [
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
        label: "Estado Final",
        text: statusMap[appointment.status] || appointment.status,
    },
    {
        label: "Método de Pago",
        text: paymentMethodMap[appointment.paymentMethodType] || appointment.paymentMethodType,
    },
    {
        label: "Motivo / Razón",
        text: appointment.reason || "Sin observaciones específicas",
    },
];