import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MainLayout } from "@/components/layout/MainLayout";
import LessonDetailContent from "@/components/LessonDetailContent";
import RightPanel from "@/components/layout/RightPanel";
import { useFilter } from "@/contexts/FilterContext";
import type { Lesson } from "@/types/lesson.types";

interface LocationState {
  lesson?: Lesson;
}

const LessonDetailPage = () => {
  const { id: encodedId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchResults, markLessonAsVisited } = useFilter();

  // Buscar la lección en este orden de prioridad:
  // 1. Estado de navegación (datos pasados desde LessonCard)
  // 2. Contexto (searchResults)
  const lesson = useMemo(() => {
    if (!encodedId) {
      return null;
    }

    // 1️⃣ Intentar obtener desde el estado de navegación (más confiable)
    const state = location.state as LocationState | null;
    if (state?.lesson) {
      console.log("[LessonDetailPage] Lección obtenida del estado de navegación:", state.lesson.Id);
      return state.lesson;
    }

    // 2️⃣ Buscar en el contexto si no está en el estado
    const id = decodeURIComponent(encodedId);
    const found = searchResults.find((r) => r.Id === id);
    
    if (found) {
      console.log("[LessonDetailPage] Lección encontrada en contexto:", found.Id);
      return found;
    }

    console.warn("[LessonDetailPage] Lección no encontrada. Id buscado:", id);
    return null;
  }, [encodedId, location.state, searchResults]);

  // Marcar la lección como visitada cuando se monta el componente
  useEffect(() => {
    if (lesson?.Id) {
      markLessonAsVisited(lesson.Id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.Id]); // markLessonAsVisited es estable gracias a useCallback

  const handleBack = () => {
    // Navegar a la página principal de búsqueda
    navigate("/");
  };

  // Si no se encuentra la lección en los resultados cargados
  if (!lesson) {
    const decodedId = encodedId ? decodeURIComponent(encodedId) : 'N/A';
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Lección no encontrada
          </h1>
          <p className="text-muted-foreground mb-4">
            {searchResults.length === 0
              ? "No hay resultados de búsqueda disponibles. Por favor, realiza una búsqueda primero."
              : `No se encontró la lección con Id: ${decodedId} en los resultados actuales.`}
          </p>
          <button
            onClick={handleBack}
            className="text-primary underline hover:text-primary/90"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <AppLayout
      rightPanel={
        <RightPanel mode="detail" lesson={lesson} onBack={handleBack} />
      }
    >
      <MainLayout>
        <LessonDetailContent lesson={lesson} onBack={handleBack} />
      </MainLayout>
    </AppLayout>
  );
};

export default LessonDetailPage;
