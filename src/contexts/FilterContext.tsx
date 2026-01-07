import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { toast } from "sonner";
import type { Lesson } from "@/types/lesson.types";
import { buscarLeccionesConCoincidencia } from "@/services/lesson.service";
import type { SearchParams } from "@/types/lesson.types";

interface FilterContextType {
  minScore: number;
  setMinScore: (score: number) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  hasSearched: boolean;
  setHasSearched: (searched: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  searchResults: Lesson[];
  setSearchResults: (results: Lesson[]) => void;
  performSearch: (params: SearchParams) => Promise<void>;
  // Paginación
  pageNumber: number;
  setPageNumber: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalCount: number;
  totalPages: number;
  // Filtros de búsqueda persistentes
  dateRange: [Date | null, Date | null];
  setDateRange: (dates: [Date | null, Date | null]) => void;
  selectedField: string;
  setSelectedField: (field: string) => void;
  visitedLessons: Set<string>;
  markLessonAsVisited: (lessonId: string) => void;
  isLessonVisited: (lessonId: string) => boolean;
  selectedLessons: Set<string>;
  toggleLessonSelection: (lessonId: string) => void;
  isLessonSelected: (lessonId: string) => boolean;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [minScore, setMinScore] = useState(0.55);
  const [searchText, setSearchText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Lesson[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // Filtros persistentes
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedField, setSelectedField] = useState("Descripción");
  const [visitedLessons, setVisitedLessons] = useState<Set<string>>(new Set());
  const [selectedLessons, setSelectedLessons] = useState<Set<string>>(new Set());

  const performSearch = async (params: SearchParams) => {
    console.log("🎯 performSearch llamado con params:", params);
    try {
      setIsLoading(true);
      setHasSearched(false);
      console.log("⏳ Iniciando búsqueda...");

      // Asegurar que los parámetros de paginación estén incluidos
      const searchParams: SearchParams = {
        ...params,
        PageNumber: params.PageNumber ?? pageNumber,
        PageSize: params.PageSize ?? pageSize,
      };

      const response = await buscarLeccionesConCoincidencia(searchParams);
      console.log("✅ Búsqueda completada. Resultados:", response.Results.length);
      console.log("📊 Paginación - Total:", response.TotalCount, "Página:", response.PageNumber, "/", response.TotalPages);

      // Actualizar resultados y metadatos de paginación
      setSearchResults(response.Results);
      setPageNumber(response.PageNumber);
      setPageSize(response.PageSize);
      setTotalCount(response.TotalCount);
      setTotalPages(response.TotalPages);
      setHasSearched(true);
    } catch (error) {
      console.error("❌ Error en la búsqueda:", error);
      setSearchResults([]);
      setTotalCount(0);
      setTotalPages(0);
      setHasSearched(true);
      // Mostrar error al usuario
      const errorMessage = error instanceof Error ? error.message : "Error al realizar la búsqueda";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      console.log("🏁 Búsqueda finalizada");
    }
  };

  const markLessonAsVisited = useCallback((lessonId: string) => {
    setVisitedLessons((prev) => {
      // Solo actualizar si la lección no está ya visitada
      if (prev.has(lessonId)) {
        return prev;
      }
      const newSet = new Set(prev);
      newSet.add(lessonId);
      return newSet;
    });
  }, []);

  const isLessonVisited = useCallback((lessonId: string): boolean => {
    return visitedLessons.has(lessonId);
  }, [visitedLessons]);

  const toggleLessonSelection = useCallback((lessonId: string) => {
    setSelectedLessons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
      } else {
        newSet.add(lessonId);
      }
      return newSet;
    });
  }, []);

  const isLessonSelected = useCallback((lessonId: string): boolean => {
    return selectedLessons.has(lessonId);
  }, [selectedLessons]);

  return (
    <FilterContext.Provider
      value={{
        minScore,
        setMinScore,
        searchText,
        setSearchText,
        hasSearched,
        setHasSearched,
        isLoading,
        setIsLoading,
        searchResults,
        setSearchResults,
        performSearch,
        pageNumber,
        setPageNumber,
        pageSize,
        setPageSize,
        totalCount,
        totalPages,
        dateRange,
        setDateRange,
        selectedField,
        setSelectedField,
        visitedLessons,
        markLessonAsVisited,
        isLessonVisited,
        selectedLessons,
        toggleLessonSelection,
        isLessonSelected,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
