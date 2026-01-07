import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
  rightPanel?: ReactNode;
  className?: string;
}

/**
 * Layout principal de la aplicación
 * Proporciona la estructura común con Sidebar y área de contenido
 */
export const AppLayout = ({
  children,
  rightPanel,
  className,
}: AppLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      {children}
      {rightPanel}
    </div>
  );
};














