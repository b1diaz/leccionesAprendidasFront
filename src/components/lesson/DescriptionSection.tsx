import type { Lesson } from "@/types/lesson.types";
import { FileText } from "lucide-react";

interface DescriptionSectionProps {
  lesson: Lesson;
}

/**
 * Sección: Descripción de la Situación
 * Muestra: description
 */
export const DescriptionSection = ({ lesson }: DescriptionSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
        <FileText className="h-5 w-5 text-gray-600" />
        <h3 className="text-base font-semibold text-gray-800">
          Descripción de la Situación
        </h3>
      </div>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap pt-1">
        {lesson.description || "No hay descripción disponible."}
      </p>
    </div>
  );
};


