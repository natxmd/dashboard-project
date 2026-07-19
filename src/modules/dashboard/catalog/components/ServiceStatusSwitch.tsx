import { motion } from "framer-motion";

interface Props {
  active: boolean;
  loading?: boolean;
  onChange: () => void;
}

const ServiceStatusSwitch = ({
  active,
  loading = false,
  onChange,
}: Props) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      disabled={loading}
      onClick={onChange}
      className={`
        relative h-7 w-12 rounded-full transition-colors duration-300
        disabled:cursor-not-allowed disabled:opacity-60
        ${active ? "bg-neutral-900" : "bg-neutral-300"}
      `}
    >
      <motion.span
        initial={false}
        animate={{
          x: active ? 22 : 3,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="absolute left-0 top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-sm"
      />

      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </span>
      )}
    </button>
  );
};

export default ServiceStatusSwitch;