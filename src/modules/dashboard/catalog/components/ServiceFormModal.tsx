import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import {
    useFieldArray,
    useForm,
    type SubmitHandler,
} from "react-hook-form";
import type { ICreateServiceRequest, IService, IServiceForm } from "../types/catalog.types";
import ServiceCard from "./ServiceCard";
interface Props {
    active: boolean;
    service?: IService | null;
    loading?: boolean;
    onClose: () => void;
    onSubmit: (
        payload: ICreateServiceRequest,
        serviceId?: string
    ) => Promise<void> | void;
}

const DEFAULT_VALUES: IServiceForm = {
    type: "",
    name: "",
    price: 0,
    active: true,
    subtitle: "",
    description: "",
    targetAudience: [""],
    workTopics: [""],
    buttonText: "",
    icon: "",
    color: "#F2EDFE",
};

const ServiceFormModal = ({
    active,
    service,
    loading = false,
    onClose,
    onSubmit,
}: Props) => {
    const isEditing = Boolean(service);

    const {
        register,
        control,
        reset,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IServiceForm>({
        defaultValues: DEFAULT_VALUES,
    });

    const {
        fields: targetAudienceFields,
        append: appendTargetAudience,
        remove: removeTargetAudience,
    } = useFieldArray({
        control,
        name: "targetAudience" as never,
    });

    const {
        fields: workTopicsFields,
        append: appendWorkTopic,
        remove: removeWorkTopic,
    } = useFieldArray({
        control,
        name: "workTopics" as never,
    });

    const selectedColor = watch("color");

    useEffect(() => {
        if (!active) return;

        if (service) {
            reset({
                type: service.type,
                name: service.name,
                price: service.price,
                active: service.active,
                subtitle: service.content.subtitle,
                description: service.content.description,
                targetAudience:
                    service.content.targetAudience.length > 0
                        ? service.content.targetAudience
                        : [""],
                workTopics:
                    service.content.workTopics.length > 0
                        ? service.content.workTopics
                        : [""],
                buttonText: service.content.buttonText,
                icon: service.content.icon,
                color: service.content.color,
            });

            return;
        }

        reset(DEFAULT_VALUES);
    }, [active, service, reset]);

    const handleClose = () => {
        if (loading) return;

        reset(DEFAULT_VALUES);
        onClose();
    };

    const submitForm: SubmitHandler<IServiceForm> = async (data) => {
        const payload: ICreateServiceRequest = {
            type: data.type.trim(),
            name: data.name.trim(),
            price: Number(data.price),
            active: data.active,
            content: {
                subtitle: data.subtitle.trim(),
                description: data.description.trim(),
                targetAudience: data.targetAudience
                    .map((item) => item.trim())
                    .filter(Boolean),
                workTopics: data.workTopics
                    .map((item) => item.trim())
                    .filter(Boolean),
                buttonText: data.buttonText.trim(),
                icon: data.icon.trim(),
                color: data.color,
            },
        };

        await onSubmit(payload, service?.id);
    };

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseDown={handleClose}
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30,
                            scale: 0.97,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 20,
                            scale: 0.97,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeOut",
                        }}
                        onMouseDown={(event) => event.stopPropagation()}
                        className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <header className="flex items-start justify-between border-b border-neutral-200 px-6 py-5">
                            <div>
                                <h2 className="text-xl font-bold text-neutral-900">
                                    {isEditing ? "Editar servicio" : "Agregar servicio"}
                                </h2>

                                <p className="mt-1 text-sm text-neutral-500">
                                    {isEditing
                                        ? "Actualiza la información mostrada a los pacientes."
                                        : "Registra un nuevo servicio ofrecido por la psicóloga."}
                                </p>
                            </div>

                            <button
                                type="button"
                                disabled={loading}
                                onClick={handleClose}
                                className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                            >
                                ×
                            </button>
                        </header>

                        <form
                            onSubmit={handleSubmit(submitForm)}
                            className="flex max-h-[calc(92vh-90px)] flex-col"
                        >
                            <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
                                <section>
                                    <SectionTitle
                                        title="Información general"
                                        description="Datos principales del servicio."
                                    />

                                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                                        <FormField
                                            label="Código del servicio"
                                            error={errors.type?.message}
                                        >
                                            <input
                                                {...register("type", {
                                                    required: "Ingresa el tipo del servicio.",
                                                })}
                                                disabled={isEditing}
                                                placeholder="Ej. INDIVIDUAL_THERAPY"
                                                className={inputClass}
                                            />
                                        </FormField>

                                        <FormField
                                            label="Nombre del servicio"
                                            error={errors.name?.message}
                                        >
                                            <input
                                                {...register("name", {
                                                    required: "Ingresa el nombre del servicio.",
                                                })}
                                                placeholder="Ej. Terapia individual"
                                                className={inputClass}
                                            />
                                        </FormField>

                                        <FormField
                                            label="Precio"
                                            error={errors.price?.message}
                                        >
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                                                    S/
                                                </span>

                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    {...register("price", {
                                                        required: "Ingresa el precio.",
                                                        valueAsNumber: true,
                                                        min: {
                                                            value: 0,
                                                            message: "El precio no puede ser negativo.",
                                                        },
                                                    })}
                                                    className={`${inputClass} pl-10`}
                                                />
                                            </div>
                                        </FormField>
                                    </div>
                                </section>

                                <section>
                                    <SectionTitle
                                        title="Contenido informativo"
                                        description="Esta información se mostrará en la página del servicio."
                                    />

                                    <div className="mt-4 space-y-4">
                                        <FormField
                                            label="Subtítulo"
                                            error={errors.subtitle?.message}
                                        >
                                            <textarea
                                                {...register("subtitle", {
                                                    required: "Ingresa el subtítulo.",
                                                })}
                                                rows={2}
                                                placeholder="Resumen corto del servicio"
                                                className={textareaClass}
                                            />
                                        </FormField>

                                        <FormField
                                            label="Descripción"
                                            error={errors.description?.message}
                                        >
                                            <textarea
                                                {...register("description", {
                                                    required: "Ingresa la descripción.",
                                                })}
                                                rows={4}
                                                placeholder="Explica en qué consiste el servicio"
                                                className={textareaClass}
                                            />
                                        </FormField>

                                        <FormField
                                            label="Texto del botón"
                                            error={errors.buttonText?.message}
                                        >
                                            <input
                                                {...register("buttonText", {
                                                    required: "Ingresa el texto del botón.",
                                                })}
                                                placeholder="Ej. Agenda un espacio para comenzar"
                                                className={inputClass}
                                            />
                                        </FormField>
                                    </div>
                                </section>

                                <section className="grid gap-6 lg:grid-cols-2">
                                    <DynamicListField
                                        title="¿Para quién está dirigido?"
                                        placeholder="Ej. Personas que buscan fortalecer su autoestima."
                                        fields={targetAudienceFields}
                                        registerName="targetAudience"
                                        register={register}
                                        onAdd={() => appendTargetAudience("" as never)}
                                        onRemove={removeTargetAudience}
                                    />

                                    <DynamicListField
                                        title="Temas que se trabajan"
                                        placeholder="Ej. Gestión emocional."
                                        fields={workTopicsFields}
                                        registerName="workTopics"
                                        register={register}
                                        onAdd={() => appendWorkTopic("" as never)}
                                        onRemove={removeWorkTopic}
                                    />
                                </section>

                                <section>
                                    <SectionTitle
                                        title="Apariencia"
                                        description="Configura el ícono y color asociado al servicio."
                                    />

                                    <div className="mt-4 grid gap-4 md:grid-cols-[1fr_220px]">
                                        <FormField
                                            label="Nombre del ícono de Font Awesome"
                                            error={errors.icon?.message}
                                        >
                                            <input
                                                {...register("icon", {
                                                    required: "Ingresa el nombre del ícono.",
                                                })}
                                                placeholder="Ej. faBrain"
                                                className={inputClass}
                                            />

                                            <p className="mt-1 text-xs text-neutral-400">
                                                Ingresa el nombre exacto del ícono de Font Awesome.
                                            </p>
                                        </FormField>

                                        <FormField
                                            label="Color de la tarjeta"
                                            error={errors.color?.message}
                                        >
                                            <div className="flex h-[46px] items-center gap-3 rounded-xl border border-neutral-200 px-3">
                                                <input
                                                    type="color"
                                                    {...register("color", {
                                                        required: "Selecciona un color.",
                                                    })}
                                                    className="h-8 w-10 cursor-pointer border-0 bg-transparent p-0"
                                                />

                                                <span className="text-sm font-medium uppercase text-neutral-600">
                                                    {selectedColor}
                                                </span>
                                            </div>
                                        </FormField>
                                    </div>

                                    <div className="mt-4">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                            Vista previa
                                        </p>

                                        <div className="max-w-sm">
                                            <ServiceCard
                                                title={watch("name") || "Nombre del servicio"}
                                                subtitle={
                                                    watch("subtitle") ||
                                                    "Aquí aparecerá el subtítulo del servicio."
                                                }
                                                color={watch("color")}
                                                icon={<span className="text-2xl">🧠</span>}
                                                onClick={() => { }}
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <footer className="flex justify-end gap-3 border-t border-neutral-200 bg-white px-6 py-4">
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={handleClose}
                                    className="rounded-xl border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex min-w-[150px] items-center justify-center rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    ) : isEditing ? (
                                        "Guardar cambios"
                                    ) : (
                                        "Crear servicio"
                                    )}
                                </button>
                            </footer>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

