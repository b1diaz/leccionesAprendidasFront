import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLeccionConCoincidencia } from "../hooks/leccion-con-coincidencia/useLeccionConCoincidencia";
import LoadingSkeleton from "../ui/loading-skeleton";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, resultados, onGetLeccionConCoincidencia } =
    useLeccionConCoincidencia();

  useEffect(() => {
    getLeccionConCoincidencia();
  }, [searchParams]);

  const getLeccionConCoincidencia = () => {
    const Consulta = searchParams.get("Consulta");
    onGetLeccionConCoincidencia(Consulta);
  };

  const handleClick = (resultId: string) => {
    setSelectedResultId(resultId);
    setIsModalOpen(true);
  };

  const selectedResult =
    selectedResultId !== null
      ? resultados.find((r) => r.leccion.id === selectedResultId)
      : null;

  return (
    <div className="flex-1 p-4 lg:p-8 bg-negro-50 cloud-bg ">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl lg:text-2xl font-bold text-negro-600 mb-4 lg:mb-6">
          Resultados de búsqueda
        </h2>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {resultados.length > 0 ? (
              <div className="space-y-3 lg:space-y-4">
                {resultados.map((result) => (
                  <Card
                    key={result.leccion.id}
                    onClick={() => handleClick(result.leccion.id)}
                    className="bg-negro-75 hover:shadow-lg shadow-md transition-shadow cursor-pointer "
                  >
                    <CardHeader className="pb-2 lg:pb-4">
                      <CardTitle className="text-negro-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-base lg:text-lg">
                        <span className="truncate">
                          {result.leccion.titulo}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-negro-600 mb-2 text-sm lg:text-base">
                        {result.leccion.descripcion}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-[60vh]">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-35 h-20 mb-2"
                />
                <p className="text-gris-600 text-base lg:text-lg">
                  No se encontraron resultados
                </p>
                <p className="text-gris-600 text-xs lg:text-sm mt-2">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="border-blue-200 max-w-2xl">
          {selectedResult && (
            <>
              <DialogHeader>
                <DialogTitle className="text-negro-900 text-xl">
                  {selectedResult.leccion.titulo}
                </DialogTitle>
                <DialogDescription className="text-negro-600 text-base">
                  {selectedResult.leccion.descripcion}
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchResults;
