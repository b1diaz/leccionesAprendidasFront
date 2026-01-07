import { useLocation } from "react-router-dom";
import type { Lesson } from "@/types/lesson.types";
import { SearchPanelContent, SearchPanelFooter, useSearchPanelWithError } from "./SearchPanelContent";
import { DetailPanelContent, DetailPanelFooter } from "./DetailPanelContent";

export type RightPanelMode = "search" | "detail";

interface RightPanelProps {
  mode?: RightPanelMode;
  lesson?: Lesson;
  onBack?: () => void;
}

/**
 * Panel derecho unificado que muestra contenido de búsqueda o detalle
 * según el modo o la ruta actual
 */
const RightPanel = ({ mode, lesson, onBack }: RightPanelProps) => {
  const location = useLocation();
  
  // Determinar el modo automáticamente si no se proporciona
  const panelMode: RightPanelMode = mode || (location.pathname.startsWith("/lesson/") ? "detail" : "search");
  
  // Obtener las funciones del hook para pasarlas al footer (solo en modo search)
  // Esto asegura que SearchPanelContent y SearchPanelFooter compartan el mismo estado
  const searchPanelHook = panelMode === "search" ? useSearchPanelWithError() : null;

  // Validar que tenemos los datos necesarios para el modo detail
  if (panelMode === "detail") {
    if (!lesson) {
      console.warn("RightPanel: modo 'detail' requiere la prop 'lesson'");
      return null;
    }
    if (!onBack) {
      console.warn("RightPanel: modo 'detail' requiere la prop 'onBack'");
      return null;
    }
  }

  return (
    <aside 
      className="bg-card flex flex-col shadow-elevation-0 relative z-20 overflow-hidden" 
      style={{ width: '430px' }}
    >
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto ">
        <div className="p-6 space-y-6">
          {panelMode === "search" && searchPanelHook ? (
            <SearchPanelContent 
              searchError={searchPanelHook.searchError}
              setSearchError={searchPanelHook.setSearchError}
              dateRange={searchPanelHook.dateRange}
              setDateRange={searchPanelHook.setDateRange}
              selectedField={searchPanelHook.selectedField}
              setSelectedField={searchPanelHook.setSelectedField}
              handleSearch={searchPanelHook.handleSearch}
              handleClear={searchPanelHook.handleClear}
            />
          ) : panelMode === "detail" ? (
            <DetailPanelContent lesson={lesson!} onBack={onBack!} />
          ) : null}
        </div>
      </div>

      {/* Footer Actions - Fixed */}
      {panelMode === "search" && searchPanelHook ? (
        <SearchPanelFooter 
          handleClear={searchPanelHook.handleClear}
          handleSearch={searchPanelHook.handleSearch}
        />
      ) : panelMode === "detail" ? (
        <DetailPanelFooter onBack={onBack!} />
      ) : null}
    </aside>
  );
};

export default RightPanel;

