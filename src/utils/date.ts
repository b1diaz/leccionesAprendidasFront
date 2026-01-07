/**
 * Utilidades para formateo de fechas
 */

export interface FormattedDateTime {
  date: string;
  time: string;
}

/**
 * Formatea una fecha ISO string a formato legible en español
 * @param dateTimeString - Fecha en formato ISO string
 * @returns Objeto con fecha y hora formateadas
 */
export const formatDateTime = (dateTimeString: string): FormattedDateTime => {
  const date = new Date(dateTimeString);
  const dateStr = date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const timeStr = date.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  return { date: dateStr, time: timeStr };
};














