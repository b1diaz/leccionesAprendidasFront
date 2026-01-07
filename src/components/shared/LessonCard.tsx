import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/utils/date";
import { getScoreColor } from "@/utils/score";
import { useFilter } from "@/contexts/FilterContext";
import type { Lesson } from "@/types/lesson.types";

interface LessonCardProps {
  Id: string;
  code?: string;
  situationType: string;
  description: string;
  dateTime: string;
  location: string;
  relatedPosition: string;
  analysis: string;
  consequences: string;
  lesson: string;
  searchContent: string;
  score: number;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export const LessonCard = ({
  Id,
  code,
  situationType,
  description,
  dateTime,
  location,
  relatedPosition,
  analysis,
  consequences,
  lesson,
  searchContent,
  score,
  variant = "default",
}: LessonCardProps) => {
  const navigate = useNavigate();
  const { isLessonVisited } = useFilter();
  const { date, time } = formatDateTime(dateTime);
  const scoreColor = getScoreColor(score);
  const isVisited = isLessonVisited(Id);

  const handleClick = () => {
    // Construir el objeto Lesson completo para pasarlo en el estado de navegación
    const lessonData: Lesson = {
      Id,
      code,
      description,
      situationType,
      location,
      relatedPosition,
      analysis,
      consequences,
      lesson,
      dateTime,
      searchContent,
      score,
    };

    const encodedId = encodeURIComponent(Id);
    // Pasar la lección completa en el estado de navegación
    navigate(`/lesson/${encodedId}`, { state: { lesson: lessonData } });
  };

  // Función para truncar el texto a 650 caracteres
  const truncateText = (text: string, maxLength: number = 650): string => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const truncatedDescription = truncateText(description);

  return (
    <div
      className={`rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-all relative overflow-hidden group w-full ${
        isVisited 
          ? "bg-muted/80 opacity-90 border-l-4 border-primary/60" 
          : "bg-card"
      }`}
    >
      {/* Marca de agua con score - Asegurar que esté detrás del contenido */}
      <div
        className="absolute right-4 top-1/2 -translate-y-1/2 text-8xl font-bold pointer-events-none select-none z-0"
        style={{
          color: scoreColor,
          opacity: 0.08,
        }}
        aria-hidden="true"
      >
        {score.toFixed(2)}
      </div>

      {/* Header - Asegurar que esté por encima de la marca de agua */}
      <div className="flex justify-between items-center mb-3 relative z-20 gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Badge variant={variant} className="rounded-full px-4 py-1 flex-shrink-0">
            {situationType}
          </Badge>
          <span className="text-xs text-muted-foreground"></span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Score - Asegurar posición correcta y siempre visible */}
          <div
            className="px-2.5 py-1 rounded-full font-semibold text-xs text-white flex-shrink-0 relative z-30"
            style={{ backgroundColor: scoreColor }}
          >
            {score.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Descripción - Asegurar que esté por encima de la marca de agua */}
      <p className="text-foreground mb-3 leading-relaxed relative z-20">
        {truncatedDescription}
      </p>

      {/* Info - Asegurar que esté por encima de la marca de agua */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground relative z-20">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {time}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-red-500" />
          {location}
        </span>
        <span className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          {relatedPosition}
        </span>
      </div>

      {/* Navegación - Botón Ver detalles */}
      <div className="absolute bottom-4 right-4 z-20">
        <button
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
          className="flex items-center gap-1 text-xs text-primary font-medium hover:text-primary/80 transition-colors cursor-pointer"
          aria-label={`Ver detalles de la lección ${Id}`}
        >
          <span>Ver detalles</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
