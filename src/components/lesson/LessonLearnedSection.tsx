import type { Lesson } from "@/types/lesson.types";
import { BookOpen } from "lucide-react";

interface LessonLearnedSectionProps {
  lesson: Lesson;
}

/**
 * Sección: Lección Aprendida
 * Muestra: lesson
 */
export const LessonLearnedSection = ({ lesson }: LessonLearnedSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-blue-200">
        <BookOpen className="h-5 w-5 text-blue-600" />
        <h3 className="text-base font-semibold text-gray-800">
          Aprendizaje generado
        </h3>
      </div>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap pt-1">
        {lesson.lesson || "No hay aprendizaje registrado."}
      </p>
    </div>
  );
};


