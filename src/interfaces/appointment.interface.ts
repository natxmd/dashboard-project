import type { ICustomer } from "./customer.interface";

export enum EAppointmentStatus {
    CREATE = "CREATE",
    CONFIRMED = "CONFIRMED",
    DECLINED = "DECLINED",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}

export enum EAppointmentModality {
    VIRTUAL = "VIRTUAL",
    IN_PERSON = "IN_PERSON",
}

export enum EAppointmentType {
    ADOLESCENT_THERAPY = "ADOLESCENT_THERAPY",
    ADULT_THERAPY = "ADULT_THERAPY",
    VOCATIONAL_GUIDANCE = "VOCATIONAL_GUIDANCE",
    COUPLES_THERAPY = "COUPLES_THERAPY",
    FAMILY_THERAPY = "FAMILY_THERAPY",
}

export enum EPaymentMethodType {
    YAPE = "YAPE",
    BANK_ACCOUNT = "BANK_ACCOUNT",
    CARD = "CARD",
}

export interface IAppointment {
    id: string;
    status: EAppointmentStatus;
    customer: ICustomer;
    modality: EAppointmentModality;
    type: EAppointmentType;
    paymentMethodType: EPaymentMethodType;
    appointmentDateTime: string;
    createAt: string
    reason?: string; 
    image?: string; //Voucher o comprobante
}