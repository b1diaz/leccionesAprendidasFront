import { useMemo, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useFilter } from "@/contexts/FilterContext";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { LessonCard } from "@/components/shared/LessonCard";
import { PaginationInfo } from "@/components/shared/PaginationInfo";
import { useSearchPanel } from "@/components/layout/RightPanel/useSearchPanel";
import type { SearchParams } from "@/types/lesson.types";
import { SearchFieldType } from "@/types/lesson.types";

const MainContent = () => {
  const { 
    minScore, 
    searchText, 
    hasSearched, 
    searchResults, 
    pageNumber, 
    setPageNumber,
    pageSize,
    totalCount,
    totalPages,
    performSearch,
  } = useFilter();
  
  const { dateRange, selectedField } = useSearchPanel();

  // Mapear variant según situationType
  const getVariant = (situationType: string): "default" | "secondary" | "outline" => {
    if (situationType === "Condición Insegura") return "default";
    if (situationType === "Incidente") return "secondary";
    return "outline";
  };

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

  // Función para realizar búsqueda con paginación
  const handlePageChange = async (newPage: number) => {
    if (!hasSearched || !searchText.trim()) return;
    
    const [dateFrom, dateTo] = dateRange;
    const searchParams: SearchParams = {
      Query: searchText.trim(),
      SearchField: mapFieldToSearchFieldType(selectedField),
      PageNumber: newPage,
      PageSize: pageSize,
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
  };

  // Transformar resultados de la API al formato esperado por LessonCard
  const transformedLessons = useMemo(() => {
    return searchResults
      .sort((a, b) => b.score - a.score)
      .map((lesson) => ({
        Id: lesson.Id,
        situationType: lesson.situationType,
        description: lesson.description,
        dateTime: lesson.dateTime,
        location: lesson.location,
        relatedPosition: lesson.relatedPosition,
        analysis: lesson.analysis,
        consequences: lesson.consequences,
        lesson: lesson.lesson,
        searchContent: lesson.searchContent,
        score: lesson.score,
        variant: getVariant(lesson.situationType),
      }));
  }, [searchResults]);

  // Calcular índices para mostrar en la información de paginación
  const startIndex = totalCount > 0 ? (pageNumber - 1) * pageSize + 1 : 0;
  const endIndex = Math.min(pageNumber * pageSize, totalCount);

  return (
    <main className="flex-1 flex flex-col overflow-auto bg-gray-50">
      <PageHeader
        breadcrumbs={[
          { label: "Lecciones Aprendidas" },
          { label: "Resultados de búsqueda", active: true },
        ]}
        title="Resultados de búsqueda"
        showNewButton
      />

      {/* Results */}
      <div className="flex-1 px-6 pt-6 pb-6">
        {!hasSearched || !searchText.trim() || transformedLessons.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4 max-w-full">
            {transformedLessons.map((lesson) => (
              <LessonCard key={lesson.Id} {...lesson} />
            ))}
          </div>
        )}
      </div>

      {/* Paginación */}
      {transformedLessons.length > 0 && totalPages > 1 && (
        <div className="px-6 pb-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (pageNumber > 1) handlePageChange(pageNumber - 1);
                  }}
                  className={pageNumber === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Mostrar primera página, última página, página actual y páginas adyacentes
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= pageNumber - 1 && page <= pageNumber + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                        isActive={pageNumber === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (page === pageNumber - 2 || page === pageNumber + 2) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (pageNumber < totalPages) handlePageChange(pageNumber + 1);
                  }}
                  className={pageNumber === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Información de paginación */}
      {transformedLessons.length > 0 && (
        <PaginationInfo
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalCount}
          className="px-6 pb-6"
        />
      )}
    </main>
  );
};

export default MainContent;
