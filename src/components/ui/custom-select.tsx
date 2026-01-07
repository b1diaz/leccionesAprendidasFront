import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectar clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedLabel = value ? options.find((opt) => opt === value) || value : placeholder;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Contenedor principal */}
      <div
        className={cn(
          "relative w-full rounded-md border bg-white px-3 py-2.5 text-sm cursor-pointer transition-colors",
          isOpen
            ? "border-blue-500 ring-2 ring-blue-500/20 ring-offset-0"
            : "border-gray-300 hover:border-gray-400"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Label flotante */}
        <label
          className={cn(
            "absolute -top-2 left-2 px-1.5 bg-white text-xs font-medium pointer-events-none transition-colors",
            isOpen ? "text-blue-500" : "text-foreground"
          )}
        >
          {label}
        </label>

        {/* Valor seleccionado */}
        <div className="flex items-center justify-between pt-1">
          <span className={cn("text-sm", !value && "text-muted-foreground")}>
            {selectedLabel}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </div>

      {/* Lista desplegable */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={cn(
                "px-3 py-2 text-sm cursor-pointer transition-colors hover:bg-gray-100",
                value === option && "bg-gray-100"
              )}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;


