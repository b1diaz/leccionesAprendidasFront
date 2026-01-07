import { ReactNode } from "react";
import notFoundImage from "@/Images/notFound.png";

interface EmptyStateProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({
  title = "Oops,",
  description = "No hay resultados para tu búsqueda.",
  image = notFoundImage,
  imageAlt = "No se encontraron resultados",
  action,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full min-h-[500px] text-center ${className || ""}`}
    >
      <div className="mb-8">
        <img
          src={image}
          alt={imageAlt}
          className="w-64 h-64 object-contain"
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">{title}</h2>
      <p className="text-base text-gray-500 mb-4">{description}</p>
      {action}
    </div>
  );
};














