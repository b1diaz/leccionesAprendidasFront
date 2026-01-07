import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CustomDateRange from "@/components/ui/custom-date-range";
import { ScoreSlider } from "@/components/ui/score-slider";
import CustomSelect from "@/components/ui/custom-select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Lightbulb } from "lucide-react";
import { useFilter } from "@/contexts/FilterContext";
import { getScoreColor } from "@/utils/score";
import { useSearchPanel } from "./useSearchPanel";
import { useEffect } from "react";
import type { SearchParams } from "@/types/lesson.types";
import { SearchFieldType } from "@/types/lesson.types";
import { cn } from "@/lib/utils";

interface SearchPanelContentProps {
  searchError?: string | null;
  setSearchError?: (error: string | null) => void;
  dateRange?: [Date | null, Date | null];
  setDateRange?: (dates: [Date | null, Date | null]) => void;
  selectedField?: string;
  setSelectedField?: (field: string) => void;
  handleSearch?: () => Promise<void>;
  handleClear?: () => void;
}

export const SearchPanelContent = ({ 
  searchError: propSearchError, 
  setSearchError: propSetSearchError,
  dateRange: propDateRange,
  setDateRange: propSetDateRange,
  selectedField: propSelectedField,
  setSelectedField: propSetSelectedField,
  handleSearch: propHandleSearch,
  handleClear: propHandleClear,
}: SearchPanelContentProps = {}) => {
  const { 
    minScore, 
    setMinScore, 
    searchText, 
    setSearchText, 
    pageSize, 
    setPageSize,
    hasSearched,
    performSearch,
    setPageNumber,
  } = useFilter();
  
  // Usar el hook solo si no se pasan las props (fallback)
  const searchPanelHook = useSearchPanel();
  
  // Usar props si están disponibles, sino usar el hook
  const searchError = propSearchError !== undefined ? propSearchError : searchPanelHook.searchError;
  const setSearchError = propSetSearchError || searchPanelHook.setSearchError;
  const dateRange = propDateRange !== undefined ? propDateRange : searchPanelHook.dateRange;
  const setDateRange = propSetDateRange || searchPanelHook.setDateRange;
  const selectedField = propSelectedField !== undefined ? propSelectedField : searchPanelHook.selectedField;
  const setSelectedField = propSetSelectedField || searchPanelHook.setSelectedField;
  const handleSearch = propHandleSearch || searchPanelHook.handleSearch;
  const handleClear = propHandleClear || searchPanelHook.handleClear;
  
  const pageSizeOptions = [10, 25, 50, 100];

  // Mapear campo seleccionado al enum
  const mapFieldToSearchFieldType = (fieldName: string): SearchFieldType => {
    switch (fieldName) {
      case "Descripción":
        return SearchFieldType.Description;
      case "Análisis":
        return SearchFieldType.Analysis;
      case "Consecuencias":
        return SearchFieldType.Consequences;
      case "Aprendizaje":
        return SearchFieldType.Lesson;
      default:
        return SearchFieldType.Description;
    }
  };

  // Cuando cambie el tamaño de página, hacer nueva búsqueda si ya se había buscado
  const handlePageSizeChange = async (newSize: number) => {
    setPageSize(newSize);
    setPageNumber(1);
    
    // Si ya se había buscado, hacer nueva búsqueda con el nuevo tamaño
    if (hasSearched && searchText.trim().length >= 3) {
      const [dateFrom, dateTo] = dateRange;
      const searchParams: SearchParams = {
        Query: searchText.trim(),
        SearchField: mapFieldToSearchFieldType(selectedField),
        PageNumber: 1,
        PageSize: newSize,
      };

      if (dateFrom) {
        searchParams.DateFrom = dateFrom.toISOString();
      }
      if (dateTo) {
        searchParams.DateTo = dateTo.toISOString();
      }
      if (minScore !== undefined && minScore !== null) {
        searchParams.MinScore = minScore;
      }

      await performSearch(searchParams);
    }
  };
  
  const searchFields = [
    { Id: "descripcion", label: "Descripción" },
    { Id: "analisis", label: "Análisis" },
    { Id: "consecuencias", label: "Consecuencias" },
    { Id: "aprendizaje", label: "Aprendizaje" },
  ];

  const searchFieldOptions = searchFields.map(field => field.label);

  const handleFieldChange = (value: string) => {
    const field = searchFields.find(f => f.label === value);
    if (field) {
      setSelectedField(value);
    }
  };

  const sliderColor = getScoreColor(minScore);

  return (
    <>
      {/* Search Input with character counter */}
      <div>
        <div className="flex items-center gap-2 mb-[13px]">
          <label className="text-lg font-bold text-foreground">
            Búsqueda
          </label>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="h-4 w-4 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <Info className="h-3 w-3 text-primary" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-sm p-4 bg-popover border shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">
                        Cómo buscar efectivamente
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Describe la <strong>SITUACIÓN</strong> que intentas recordar (el qué, el cómo, el por qué) o el <strong>PROBLEMA</strong> que quieres prevenir, con el mayor detalle posible.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs font-semibold mb-2 text-foreground">Ejemplo:</p>
                    <div className="bg-muted/50 rounded p-2 space-y-1">
                      <p className="text-xs text-muted-foreground line-through">❌ "Accidente por falta de EPP"</p>
                      <p className="text-xs text-foreground">✅ "Un accidente ocurrió en el área de montaje hace unos meses, donde la causa principal fue el uso incorrecto de EPP de altura. ¿Qué análisis de consecuencias y qué acciones correctivas se registraron?"</p>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          Describe la situación que intentas recordar o el problema que quieres prevenir. Sé específico y detallado para obtener mejores resultados.
        </p>
        <Textarea
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            // Limpiar error cuando el usuario empiece a escribir
            if (searchError) {
              setSearchError(null);
            }
          }}
          className={cn(
            "min-h-[120px] bg-white border shadow-elevation-1 resize-y",
            searchError ? "border-red-500" : "border-input"
          )}
        />
        {searchError && (
          <p className="text-xs text-red-500 mt-2 font-medium">
            {searchError}
          </p>
        )}
        {!searchError && (
          <p className="text-xs text-muted-foreground mt-2">
            Mínimo 150 caracteres recomendados para mejores resultados
          </p>
        )}
      </div>

      {/* Campo de búsqueda */}
      <CustomSelect
        label="Campo de búsqueda"
        options={searchFieldOptions}
        value={selectedField}
        onChange={handleFieldChange}
        placeholder="Seleccionar campo..."
      />

      {/* Date Range Picker */}
      <CustomDateRange
        label="Rango de fechas"
        value={dateRange}
        onChange={(dates) => setDateRange(dates)}
      />

      {/* Score Filter Slider */}
      <div className="relative">
        <div className="relative w-full rounded-md border border-gray-300 bg-white px-3 py-2.5">
          <label className="absolute -top-2 left-2 px-1.5 bg-white text-xs font-medium text-foreground pointer-events-none">
            Score mínimo
          </label>
          <div className="pt-1">
            <div className="flex items-center justify-between mb-2">
              <span 
                className="text-sm font-semibold px-2 py-1 rounded"
                style={{ 
                  backgroundColor: `${sliderColor}20`,
                  color: sliderColor
                }}
              >
                {minScore.toFixed(2)}
              </span>
            </div>
            <ScoreSlider
              value={[minScore]}
              onValueChange={(value) => setMinScore(value[0])}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
              scoreColor={sliderColor}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0.00</span>
              <span>0.50</span>
              <span>1.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page Size Selector */}
      <CustomSelect
        label="Resultados por página"
        options={pageSizeOptions.map(size => size.toString())}
        value={pageSize.toString()}
        onChange={(value) => {
          const newSize = parseInt(value, 10);
          handlePageSizeChange(newSize);
        }}
        placeholder="Seleccionar tamaño..."
      />
    </>
  );
};

// Exportar funciones para que el componente padre pueda pasarlas al footer
export const useSearchPanelWithError = () => {
  return useSearchPanel();
};

export const SearchPanelFooter = ({ 
  handleClear, 
  handleSearch 
}: { 
  handleClear: () => void; 
  handleSearch: () => Promise<void>; 
}) => {

  return (
    <div className="p-4 border-t border-border flex-shrink-0 bg-card">
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 h-8 text-sm shadow-elevation-1 hover:shadow-elevation-2"
          onClick={handleClear}
        >
          Limpiar
        </Button>
        <Button
          variant="default"
          className="flex-1 h-8 text-sm bg-primary text-primary-foreground shadow-elevation-2 hover:shadow-elevation-3"
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </div>
    </div>
  );
};

