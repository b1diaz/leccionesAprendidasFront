export interface ConsultaDto {
  Consulta: string;
}

//Método POST
export const buscarLeccionesConCoincidencia = async (datos: ConsultaDto) => {
  const url = `${import.meta.env.VITE_API_URL}/BuscarLecciones${import.meta.env.VITE_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al buscar las lecciones");
  }

  return response.json();
};