interface FormFieldProps {
    label: string;
    error?: string;
    children: React.ReactNode;
}

const FormField = ({ label, error, children }: FormFieldProps) => (
    <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-neutral-700">
            {label}
        </span>

        {children}

        {error && (
            <span className="mt-1 block text-xs font-medium text-red-500">
                {error}
            </span>
        )}
    </label>
);

interface SectionTitleProps {
    title: string;
    description: string;
}

const SectionTitle = ({ title, description }: SectionTitleProps) => (
    <div>
        <h3 className="font-bold text-neutral-900">{title}</h3>
        <p className="mt-0.5 text-sm text-neutral-500">{description}</p>
    </div>
);

interface DynamicListFieldProps {
    title: string;
    placeholder: string;
    fields: Array<{ id: string }>;
    registerName: "targetAudience" | "workTopics";
    register: ReturnType<typeof useForm<IServiceForm>>["register"];
    onAdd: () => void;
    onRemove: (index: number) => void;
}

const DynamicListField = ({
    title,
    placeholder,
    fields,
    registerName,
    register,
    onAdd,
    onRemove,
}: DynamicListFieldProps) => (
    <div className="rounded-2xl border border-neutral-200 p-4">
        <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-neutral-900">{title}</h3>

            <button
                type="button"
                onClick={onAdd}
                className="rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-200"
            >
                + Agregar
            </button>
        </div>

        <div className="mt-4 space-y-3">
            {fields.map((field, index) => (
                <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2"
                >
                    <span className="mt-3 text-xs font-bold text-neutral-400">
                        {index + 1}.
                    </span>

                    <input
                        {...register(`${registerName}.${index}` as const, {
                            required: "Completa este campo.",
                        })}
                        placeholder={placeholder}
                        className={inputClass}
                    />

                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        disabled={fields.length === 1}
                        className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg text-neutral-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        ×
                    </button>
                </motion.div>
            ))}
        </div>
    </div>
);

const inputClass =
    "h-[46px] w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500";

const textareaClass =
    "w-full resize-none rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100";

export default ServiceFormModal;