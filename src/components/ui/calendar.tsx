import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, CaptionProps, useNavigation, DayProps, useDayRender } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Componente Day personalizado que previene la navegación automática en hover
function CustomDay(props: DayProps): JSX.Element {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);
  
  if (dayRender.isHidden) {
    return <div role="gridcell"></div>;
  }
  
  if (!dayRender.isButton) {
    return <div {...dayRender.divProps} />;
  }
  
  // Interceptar eventos de mouse para prevenir navegación automática
  // Eliminar cualquier handler de mouse que pueda causar navegación
  const { onMouseEnter, ...restButtonProps } = dayRender.buttonProps as any;
  
  const buttonProps = {
    ...restButtonProps,
    // Prevenir cualquier navegación en hover - solo permitir clic
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
    },
  };
  
  return <button name="day" ref={buttonRef} {...buttonProps} />;
}

// Componente personalizado para el caption con selectores de año y mes
function CustomCaption(props: CaptionProps) {
  const { goToMonth } = useNavigation();
  const displayMonth = props.displayMonth;
  const currentYear = displayMonth.getFullYear();
  const currentMonthIndex = displayMonth.getMonth();

  // Meses en español
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const handleMonthChange = (month: string) => {
    const monthIndex = parseInt(month);
    const newDate = new Date(currentYear, monthIndex, 1);
    goToMonth(newDate);
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(currentYear, currentMonthIndex - 1, 1);
    goToMonth(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentYear, currentMonthIndex + 1, 1);
    goToMonth(newDate);
  };

  return (
    <div className="flex items-center justify-center gap-1 px-1 py-1">
      {/* Navegación de mes */}
      <button
        type="button"
        onClick={goToPreviousMonth}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0 opacity-50"
        )}
        aria-label="Mes anterior"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>
      <Select
        value={currentMonthIndex.toString()}
        onValueChange={handleMonthChange}
      >
        <SelectTrigger className="h-7 w-[120px] text-xs font-medium px-2 text-center">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-[150px]">
          {months.map((month, index) => (
            <SelectItem key={index} value={index.toString()} className="text-xs py-1">
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button
        type="button"
        onClick={goToNextMonth}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0 opacity-50"
        )}
        aria-label="Mes siguiente"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  // Prevenir navegación automática en hover
  const handleDayMouseEnter = React.useCallback(() => {
    // No hacer nada - prevenir navegación automática
  }, []);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30 pointer-events-none",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Caption: CustomCaption,
        Day: CustomDay,
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
