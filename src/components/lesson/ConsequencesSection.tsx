import type { Lesson } from "@/types/lesson.types";
import { AlertCircle } from "lucide-react";

interface ConsequencesSectionProps {
  lesson: Lesson;
}

/**
 * Sección: Consecuencias
 * Muestra: consequences
 */
export const ConsequencesSection = ({ lesson }: ConsequencesSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-red-200">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <h3 className="text-base font-semibold text-gray-800">
          Consecuencias reales o potenciales
        </h3>
      </div>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap pt-1">
        {lesson.consequences || "No hay consecuencias registradas."}
      </p>
    </div>
  );
};


