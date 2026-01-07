import type { Lesson } from "@/types/lesson.types";
import { formatDateTime } from "@/utils/date";
import { InfoField } from "@/components/shared/InfoField";
import { MapPin, Calendar, Clock, User, Tag, Info } from "lucide-react";

interface GeneralInfoSectionProps {
  lesson: Lesson;
}

/**
 * Sección: Información General
 * Muestra: code, dateTime, location, relatedPosition, situationType
 */
export const GeneralInfoSection = ({ lesson }: GeneralInfoSectionProps) => {
  const { date, time } = formatDateTime(lesson.dateTime);
  
  // Usar el valor de Code (code) - NUNCA mostrar Id
  // El code viene mapeado desde Code (mayúscula) o code (minúscula) de la API
  const displayCode = (lesson.code && lesson.code.trim() !== "") 
    ? lesson.code 
    : "No disponible";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
        <Info className="h-5 w-5 text-gray-600" />
        <h3 className="text-base font-semibold text-gray-800">
          Información General
        </h3>
      </div>
      <div className="space-y-4 pt-1">
        <InfoField 
          label="Código" 
          value={displayCode}
        />
        <InfoField 
          label="Fecha" 
          icon={<Calendar className="h-4 w-4 text-gray-600 flex-shrink-0" />}
        >
          <p className="text-sm text-gray-900">{date}</p>
        </InfoField>
        <InfoField 
          label="Hora" 
          icon={<Clock className="h-4 w-4 text-gray-600 flex-shrink-0" />}
        >
          <p className="text-sm text-gray-900">{time}</p>
        </InfoField>
        <InfoField
          label="Ubicación"
          icon={<MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />}
        >
          <p className="text-sm text-gray-900">{lesson.location || "No especificada"}</p>
        </InfoField>
        <InfoField 
          label="Cargo" 
          icon={<User className="h-4 w-4 text-gray-600 flex-shrink-0" />}
        >
          <p className="text-sm text-gray-900">{lesson.relatedPosition || "No especificado"}</p>
        </InfoField>
        <InfoField 
          label="Tipo de Situación" 
          icon={<Tag className="h-4 w-4 text-gray-600 flex-shrink-0" />}
        >
          <p className="text-sm text-gray-900">{lesson.situationType || "No especificado"}</p>
        </InfoField>
      </div>
    </div>
  );
};

