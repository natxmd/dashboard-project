import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { EAppointmentStatus, type IAppointment } from "../../../interfaces/appointment.interface";
import AppointmentStatusTag from "../tags/AppointmentStatusTag";
import AppointmentActionButtons from "../buttons/AppointmentActionButtons";
import { getNewAppointmentFields, type IAppointmentField } from "../../../modules/dashboard/new-appoinments/utils/fields-card-new-appointment";
import { AppointmentInfoField } from "../../elements/AppointmentInfoField";

interface Props {
    appointment: IAppointment;
    fields?: IAppointmentField[];
    onConfirm?: (id: string) => void;
    onDecline?: (id: string) => void;
    onComplete?: (id: string) => void;
    onCancel?: (id: string) => void;
}

const AppointmentCard = ({
    appointment,
    fields,
    onConfirm,
    onDecline,
    onComplete,
    onCancel,
}: Props) => {
    const displayFields = fields || getNewAppointmentFields(appointment);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between p-3">
                <AppointmentStatusTag status={appointment.status} />
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MdOutlineDateRange className="text-base" />
                    {new Date(appointment.createAt).toLocaleString()}
                </div>
            </div>

            <div className="grid grid-cols-3 border-y border-gray-200">
                {displayFields.map((field) => (
                    <AppointmentInfoField
                        key={field.label}
                        label={field.label}
                        text={field.text}
                    />
                ))}
            </div>

            {(() => {
                const hasActions = [EAppointmentStatus.CREATE, EAppointmentStatus.CONFIRMED].includes(appointment.status);
                return (
                    <div className={`flex items-center p-3 bg-gray-50 ${hasActions ? "justify-between" : "justify-center"}`}>
                        <button className="flex items-center gap-2 rounded-full border border-green-500 px-4 py-2 text-sm font-medium text-green-500 transition hover:bg-green-500 hover:text-white">
                            <FaWhatsapp />
                            Contactar paciente
                        </button>

                        {hasActions && (
                            <AppointmentActionButtons
                                status={appointment.status}
                                onConfirm={() => onConfirm?.(appointment.id)}
                                onDecline={() => onDecline?.(appointment.id)}
                                onComplete={() => onComplete?.(appointment.id)}
                                onCancel={() => onCancel?.(appointment.id)}
                            />
                        )}
                    </div>
                );
            })()}
        </div>
    );
};

export default AppointmentCard;