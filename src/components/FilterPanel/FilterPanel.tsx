import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as yup from "yup";

const schema: yup.ObjectSchema<{ Consulta?: string }> = yup.object({
  Consulta: yup.string().optional(),
});

type FormData = yup.InferType<typeof schema>;

const FilterPanel = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { watch, register, handleSubmit, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const states = [
    "Activo",
    "Inactivo",
    "Pendiente",
    "Completado",
    "Cancelado",
    "En Proceso",
    "Suspendido",
  ];

  const handleStateToggle = (state: string) => {
    setSelectedStates((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
    );
  };

  const handleClear = () => {
    setValue("Consulta", "");
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedStates([]);
  };

  const maxWords = 30;

  const watchConsulta = watch("Consulta") || "";
  const wordCount =
    watchConsulta.trim() === "" ? 0 : watchConsulta.trim().split(/\s+/).length;
  const remainingWords = maxWords - wordCount;

  useEffect(() => {
    const Consulta = searchParams.get("Consulta");

    if (Consulta) {
      setValue("Consulta", Consulta);
    }
  }, [searchParams]);

  const onSubmit = (data: FormData) => {
    let { Consulta } = data;

    if (Consulta) {
      const words = Consulta.trim().split(/\s+/);
      if (words.length > maxWords) {
        Consulta = words.slice(0, maxWords).join(" ");
      }

      setSearchParams({ Consulta });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-purple-200 p-4 lg:p-6 lg:h-full overflow-y-auto order-first lg:order-last">
      <div className="space-y-4 lg:space-y-6">
        {/* Campo de búsqueda */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-900">
            Búsqueda
          </label>
          <textarea
            {...register("Consulta")}
            name="Consulta"
            placeholder="Buscar..."
            value={watchConsulta}
            onChange={(e) => {
              const input = e.target.value;
              const words = input.trim().split(/\s+/);
              if (words.length <= maxWords) {
                setValue("Consulta", input);
              }
            }}
            rows={3}
            style={{ maxHeight: "400px" }}
            className="border border-purple-200 focus:border-purple-500 focus:ring-purple-500 w-full rounded-md px-3 py-2 text-sm resize-none resize-y"
          />
          <div className="text-sm text-gray-600">
            {remainingWords > 0 ? (
              <>
                Te quedan {remainingWords} palabra
                {remainingWords === 1 ? "" : "s"}
              </>
            ) : (
              <span className="text-red-600">
                Has alcanzado el límite de 30 palabras
              </span>
            )}
          </div>
        </div>

        {/* Selectores de fecha - en fila en móvil, en columna en desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {/* Selector de fecha inicio */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-900">
              Fecha de inicio
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-purple-200 hover:bg-purple-50",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span className="truncate">
                    {startDate
                      ? format(startDate, "PPP", { locale: es })
                      : "Seleccionar fecha"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Selector de fecha final */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-900">
              Fecha final
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-purple-200 hover:bg-purple-50",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span className="truncate">
                    {endDate
                      ? format(endDate, "PPP", { locale: es })
                      : "Seleccionar fecha"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Estados como badges */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-900">Estados</label>
          <div className="flex flex-wrap gap-2">
            {states.map((state) => (
              <Badge
                key={state}
                variant={selectedStates.includes(state) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-colors text-xs",
                  selectedStates.includes(state)
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "border-purple-300 text-purple-700 hover:bg-purple-100"
                )}
                onClick={() => handleStateToggle(state)}
              >
                {state}
              </Badge>
            ))}
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-2 lg:pt-4">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-100"
          >
            Limpiar
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
          >
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
