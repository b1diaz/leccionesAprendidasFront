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
import Autocomplete from "@mui/material/Autocomplete";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as yup from "yup";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TextField from "@mui/material/TextField";
import MultiSelect from "../ui/check-boxes";

const schema: yup.ObjectSchema<{ Query?: string }> = yup.object({
  Query: yup.string().optional(),
});

type FormData = yup.InferType<typeof schema>;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
    setValue("Query", "");
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedStates([]);
  };

  const maxWords = 30;

  const watchQuery = watch("Query") || "";
  const wordCount =
    watchQuery.trim() === "" ? 0 : watchQuery.trim().split(/\s+/).length;
  const remainingWords = maxWords - wordCount;

  useEffect(() => {
    const Query = searchParams.get("Query");

    if (Query) {
      setValue("Query", Query);
    }
  }, [searchParams]);

  const onSubmit = (data: FormData) => {
    let { Query } = data;

    if (Query) {
      const words = Query.trim().split(/\s+/);
      if (words.length > maxWords) {
        Query = words.slice(0, maxWords).join(" ");
      }

      setSearchParams({ Query });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 p-4 lg:p-6 lg:h-full overflow-y-auto order-first lg:order-last">
      <div className="space-y-4 lg:space-y-6">
        {/* Campo de búsqueda */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-negro-900">Búsqueda</label>
          <textarea
            {...register("Query")}
            name="Query"
            placeholder="Buscar..."
            value={watchQuery}
            onChange={(e) => {
              const input = e.target.value;
              const words = input.trim().split(/\s+/);
              if (words.length <= maxWords) {
                setValue("Query", input);
              }
            }}
            rows={3}
            style={{ maxHeight: "400px" }}
            className="border w-full rounded-md px-3 py-2 text-sm resize-none resize-y"
          />
          <div className="text-sm text-gray-600">
            {remainingWords > 0 ? (
              <>
                Te quedan {remainingWords} palabra
                {remainingWords === 1 ? "" : "s"}
              </>
            ) : (
              <span className="text-blue-900">
                Has alcanzado el límite de 30 palabras
              </span>
            )}
          </div>
        </div>

        {/* Selectores de fecha - en fila en móvil, en columna en desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {/* Selector de fecha inicio */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-negro-900">
              Fecha de inicio
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal hover:bg-blue-50",
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
            <label className="text-sm font-medium text-negro-900">
              Fecha final
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal hover:bg-blue-50",
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
          <label className="text-sm font-medium text-negro-900">
            Tipos de estados
          </label>
          <div className="flex flex-wrap gap-2">

            <MultiSelect
              options={states}
              label="Estados"
              placeholder="Favoritas"
              getOptionLabel={(states) => states}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-2 lg:pt-4">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex-1 border-negro-100 hover:bg-blue-100 text-negro-700"
          >
            Limpiar
          </Button>
          <Button
            variant="outline"
            onClick={handleSubmit(onSubmit)}
            className="flex-1 border-negro-100 hover:bg-blue-100 text-negro-700"
          >
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
