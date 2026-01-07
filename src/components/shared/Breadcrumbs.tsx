import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          {item.onClick && !item.active ? (
            <button
              onClick={item.onClick}
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                "hover:underline"
              )}
            >
              {item.label}
            </button>
          ) : (
            <span
              className={cn(
                item.active
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};












