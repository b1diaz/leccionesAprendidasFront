import type { Lesson } from "@/types/lesson.types";
import { AlertTriangle } from "lucide-react";

interface AnalysisSectionProps {
  lesson: Lesson;
}

/**
 * Sección: Análisis
 * Muestra: analysis
 */
export const AnalysisSection = ({ lesson }: AnalysisSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-orange-200">
        <AlertTriangle className="h-5 w-5 text-orange-600" />
        <h3 className="text-base font-semibold text-gray-800">
          Análisis
        </h3>
      </div>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap pt-1">
        {lesson.analysis || "No hay análisis disponible."}
      </p>
    </div>
  );
};


