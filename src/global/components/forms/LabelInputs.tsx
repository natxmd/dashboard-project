import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function LabelInput({ label, className = "", ...props }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        {...props}
        className={`
          rounded-xl
          border
          border-slate-700
          bg-slate-800
          px-4
          py-3
          text-white
          outline-none
          transition
          focus:border-primary
          ${className}
        `}
      />
    </div>
  );
}