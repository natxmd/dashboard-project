interface Props {
  label: string;
  text: string;
  hasRightBorder?: boolean;
  hasTopBorder?: boolean;
}

export const AppointmentInfoField = ({
  label,
  text,
  hasRightBorder,
  hasTopBorder,
}: Props) => {
  return (
    <div
      className={`
        p-5 text-center
        ${hasRightBorder ? "border-r border-gray-200" : ""}
        ${hasTopBorder ? "border-t border-gray-200" : ""}
      `}
    >
      <p className="mb-2 text-xs text-gray-400">
        {label}
      </p>

      <p className="text-sm font-medium text-gray-700">
        {text}
      </p>
    </div>
  );
};