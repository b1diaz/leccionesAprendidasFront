import { useState } from "react";
import { toast } from "sonner";
import { useFilter } from "@/contexts/FilterContext";
import type { SearchParams } from "@/types/lesson.types";
import { SearchFieldType } from "@/types/lesson.types";

/**
 * Mapea el nombre del campo seleccionado al enum SearchFieldType
 */
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

/**
 * Hook para manejar el estado y acciones del panel de búsqueda
 */
export const useSearchPanel = () => {
  const [searchError, setSearchError] = useState<string | null>(null);
  const { 
    setSearchText, 
    setMinScore, 
    setHasSearched, 
    setSearchResults,
    performSearch,
    searchText,
    minScore,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    dateRange,
    setDateRange,
    selectedField,
    setSelectedField,
  } = useFilter();

  const handleClear = () => {
    setSearchText("");
    setDateRange([null, null]);
    setMinScore(0.55);
    setHasSearched(false);
    setSearchResults([]);
    setSelectedField("Descripción");
    setSearchError(null);
  };

  const handleSearch = async () => {
    console.log("🔎 handleSearch llamado");
    console.log("📝 searchText:", searchText);
    console.log("📅 dateRange:", dateRange);
    console.log("🎯 selectedField:", selectedField);
    console.log("⭐ minScore:", minScore);
    
    // Validaciones según el backend
    const trimmedQuery = searchText.trim();
    
    if (!trimmedQuery) {
      const errorMsg = "La consulta de búsqueda es requerida.";
      setSearchError(errorMsg);
      console.log("❌ Error establecido:", errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (trimmedQuery.length < 3) {
      const errorMsg = "La consulta debe tener al menos 3 caracteres.";
      setSearchError(errorMsg);
      console.log("❌ Error establecido:", errorMsg);
      toast.error(errorMsg);
      return;
    }

    // Limpiar error si la validación pasa
    setSearchError(null);
    console.log("✅ Error limpiado");

    // Validar rango de fechas
    const [dateFrom, dateTo] = dateRange;
    if (dateFrom && dateTo && dateTo < dateFrom) {
      toast.error("La fecha final debe ser mayor o igual a la fecha inicial.");
      return;
    }

    // Validar MinScore
    if (minScore < 0 || minScore > 1) {
      toast.error("El score mínimo debe estar entre 0 y 1.");
      return;
    }

    // Construir parámetros de búsqueda
    const searchParams: SearchParams = {
      Query: trimmedQuery,
      SearchField: mapFieldToSearchFieldType(selectedField),
    };

    // Agregar fechas si están disponibles
    if (dateFrom) {
      searchParams.DateFrom = dateFrom.toISOString();
    }
    if (dateTo) {
      searchParams.DateTo = dateTo.toISOString();
    }

    // Agregar MinScore si está configurado
    if (minScore !== undefined && minScore !== null) {
      searchParams.MinScore = minScore;
    }

    // Agregar parámetros de paginación (resetear a página 1 en nueva búsqueda)
    searchParams.PageNumber = 1;
    searchParams.PageSize = pageSize;
    setPageNumber(1);

    console.log("🚀 Llamando performSearch con params:", searchParams);
    await performSearch(searchParams);
  };

  return {
    dateRange,
    setDateRange,
    selectedField,
    setSelectedField,
    handleClear,
    handleSearch,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    searchError,
    setSearchError,
  };
};


