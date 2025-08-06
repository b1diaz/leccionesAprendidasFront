import { buscarLeccionesConCoincidencia } from "@/api/services/leccionesService";
import { useState } from "react";

export const useLeccionConCoincidencia = () => {
  const [resultados, setResultados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onGetLeccionConCoincidencia = async (Query: string) => {
    setIsLoading(true);
    try {
      const data = await buscarLeccionesConCoincidencia({ Query });
      setResultados(data);
    } catch (error) {
      console.error("Error al obtener resultados", error);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    resultados,
    onGetLeccionConCoincidencia,
  };
};
