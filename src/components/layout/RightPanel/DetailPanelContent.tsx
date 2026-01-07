import { Button } from "@/components/ui/button";
import type { Lesson } from "@/types/lesson.types";
import { GeneralInfoSection } from "@/components/lesson/GeneralInfoSection";
import { RelevanceSection } from "@/components/lesson/RelevanceSection";

interface DetailPanelContentProps {
  lesson: Lesson;
  onBack: () => void;
}

export const DetailPanelContent = ({ lesson, onBack }: DetailPanelContentProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold text-foreground">
        Información
      </h2>

      {/* Sección: Relevancia */}
      <RelevanceSection lesson={lesson} />

      {/* Sección: Información General */}
      <GeneralInfoSection lesson={lesson} />
    </div>
  );
};

interface DetailPanelFooterProps {
  onBack: () => void;
}

export const DetailPanelFooter = ({ onBack }: DetailPanelFooterProps) => {
  return (
    <div className="p-4 border-t border-border flex-shrink-0 bg-card">
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 h-8 text-sm shadow-elevation-1 hover:shadow-elevation-2"
          onClick={onBack}
        >
          Atrás
        </Button>
        <Button
          variant="default"
          className="flex-1 h-8 text-sm bg-primary text-primary-foreground shadow-elevation-2 hover:shadow-elevation-3"
        >
          Editar Registro
        </Button>
      </div>
    </div>
  );
};

