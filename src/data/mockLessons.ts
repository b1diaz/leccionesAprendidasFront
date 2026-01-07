import type { LessonSearchResult } from "@/types/lesson.types";

/**
 * Datos mock para pruebas en desarrollo local
 * Simula la respuesta de la API con lecciones de ejemplo
 */
export const mockLessonsData: LessonSearchResult[] = [
  {
    Lesson: {
      Id: "1",
      description: "Caída de altura en plataforma de trabajo",
      situationType: "Incidente",
      location: "Planta de Producción - Área 3",
      relatedPosition: "Operador de Producción",
      analysis: "El operador no utilizó el arnés de seguridad al trabajar en la plataforma elevada. La superficie estaba resbaladiza debido a condiciones climáticas. No se realizó inspección previa del área de trabajo.",
      consequences: "Lesión en columna vertebral, tiempo de recuperación estimado de 6 meses. Parada de producción por 2 horas. Investigación de seguridad iniciada.",
      lesson: "Siempre utilizar equipo de protección personal completo, especialmente arnés de seguridad en trabajos en altura. Realizar inspección previa del área y condiciones climáticas antes de iniciar trabajos.",
      dateTime: "2024-01-15T08:30:00Z",
      searchContent: "caída altura plataforma trabajo seguridad arnés lesión",
      embedding: [],
    },
    Score: 0.95,
  },
  {
    Lesson: {
      Id: "2",
      description: "Fuga de sustancia química en tanque de almacenamiento",
      situationType: "Condición Insegura",
      location: "Almacén de Productos Químicos",
      relatedPosition: "Supervisor de Almacén",
      analysis: "Válvula de seguridad defectuosa en tanque de almacenamiento. El sistema de detección de fugas no estaba operativo. Falta de mantenimiento preventivo en los últimos 3 meses.",
      consequences: "Evacuación preventiva del área. Exposición de personal a vapores tóxicos. Contaminación ambiental localizada. Costo de limpieza y reparación estimado en $50,000.",
      lesson: "Implementar programa de mantenimiento preventivo estricto para equipos críticos. Verificar funcionamiento de sistemas de detección y alarmas semanalmente. Capacitar al personal en procedimientos de emergencia.",
      dateTime: "2024-02-20T14:15:00Z",
      searchContent: "fuga químico tanque válvula seguridad mantenimiento",
      embedding: [],
    },
    Score: 0.88,
  },
  {
    Lesson: {
      Id: "3",
      description: "Atrapamiento de mano en máquina de producción",
      situationType: "Incidente",
      location: "Línea de Producción 2",
      relatedPosition: "Operador de Máquina",
      analysis: "El operador intentó limpiar la máquina mientras estaba en funcionamiento, violando el procedimiento de bloqueo y etiquetado (LOTO). Los guardas de seguridad estaban removidos temporalmente.",
      consequences: "Amputación parcial de dos dedos. Tiempo de inactividad de la línea: 8 horas. Investigación de seguridad y revisión de procedimientos LOTO.",
      lesson: "Nunca realizar mantenimiento o limpieza en máquinas en funcionamiento. Seguir estrictamente los procedimientos de bloqueo y etiquetado. Los guardas de seguridad nunca deben ser removidos durante operación.",
      dateTime: "2024-03-10T10:45:00Z",
      searchContent: "atrapamiento máquina LOTO bloqueo guardas seguridad",
      embedding: [],
    },
    Score: 0.92,
  },
  {
    Lesson: {
      Id: "4",
      description: "Incendio en área de almacenamiento de materiales",
      situationType: "Incidente",
      location: "Almacén General",
      relatedPosition: "Jefe de Almacén",
      analysis: "Materiales inflamables almacenados incorrectamente cerca de fuente de calor. Falta de señalización adecuada. Sistema de extintores no inspeccionado recientemente.",
      consequences: "Daño parcial al almacén. Pérdida de inventario valorado en $25,000. Tiempo de recuperación: 2 semanas. Revisión completa de procedimientos de almacenamiento.",
      lesson: "Mantener separación adecuada entre materiales inflamables y fuentes de calor. Inspeccionar regularmente sistemas de protección contra incendios. Capacitar al personal en manejo seguro de materiales peligrosos.",
      dateTime: "2024-04-05T16:20:00Z",
      searchContent: "incendio almacén materiales inflamables extintores",
      embedding: [],
    },
    Score: 0.85,
  },
  {
    Lesson: {
      Id: "5",
      description: "Exposición a ruido excesivo sin protección auditiva",
      situationType: "Condición Insegura",
      location: "Área de Compresores",
      relatedPosition: "Técnico de Mantenimiento",
      analysis: "Niveles de ruido superan los límites permisibles (95 dB). El personal no utiliza protección auditiva consistentemente. Falta de señalización de área de alto ruido.",
      consequences: "Riesgo de pérdida auditiva permanente en trabajadores. Posibles multas por incumplimiento normativo. Necesidad de implementar controles de ingeniería.",
      lesson: "Proporcionar y exigir uso de protección auditiva en áreas de alto ruido. Implementar controles de ingeniería para reducir ruido en la fuente. Realizar monitoreo de ruido periódico.",
      dateTime: "2024-05-12T09:00:00Z",
      searchContent: "ruido protección auditiva dB seguridad ocupacional",
      embedding: [],
    },
    Score: 0.78,
  },
  {
    Lesson: {
      Id: "6",
      description: "Resbalón y caída en pasillo de producción",
      situationType: "Incidente",
      location: "Pasillo Principal - Planta 1",
      relatedPosition: "Operador de Producción",
      analysis: "Derrame de aceite no limpiado inmediatamente. Falta de señalización temporal del área. Calzado de seguridad con suela desgastada.",
      consequences: "Lesión en muñeca y contusión en cadera. Tiempo de recuperación: 3 semanas. Revisión de procedimientos de limpieza y mantenimiento de áreas comunes.",
      lesson: "Limpiar derrames inmediatamente o señalizar el área hasta la limpieza. Inspeccionar y reemplazar calzado de seguridad regularmente. Mantener pasillos libres de obstáculos.",
      dateTime: "2024-06-18T11:30:00Z",
      searchContent: "resbalón caída derrame limpieza calzado seguridad",
      embedding: [],
    },
    Score: 0.82,
  },
  {
    Lesson: {
      Id: "7",
      description: "Sobrecarga eléctrica en panel de distribución",
      situationType: "Condición Insegura",
      location: "Sala Eléctrica Principal",
      relatedPosition: "Electricista",
      analysis: "Panel eléctrico sobrecargado debido a conexiones adicionales no autorizadas. Falta de etiquetado adecuado. Sistema de protección contra sobrecarga no calibrado correctamente.",
      consequences: "Cortocircuito que causó apagón parcial. Daño a equipos conectados. Riesgo de incendio eléctrico. Necesidad de actualización del sistema eléctrico.",
      lesson: "No realizar modificaciones eléctricas sin autorización y planos actualizados. Mantener etiquetado claro en todos los paneles. Realizar inspecciones eléctricas periódicas por personal calificado.",
      dateTime: "2024-07-22T13:45:00Z",
      searchContent: "eléctrico sobrecarga panel cortocircuito seguridad",
      embedding: [],
    },
    Score: 0.90,
  },
  {
    Lesson: {
      Id: "8",
      description: "Exposición a sustancia química sin EPP adecuado",
      situationType: "Condición Insegura",
      location: "Laboratorio de Control de Calidad",
      relatedPosition: "Técnico de Laboratorio",
      analysis: "Manejo de ácido concentrado sin guantes químicos apropiados. Falta de ducha de seguridad operativa. Ventilación insuficiente en el área.",
      consequences: "Quemadura química en manos. Riesgo de exposición a otros trabajadores. Revisión de procedimientos de laboratorio y EPP requerido.",
      lesson: "Usar siempre el EPP específico para cada sustancia química según la hoja de seguridad (SDS). Mantener sistemas de seguridad (duchas, lavaojos) operativos. Mejorar ventilación en áreas de trabajo con químicos.",
      dateTime: "2024-08-30T15:20:00Z",
      searchContent: "químico EPP guantes laboratorio seguridad SDS",
      embedding: [],
    },
    Score: 0.87,
  },
];

/**
 * Simula una búsqueda con datos mock
 * Filtra las lecciones basándose en el query de búsqueda
 */
export const searchMockLessons = (query: string): LessonSearchResult[] => {
  if (!query || query.trim() === "") {
    return mockLessonsData;
  }

  const queryLower = query.toLowerCase();
  
  return mockLessonsData
    .filter((item) => {
      const searchableText = `
        ${item.Lesson.description}
        ${item.Lesson.analysis}
        ${item.Lesson.consequences}
        ${item.Lesson.lesson}
        ${item.Lesson.location}
        ${item.Lesson.situationType}
        ${item.Lesson.searchContent}
      `.toLowerCase();

      return searchableText.includes(queryLower);
    })
    .map((item) => {
      // Simular score basado en relevancia (más alto si aparece más veces)
      const matches = (searchableText.match(new RegExp(queryLower, "gi")) || []).length;
      const baseScore = item.Score;
      const relevanceBoost = Math.min(matches * 0.05, 0.1);
      
      return {
        ...item,
        Score: Math.min(baseScore + relevanceBoost, 1.0),
      };
    })
    .sort((a, b) => b.Score - a.Score);
};

