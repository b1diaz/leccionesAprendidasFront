import type { Lesson } from "@/types/lesson.types";
import { getScoreColor, getScoreLabel } from "@/utils/score";
import { BarChart3 } from "lucide-react";

interface RelevanceSectionProps {
  lesson: Lesson;
}

/**
 * Sección: Relevancia
 * Muestra: score
 */
export const RelevanceSection = ({ lesson }: RelevanceSectionProps) => {
  const scoreColor = getScoreColor(lesson.score);
  const scoreLabel = getScoreLabel(lesson.score);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
        <BarChart3 className="h-5 w-5" style={{ color: scoreColor }} />
        <h3 className="text-base font-semibold text-gray-800">
          Relevancia
        </h3>
      </div>
      <div className="flex items-center gap-3 pt-1">
        <div className="text-3xl font-bold" style={{ color: scoreColor }}>
          {lesson.score.toFixed(2)}
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: scoreColor }}>
            {scoreLabel}
          </p>
          <p className="text-xs text-gray-500">
            Score de Relevancia IA
          </p>
        </div>
      </div>
    </div>
  );
};


