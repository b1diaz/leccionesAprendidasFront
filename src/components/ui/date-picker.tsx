import * as React from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
}

export function DatePicker({
  date,
  onDateChange,
  className,
  placeholder = "Seleccionar fecha",
}: DatePickerProps) {
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    try {
      return format(date, "d MMM yyyy", { locale: es });
    } catch {
      return format(date, "d MMM yyyy");
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDateChange(undefined);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-background shadow-elevation-1",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? formatDate(date) : <span>{placeholder}</span>}
            {date && (
              <X
                className="ml-auto h-4 w-4 opacity-50 hover:opacity-100"
                onClick={handleClear}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={onDateChange}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}


