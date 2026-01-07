import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronsLeft, ChevronsRight } from "lucide-react";
import { format, differenceInDays, startOfMonth, addDays } from "date-fns";
import { es } from "date-fns/locale/es";
import { DateRange, CaptionProps } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Componente Caption vacío para ocultar el selector de mes del Calendar
const EmptyCaption = (_props: CaptionProps) => {
  return <div className="hidden" />;
};

interface CustomDateRangeProps {
  value?: [Date | null, Date | null];
  onChange: (dates: [Date | null, Date | null]) => void;
  className?: string;
  label?: string;
}

const CustomDateRange: React.FC<CustomDateRangeProps> = ({
  value,
  onChange,
  className,
  label = "Rango de Fechas",
}) => {
  const today = new Date();
  const firstDayOfMonth = startOfMonth(today);
  
  // Usar el valor del prop si está disponible, sino null (no valores por defecto)
  const initialStartDate = value?.[0] ?? null;
  const initialEndDate = value?.[1] ?? null;
  
  // Inicializar con el valor del prop (puede ser null)
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  // Estados temporales para la selección en el popover (antes de aplicar)
  const [tempStartDate, setTempStartDate] = useState<Date | null>(initialStartDate);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(initialEndDate);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStartMonth, setCurrentStartMonth] = useState<Date>(initialStartDate || firstDayOfMonth);
  const [currentEndMonth, setCurrentEndMonth] = useState<Date>(initialEndDate || today);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sincronizar el estado interno con el prop value cuando cambie
  useEffect(() => {
    if (value !== undefined) {
      const [newStartDate, newEndDate] = value;
      // Solo actualizar si el valor es diferente al estado actual
      // Comparar fechas usando getTime() para comparación correcta
      const startChanged = newStartDate?.getTime() !== startDate?.getTime();
      const endChanged = newEndDate?.getTime() !== endDate?.getTime();
      
      if (startChanged || endChanged) {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        // Actualizar meses actuales si hay fechas
        if (newStartDate) {
          setCurrentStartMonth(newStartDate);
        } else if (!newStartDate && !newEndDate) {
          // Si ambas son null, resetear a valores por defecto para los meses
          setCurrentStartMonth(firstDayOfMonth);
          setCurrentEndMonth(today);
        }
        if (newEndDate) {
          setCurrentEndMonth(newEndDate);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Sincronizar estados temporales cuando se abre el popover
  useEffect(() => {
    if (isOpen) {
      setTempStartDate(startDate);
      setTempEndDate(endDate);
    }
  }, [isOpen, startDate, endDate]);

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (!range) {
      setTempStartDate(null);
      setTempEndDate(null);
      return;
    }

    if (range.from) {
      setTempStartDate(range.from);
      setCurrentStartMonth(range.from);
      
      if (range.to) {
        // Validar que el rango no sea mayor a un año
        const daysDifference = Math.abs(differenceInDays(range.to, range.from));
        if (daysDifference > 365) {
          // Si excede 1 año, solo mantener la fecha inicial
          setTempEndDate(null);
          return;
        }
        setTempEndDate(range.to);
        setCurrentEndMonth(range.to);
    } else {
        setTempEndDate(null);
      }
    }
  };

  const handleApply = () => {
    // Validar que haya al menos fecha inicial
    if (!tempStartDate) {
      return;
    }

    // Si hay fecha final, validar el rango
    if (tempEndDate) {
      const daysDifference = Math.abs(differenceInDays(tempEndDate, tempStartDate));
      if (daysDifference > 365) {
        // No aplicar si excede 1 año
        return;
      }
    }

    // Aplicar los cambios
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    onChange([tempStartDate, tempEndDate]);
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

  // Crear objeto DateRange para el calendario
  const dateRange: DateRange | undefined = tempStartDate
    ? {
        from: tempStartDate,
        to: tempEndDate || undefined,
      }
    : undefined;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Dialog 
        open={isOpen} 
        onOpenChange={(open) => {
          // Solo permitir cerrar si el rango está completo o si se cancela explícitamente
          if (!open && startDate && !endDate) {
            return;
          }
          setIsOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <button
            type="button"
            className={cn(
              "relative w-full rounded-md border bg-white px-3 py-2.5 text-sm cursor-pointer transition-colors text-left",
              "focus:outline-none focus:ring-0",
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

            {/* Contenido del input */}
            <div className="flex items-center justify-between pt-1">
              <span className={cn("text-sm", !displayText && "text-muted-foreground")}>
                {displayText || "Seleccionar fechas..."}
              </span>
              <CalendarIcon className="h-4 w-4 text-gray-400" />
            </div>
          </button>
        </DialogTrigger>
        <DialogContent 
          className="max-w-[90vw] sm:max-w-[800px] p-4"
          onInteractOutside={(e) => {
            // Prevenir que se cierre al hacer clic fuera si el rango no está completo
            if (startDate && !endDate) {
              e.preventDefault();
            }
          }}
        >
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              {/* Calendario de Fecha Inicial */}
              <div className="flex flex-col w-full sm:w-auto">
                <div className="flex flex-col mb-3 px-2">
                  <h3 className="text-sm font-semibold text-foreground mb-4 text-center">Fecha Inicial</h3>
                  <div className="flex items-center gap-1 justify-center flex-wrap">
                    {/* Selector de Año */}
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          const newDate = new Date(currentStartMonth.getFullYear() - 1, currentStartMonth.getMonth(), 1);
                          setCurrentStartMonth(newDate);
                        }}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "h-7 w-7 p-0 opacity-50"
                        )}
                        aria-label="Año anterior"
                      >
                        <ChevronsLeft className="h-3.5 w-3.5" />
                      </button>
                      <Select
                        value={currentStartMonth.getFullYear().toString()}
                        onValueChange={(year) => {
                          const newDate = new Date(parseInt(year), currentStartMonth.getMonth(), 1);
                          setCurrentStartMonth(newDate);
                        }}
                      >
                        <SelectTrigger className="h-7 w-[75px] text-xs font-medium px-2 text-center">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[150px]">
                          {Array.from({ length: 21 }, (_, i) => {
                            const year = currentStartMonth.getFullYear() - 10 + i;
                            return (
                              <SelectItem key={year} value={year.toString()} className="text-xs py-1">
                                {year}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <button
                        type="button"
                        onClick={() => {
                          const newDate = new Date(currentStartMonth.getFullYear() + 1, currentStartMonth.getMonth(), 1);
                          setCurrentStartMonth(newDate);
                        }}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "h-7 w-7 p-0 opacity-50"
                        )}
                        aria-label="Año siguiente"
                      >
                        <ChevronsRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {/* Selector de Mes */}
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          const newDate = new Date(currentStartMonth.getFullYear(), currentStartMonth.getMonth() - 1, 1);
                          setCurrentStartMonth(newDate);
                        }}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "h-7 w-7 p-0 opacity-50"
                        )}
                        aria-label="Mes anterior"
                      >
                        <ChevronsLeft className="h-3.5 w-3.5" />
                      </button>
                      <Select
                        value={currentStartMonth.getMonth().toString()}
                        onValueChange={(month) => {
                          const newDate = new Date(currentStartMonth.getFullYear(), parseInt(month), 1);
                          setCurrentStartMonth(newDate);
                        }}
                      >
                        <SelectTrigger className="h-7 w-[110px] text-xs font-medium px-2 text-center">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[150px]">
                          {[
                            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                          ].map((month, index) => (
                            <SelectItem key={index} value={index.toString()} className="text-xs py-1">
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <button
                        type="button"
                        onClick={() => {
                          const newDate = new Date(currentStartMonth.getFullYear(), currentStartMonth.getMonth() + 1, 1);
                          setCurrentStartMonth(newDate);
                        }}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "h-7 w-7 p-0 opacity-50"
                        )}
                        aria-label="Mes siguiente"
                      >
                        <ChevronsRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleRangeSelect}
                  month={currentStartMonth}
                  onMonthChange={setCurrentStartMonth}
                  locale={es}
                  className="rounded-md border-0 p-2"
                  classNames={{
                    months: "flex flex-col space-y-0",
                    month: "space-y-2",
                    caption: "hidden",
                    caption_label: "hidden",
                    nav: "hidden",
                    nav_button: "hidden",
                    table: "w-full border-collapse space-y-0",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-9 h-9 font-normal text-[0.75rem]",
                    row: "flex w-full mt-1",
                    cell: "h-9 w-9 text-center text-xs p-0 relative",
                    day: "h-9 w-9 p-0 font-normal text-xs aria-selected:opacity-100",
                    day_range_end: "day-range-end",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "day-outside text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                  components={{
                    Caption: EmptyCaption,
                  }}
                  numberOfMonths={1}
                />
              </div>

              {/* Calendario de Fecha Final */}
              <div className="flex flex-col w-full sm:w-auto">
                <div className="flex flex-col mb-3 px-2">
                  <h3 className="text-sm font-semibold text-foreground mb-4 text-center">Fecha Final</h3>
                  <div className="flex items-center gap-1 justify-center flex-wrap">
                    {/* Selector de Año */}
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          const newDate = new Date(currentEndMonth.getFullYear() - 1, currentEndMonth.getMonth(), 1);
                          setCurrentEndMonth(newDate);
                        }}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "h-7 w-7 p-0 opacity-50"
                        )}
                        aria-label="Año anterior"
                      >
                        <ChevronsLeft className="h-3.5 w-3.5" />
                      </button>
                      <Select
                        value={currentEndMonth.getFullYear().toString()}
                        onValueChange={(year) => {
                          const newDate = new Date(parseInt(year), currentEndMonth.getMonth(), 1);
                          setCurrentEndMonth(newDate);
                        }}
                      >
                        <SelectTrigger className="h-7 w-[75px] text-xs font-medium px-2 text-center">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[150px]">
                          {Array.from({ length: 21 }, (_, i) => {
                            const year = currentEndMonth.getFullYear() - 10 + i;
                            return (
                              <SelectItem key={year} value={year.toString()} className="text-xs py-1">
                                {year}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <button
                        type="button"
                        onClick={() => {
                          const newDate = new Date(currentEndMonth.getFullYear() + 1, currentEndMonth.getMonth(), 1);
                          setCurrentEndMonth(newDate);
                        }}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "h-7 w-7 p-0 opacity-50"
                        )}
                        aria-label="Año siguiente"
                      >
                        <ChevronsRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {/* Selector de Mes */}
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          const newDate = new Date(currentEndMonth.getFullYear(), currentEndMonth.getMonth() - 1, 1);
                          setCurrentEndMonth(newDate);
                        }}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "h-7 w-7 p-0 opacity-50"
                        )}
                        aria-label="Mes anterior"
                      >
                        <ChevronsLeft className="h-3.5 w-3.5" />
                      </button>
                      <Select
                        value={currentEndMonth.getMonth().toString()}
                        onValueChange={(month) => {
                          const newDate = new Date(currentEndMonth.getFullYear(), parseInt(month), 1);
                          setCurrentEndMonth(newDate);
                        }}
                      >
                        <SelectTrigger className="h-7 w-[110px] text-xs font-medium px-2 text-center">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[150px]">
                          {[
                            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                          ].map((month, index) => (
                            <SelectItem key={index} value={index.toString()} className="text-xs py-1">
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <button
                        type="button"
                        onClick={() => {
                          const newDate = new Date(currentEndMonth.getFullYear(), currentEndMonth.getMonth() + 1, 1);
                          setCurrentEndMonth(newDate);
                        }}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "h-7 w-7 p-0 opacity-50"
                        )}
                        aria-label="Mes siguiente"
                      >
                        <ChevronsRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
          <Calendar
            mode="range"
            selected={dateRange}
                  onSelect={handleRangeSelect}
                  month={currentEndMonth}
                  onMonthChange={setCurrentEndMonth}
            locale={es}
                  className="rounded-md border-0 p-2"
                  classNames={{
                    months: "flex flex-col space-y-0",
                    month: "space-y-2",
                    caption: "hidden",
                    caption_label: "hidden",
                    nav: "hidden",
                    nav_button: "hidden",
                    table: "w-full border-collapse space-y-0",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-9 h-9 font-normal text-[0.75rem]",
                    row: "flex w-full mt-1",
                    cell: "h-9 w-9 text-center text-xs p-0 relative",
                    day: "h-9 w-9 p-0 font-normal text-xs aria-selected:opacity-100",
                    day_range_end: "day-range-end",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "day-outside text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                  components={{
                    Caption: EmptyCaption,
                  }}
                  numberOfMonths={1}
                  disabled={(date) => {
                    // Deshabilitar fechas antes de la fecha inicial
                    if (tempStartDate && date < tempStartDate) {
                      return true;
                    }
                    // Deshabilitar fechas que excedan 365 días desde la fecha inicial
                    if (tempStartDate) {
                      const daysDifference = Math.abs(differenceInDays(date, tempStartDate));
                      return daysDifference > 365;
                    }
                    // Si no hay fecha inicial, deshabilitar todas
                    return true;
                  }}
                />
              </div>
            </div>
            
            {/* Botón de Aplicar */}
            <div className="flex justify-end gap-2 pt-3 mt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Cancelar: restaurar valores originales
                  setTempStartDate(startDate);
                  setTempEndDate(endDate);
                  setIsOpen(false);
                }}
                className="h-8 text-sm px-4"
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={handleApply}
                disabled={!tempStartDate}
                className="h-8 text-sm px-4"
              >
                Aplicar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomDateRange;
