/**
 * Utilidades para manejo de scores
 */

/**
 * Obtiene el color correspondiente a un score
 * @param score - Score numérico entre 0 y 1
 * @returns Color en formato HSL
 */
export const getScoreColor = (score: number): string => {
  if (score >= 0.7) return "hsl(142, 71%, 45%)"; // Verde
  if (score >= 0.4) return "hsl(45, 93%, 47%)"; // Amarillo
  return "hsl(0, 72%, 51%)"; // Rojo
};

/**
 * Obtiene la etiqueta de nivel de score
 * @param score - Score numérico entre 0 y 1
 * @returns Etiqueta descriptiva del nivel
 */
export const getScoreLabel = (score: number): string => {
  if (score >= 0.7) return "Alta Coincidencia";
  if (score >= 0.4) return "Coincidencia Media";
  return "Baja Coincidencia";
};














