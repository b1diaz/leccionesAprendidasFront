/**
 * Modelo unificado de Lesson para todo el sistema
 */
export interface Lesson {
  Id: string;
  code?: string; // Código o número único del evento
  description: string;
  situationType: string;
  location: string;
  relatedPosition: string;
  analysis: string;
  consequences: string;
  lesson: string;
  dateTime: string;
  searchContent: string;
  score: number;
}

/**
 * Respuesta de la API (temporal, solo para mapeo interno)
 */
export interface LessonSearchResult {
  Lesson: {
    Id: string;
    Code?: string; // Código o número único del evento (puede venir con mayúscula)
    code?: string; // Código o número único del evento (puede venir con minúscula)
    description: string;
    situationType: string;
    location: string;
    relatedPosition: string;
    analysis: string;
    consequences: string;
    lesson: string;
    dateTime: string;
    searchContent: string;
    embedding: number[];
    [key: string]: any; // Permitir propiedades adicionales
  };
  Score: number;
}

/**
 * Enum para los tipos de campos de búsqueda
 * Debe coincidir con SearchFieldType del backend
 */
export enum SearchFieldType {
  Description = 0,
  Analysis = 1,
  Consequences = 2,
  Lesson = 3,
}

/**
 * Parámetros de búsqueda (POST)
 * La API espera estos campos según el contrato
 */
export interface SearchParams {
  Query: string; // Requerido, mínimo 3 caracteres
  SearchField: SearchFieldType; // Requerido, enum (0-3)
  DateFrom?: string; // Opcional, formato ISO 8601
  DateTo?: string; // Opcional, formato ISO 8601
  MinScore?: number; // Opcional, rango 0-1
  PageNumber?: number; // Opcional, número de página (base 1), por defecto 1
  PageSize?: number; // Opcional, tamaño de página (10, 25, 50, 100), por defecto 10
}

/**
 * Respuesta paginada de la API
 */
export interface PaginatedSearchResponse {
  Results: LessonSearchResult[];
  TotalCount: number;
  PageNumber: number;
  PageSize: number;
  TotalPages: number;
}
