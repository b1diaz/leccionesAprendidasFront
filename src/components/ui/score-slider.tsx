import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface ScoreSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  scoreColor?: string;
}

const ScoreSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  ScoreSliderProps
>(({ className, scoreColor, value, ...props }, ref) => {
  // Calcular el color del rango basado en el valor actual
  const getRangeColor = (val: number) => {
    if (val >= 0.7) return "hsl(142, 71%, 45%)"; // Verde
    if (val >= 0.4) return "hsl(45, 93%, 47%)"; // Amarillo
    return "hsl(0, 72%, 51%)"; // Rojo
  };
  
  const currentValue = value?.[0] ?? 0;
  const rangeColor = scoreColor || getRangeColor(currentValue);
  
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range 
          className="absolute h-full transition-colors duration-200"
          style={{ backgroundColor: rangeColor }}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb 
        className="block h-5 w-5 rounded-full border-2 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        style={{ 
          borderColor: rangeColor,
          backgroundColor: rangeColor
        }}
      />
    </SliderPrimitive.Root>
  );
});
ScoreSlider.displayName = SliderPrimitive.Root.displayName;

export { ScoreSlider };


