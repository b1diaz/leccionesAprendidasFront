import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lesson } from "@/types/lesson.types";
import { PageHeader } from "@/components/shared/PageHeader";
import { DescriptionSection } from "@/components/lesson/DescriptionSection";
import { AnalysisSection } from "@/components/lesson/AnalysisSection";
import { ConsequencesSection } from "@/components/lesson/ConsequencesSection";
import { LessonLearnedSection } from "@/components/lesson/LessonLearnedSection";

interface LessonDetailContentProps {
  lesson: Lesson;
  onBack: () => void;
}

const LessonDetailContent: React.FC<LessonDetailContentProps> = ({ lesson, onBack }) => {
  return (
    <main className="flex-1 flex flex-col bg-gray-50 overflow-auto">
      <PageHeader
        breadcrumbs={[
          { label: "Lecciones Aprendidas", onClick: onBack },
          { label: "Resultados de búsqueda", onClick: onBack },
          { label: "Detalle", active: true },
        ]}
        title="Detalle de Lección Aprendida"
        backButton={
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={onBack}
            aria-label="Volver a resultados de búsqueda"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        }
      />

      {/* Contenido Scrollable */}
      <div className="flex-1 px-6 pt-8 pb-12 space-y-10 max-w-5xl mx-auto w-full">
        {/* Sección: Descripción de la Situación */}
        <DescriptionSection lesson={lesson} />

        {/* Secciones: Análisis y Consecuencias (Grid de 2 columnas) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnalysisSection lesson={lesson} />
          <ConsequencesSection lesson={lesson} />
        </div>

        {/* Sección: Lección Aprendida */}
        <LessonLearnedSection lesson={lesson} />
      </div>
    </main>
  );
};

export default LessonDetailContent;

