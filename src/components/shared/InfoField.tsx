import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoFieldProps {
  label: string;
  value?: string;
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export const InfoField = ({
  label,
  value,
  children,
  icon,
  className,
}: InfoFieldProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="relative w-full rounded-md border border-gray-300 bg-white px-3 py-2.5">
        <label className="absolute -top-2 left-2 px-1.5 bg-white text-xs font-medium text-gray-700 pointer-events-none">
          {label}
        </label>
        <div className="flex items-center gap-2 pt-1">
          {icon}
          {children || <p className="text-sm text-gray-900">{value}</p>}
        </div>
      </div>
    </div>
  );
};
