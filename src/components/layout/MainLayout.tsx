import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children?: ReactNode;
  className?: string;
  backgroundColor?: string;
}

/**
 * Layout para el área principal de contenido
 */
export const MainLayout = ({
  children,
  className,
  backgroundColor,
}: MainLayoutProps) => {
  return (
    <main
      className={cn(
        "flex-1 flex flex-col overflow-auto bg-gray-50",
        className
      )}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      {children}
    </main>
  );
};












