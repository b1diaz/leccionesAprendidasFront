import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, differenceInDays, startOfMonth } from "date-fns";
import { es } from "date-fns/locale/es";
import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";

interface CustomDateRangeProps {
  onChange: (dates: [Date | null, Date | null]) => void;
  className?: string;
  label?: string;
}

const CustomDateRange: React.FC<CustomDateRangeProps> = ({
  onChange,
  className,
  label = "Rango de Fechas",
}) => {
  const today = new Date();
  const firstDayOfMonth = startOfMonth(today);
  
  // Inicializar con rango desde el primer día del mes actual hasta hoy
  const [startDate, setStartDate] = useState<Date | null>(firstDayOfMonth);
  const [endDate, setEndDate] = useState<Date | null>(today);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Llamar onChange con rango por defecto al montar
  useEffect(() => {
    onChange([firstDayOfMonth, today]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartDateChange = (date: Date | null) => {
    if (!date) {
      setStartDate(null);
      setEndDate(null);
      onChange([null, null]);
      return;
    }

    setStartDate(date);
    // Si hay una fecha final y el nuevo rango es válido, mantenerla
    // Si el nuevo rango excede 1 año, resetear la fecha final
    if (endDate) {
      const daysDifference = Math.abs(differenceInDays(endDate, date));
      if (daysDifference > 365) {
        setEndDate(null);
        onChange([date, null]);
      } else {
        onChange([date, endDate]);
      }
    } else {
      onChange([date, null]);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (!date || !startDate) {
      setEndDate(null);
      onChange([startDate, null]);
      return;
    }

    // Validar que el rango no sea mayor a un año
    const daysDifference = Math.abs(differenceInDays(date, startDate));
    if (daysDifference > 365) {
      // No permitir la selección si excede 1 año
      return;
    }

    setEndDate(date);
    onChange([startDate, date]);
    setIsOpen(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    try {
      return format(date, "dd/MM/yyyy", { locale: es });
    } catch {
      return format(date, "dd/MM/yyyy");
    }
  };

  const displayText = startDate
    ? endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : formatDate(startDate)
    : "";

  // Estilos personalizados para react-datepicker
  const customInputClass = cn(
    "relative w-full rounded-md border bg-white px-3 py-2.5 text-sm cursor-pointer transition-colors text-left",
    "focus:outline-none focus:ring-0",
    isOpen
      ? "border-blue-500 ring-2 ring-blue-500/20 ring-offset-0"
      : "border-gray-300 hover:border-gray-400"
  );

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <label
          className={cn(
            "absolute -top-2 left-2 px-1.5 bg-white text-xs font-medium pointer-events-none transition-colors z-10",
            isOpen ? "text-blue-500" : "text-foreground"
          )}
        >
          {label}
        </label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate ? new Date(endDate.getTime() + 365 * 24 * 60 * 60 * 1000) : undefined}
          locale={es}
          dateFormat="dd/MM/yyyy"
          className={customInputClass}
          wrapperClassName="w-full"
          onCalendarOpen={() => setIsOpen(true)}
          onCalendarClose={() => {
            // Solo cerrar si el rango está completo
            if (startDate && endDate) {
              setIsOpen(false);
            }
          }}
          customInput={
            <div className={customInputClass}>
              <div className="flex items-center justify-between pt-1">
                <span className={cn("text-sm", !displayText && "text-muted-foreground")}>
                  {displayText || "Seleccionar fechas..."}
                </span>
                <CalendarIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          }
          calendarClassName="!shadow-lg"
        />
      </div>
      {isOpen && startDate && !endDate && (
        <div className="absolute top-full left-0 mt-2 z-50">
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000)}
            locale={es}
            dateFormat="dd/MM/yyyy"
            inline
            calendarClassName="!shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default CustomDateRange;

