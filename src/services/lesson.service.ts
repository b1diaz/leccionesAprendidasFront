import type { Lesson, LessonSearchResult, SearchParams, PaginatedSearchResponse } from "@/types/lesson.types";
import { getEnvConfig, isLocalEnv } from "@/config/env";
import { searchMockLessons } from "@/data/mockLessons";

/**
 * Transforma un resultado de búsqueda de la API al modelo unificado Lesson
 */
const transformSearchResultToLesson = (
  result: LessonSearchResult
): Lesson => {
  // Priorizar Code (mayúscula) sobre code (minúscula) - el backend envía Code
  const code = (result.Lesson as any).Code || (result.Lesson as any).code || undefined;
  
  if (code) {
    console.log(`📝 Code mapeado para Id ${result.Lesson.Id}:`, code);
  } else {
    console.warn(`⚠️ No se encontró Code para Id ${result.Lesson.Id}`);
  }
  
  return {
    Id: result.Lesson.Id,
    code: code,
    description: result.Lesson.description,
    situationType: result.Lesson.situationType,
    location: result.Lesson.location,
    relatedPosition: result.Lesson.relatedPosition,
    analysis: result.Lesson.analysis,
    consequences: result.Lesson.consequences,
    lesson: result.Lesson.lesson,
    dateTime: result.Lesson.dateTime,
    searchContent: result.Lesson.searchContent,
    score: result.Score,
  };
};

/**
 * Servicio para buscar lecciones
 * - En ambiente local (dev): usa datos mock para pruebas
 * - En ambiente QA: usa la API real
 * Retorna PaginatedSearchResponse con resultados paginados y metadatos
 */
export const buscarLeccionesConCoincidencia = async (
  params: SearchParams
): Promise<PaginatedSearchResponse> => {
  console.log("🔍 buscarLeccionesConCoincidencia llamado con params:", params);
  console.log("🌍 isLocalEnv():", isLocalEnv());
  
  // Siempre usar la API de QA (comentado el uso de mock para forzar la API)
  // Si estamos en desarrollo local, usar datos mock
  // if (isLocalEnv()) {
  //   console.log("📦 Usando datos mock (ambiente local)");
  //   // Simular un pequeño delay para hacer más realista
  //   await new Promise((resolve) => setTimeout(resolve, 300));
  //   
  //   const mockResults = searchMockLessons(params.Query || "");
  //   
  //   // Transformar resultados mock al modelo unificado
  //   return mockResults.map(transformSearchResultToLesson);
  // }

  // En QA o producción, usar la API real
  const { apiBaseUrl, apiCode } = getEnvConfig();
  
  // Validar que las variables de entorno estén configuradas
  if (!apiBaseUrl || !apiCode) {
    throw new Error('Las variables de entorno VITE_API_URL y VITE_API_KEY deben estar configuradas. Revisa tu archivo .env');
  }
  
  // Construir la URL completa usando las variables de entorno
  const url = `${apiBaseUrl}/searchlessons`;
  const fullUrl = `${url}?code=${apiCode}`;

  console.log("🌐 Llamando a la API:", fullUrl);
  console.log("📤 Body enviado:", JSON.stringify(params, null, 2));

  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    console.log("📥 Response status:", response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error en la respuesta:", errorText);
      throw new Error(errorText || "Error al buscar las lecciones");
    }

    const apiResponse: PaginatedSearchResponse = await response.json();
    console.log("✅ Resultados recibidos:", apiResponse.Results.length, "lecciones");
    console.log("📊 Paginación - Total:", apiResponse.TotalCount, "Página:", apiResponse.PageNumber, "/", apiResponse.TotalPages);
    console.log("📋 Primer resultado completo:", JSON.stringify(apiResponse.Results[0], null, 2));
    
    // Transformar resultados de la API al modelo unificado
    const transformedResults = apiResponse.Results.map(transformSearchResultToLesson);
    
    return {
      Results: transformedResults,
      TotalCount: apiResponse.TotalCount,
      PageNumber: apiResponse.PageNumber,
      PageSize: apiResponse.PageSize,
      TotalPages: apiResponse.TotalPages,
    };
  } catch (error) {
    console.error("❌ Error en fetch:", error);
    throw error;
  }
};
