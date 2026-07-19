import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type {
  ICreateServiceRequest,
  IService,
} from "./types/catalog.types";
import { getServicesService } from "./services/get-services.service";
import { toast } from "react-toastify";
import ServiceStatusSwitch from "./components/ServiceStatusSwitch";
import ServiceFormModal from "./components/ServiceFormModal";
import { updateServiceService } from "./services/update-service.service";
import { createServiceService } from "./services/create-service.service";


const MainCatalogManagementPage = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [savingService, setSavingService] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] =
    useState<IService | null>(null);

  const loadServices = useCallback(async () => {
    try {
      setLoadingServices(true);

      const response = await getServicesService();
      setServices(response);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron obtener los servicios.");
    } finally {
      setLoadingServices(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleOpenCreateModal = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service: IService) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (savingService) return;

    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleSaveService = async (
  payload: ICreateServiceRequest,
  serviceId?: string
) => {
    try {
      setSavingService(true);

      if (serviceId) {
        const { type: _, ...updatePayload } = payload;

        await updateServiceService(serviceId, updatePayload);

        toast.success("Servicio actualizado correctamente.");
      } else {
        await createServiceService(payload);

        toast.success("Servicio creado correctamente.");
      }

      await loadServices();

      setIsModalOpen(false);
      setSelectedService(null);
    } catch (error) {
      console.error(error);

      toast.error(
        serviceId
          ? "No se pudo actualizar el servicio."
          : "No se pudo crear el servicio."
      );
    } finally {
      setSavingService(false);
    }
  };

  const handleToggleStatus = async (service: IService) => {
    const newStatus = !service.active;

    try {
      setUpdatingStatusId(service.id);

      // Actualización optimista en la tabla.
      setServices((currentServices) =>
        currentServices.map((item) =>
          item.id === service.id
            ? {
              ...item,
              active: newStatus,
            }
            : item
        )
      );

      await updateServiceService(service.id, {
        name: service.name,
        price: service.price,
        active: newStatus,
        content: service.content,
      });

      toast.success(
        newStatus
          ? "El servicio fue activado."
          : "El servicio fue desactivado."
      );
    } catch (error) {
      console.error(error);

      // Se revierte el cambio si el backend falla.
      setServices((currentServices) =>
        currentServices.map((item) =>
          item.id === service.id
            ? {
              ...item,
              active: service.active,
            }
            : item
        )
      );

      toast.error("No se pudo cambiar el estado del servicio.");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-neutral-950 md:text-3xl">
              Servicios
            </h1>

            <p className="mt-1 text-sm text-neutral-500">
              Administra los servicios ofrecidos por la psicóloga.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-neutral-800"
          >
            <span className="text-lg leading-none">+</span>
            Agregar servicio
          </button>
        </header>

        <section className="mt-7 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          {loadingServices ? (
            <ServicesTableSkeleton />
          ) : services.length === 0 ? (
            <EmptyServices onCreate={handleOpenCreateModal} />
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead className="border-b border-neutral-200 bg-neutral-50">
                    <tr>
                      <TableHeader>Servicio</TableHeader>
                      <TableHeader>Tipo</TableHeader>
                      <TableHeader>Precio</TableHeader>
                      <TableHeader>Estado</TableHeader>
                      <TableHeader align="right">Acciones</TableHeader>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-neutral-100">
                    <AnimatePresence initial={false}>
                      {services.map((service) => (
                        <motion.tr
                          layout
                          key={service.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="transition hover:bg-neutral-50/80"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/5 text-lg"
                                style={{
                                  backgroundColor:
                                    service.content.color || "#F5F5F5",
                                }}
                              >
                                🧠
                              </div>

                              <div className="max-w-sm">
                                <p className="font-semibold text-neutral-900">
                                  {service.name}
                                </p>

                                <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500">
                                  {service.content.subtitle}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span className="rounded-lg bg-neutral-100 px-2.5 py-1.5 text-xs font-semibold text-neutral-600">
                              {formatServiceType(service.type)}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-sm font-semibold text-neutral-800">
                            {formatCurrency(service.price)}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <ServiceStatusSwitch
                                active={service.active}
                                loading={updatingStatusId === service.id}
                                onChange={() =>
                                  handleToggleStatus(service)
                                }
                              />

                              <span
                                className={`text-xs font-semibold ${service.active
                                    ? "text-emerald-600"
                                    : "text-neutral-400"
                                  }`}
                              >
                                {service.active ? "Activo" : "Inactivo"}
                              </span>
                            </div>
                          </td>

                          <td className="px-5 py-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenEditModal(service)
                              }
                              className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-100"
                            >
                              Editar
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-neutral-100 md:hidden">
                {services.map((service) => (
                  <ServiceMobileCard
                    key={service.id}
                    service={service}
                    updatingStatus={
                      updatingStatusId === service.id
                    }
                    onEdit={() => handleOpenEditModal(service)}
                    onToggle={() => handleToggleStatus(service)}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      <ServiceFormModal
        active={isModalOpen}
        service={selectedService}
        loading={savingService}
        onClose={handleCloseModal}
        onSubmit={handleSaveService}
      />
    </main>
  );
};

interface ServiceMobileCardProps {
  service: IService;
  updatingStatus: boolean;
  onEdit: () => void;
  onToggle: () => void;
}

const ServiceMobileCard = ({
  service,
  updatingStatus,
  onEdit,
  onToggle,
}: ServiceMobileCardProps) => (
  <motion.article
    layout
    className="p-4"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-start gap-3">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-black/5"
        style={{
          backgroundColor: service.content.color || "#F5F5F5",
        }}
      >
        🧠
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-bold text-neutral-900">{service.name}</p>

        <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
          {service.content.subtitle}
        </p>
      </div>

      <button
        type="button"
        onClick={onEdit}
        className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold"
      >
        Editar
      </button>
    </div>

    <div className="mt-4 flex items-center justify-between rounded-xl bg-neutral-50 p-3">
      <div>
        <p className="text-xs text-neutral-500">Precio</p>
        <p className="font-bold text-neutral-900">
          {formatCurrency(service.price)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`text-xs font-semibold ${service.active
              ? "text-emerald-600"
              : "text-neutral-400"
            }`}
        >
          {service.active ? "Activo" : "Inactivo"}
        </span>

        <ServiceStatusSwitch
          active={service.active}
          loading={updatingStatus}
          onChange={onToggle}
        />
      </div>
    </div>
  </motion.article>
);

const ServicesTableSkeleton = () => (
  <div className="animate-pulse divide-y divide-neutral-100">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="flex items-center justify-between gap-4 p-5"
      >
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-neutral-200" />

          <div>
            <div className="h-4 w-40 rounded bg-neutral-200" />
            <div className="mt-2 h-3 w-64 rounded bg-neutral-100" />
          </div>
        </div>

        <div className="h-8 w-20 rounded-lg bg-neutral-100" />
      </div>
    ))}
  </div>
);

const EmptyServices = ({ onCreate }: { onCreate: () => void }) => (
  <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-2xl">
      🧠
    </div>

    <h2 className="mt-4 font-bold text-neutral-900">
      No hay servicios registrados
    </h2>

    <p className="mt-1 max-w-sm text-sm text-neutral-500">
      Agrega el primer servicio que será mostrado a los pacientes.
    </p>

    <button
      type="button"
      onClick={onCreate}
      className="mt-5 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white"
    >
      Agregar servicio
    </button>
  </div>
);

interface TableHeaderProps {
  children: React.ReactNode;
  align?: "left" | "right";
}

const TableHeader = ({
  children,
  align = "left",
}: TableHeaderProps) => (
  <th
    className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500 ${align === "right" ? "text-right" : "text-left"
      }`}
  >
    {children}
  </th>
);

const formatCurrency = (price: number) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(price);

const formatServiceType = (type: string) =>
  type
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default MainCatalogManagementPage;