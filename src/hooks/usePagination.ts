import { useState, useEffect, useMemo } from "react";

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
  dependencies?: unknown[];
}

interface UsePaginationReturn<T> {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  currentItems: T[];
  startIndex: number;
  endIndex: number;
  totalItems: number;
}

/**
 * Hook para manejar paginación de items
 */
export const usePagination = <T,>({
  items,
  itemsPerPage = 5,
  dependencies = [],
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = useMemo(
    () => items.slice(startIndex, endIndex),
    [items, startIndex, endIndex]
  );

  // Resetear página cuando cambian las dependencias
  useEffect(() => {
    setCurrentPage(1);
  }, dependencies);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
    startIndex,
    endIndex,
    totalItems: items.length,
  };
};














