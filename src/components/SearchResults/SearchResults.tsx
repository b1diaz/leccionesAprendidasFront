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
    <div className="flex-1 p-4 lg:p-8 cloud-bg min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl lg:text-2xl font-bold text-purple-900 mb-4 lg:mb-6 ">
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
                    className="bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleClick(result.leccion.id)}
                  >
                    <CardHeader className="pb-2 lg:pb-4">
                      <CardTitle className="text-purple-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-base lg:text-lg">
                        <span className="truncate">
                          {result.leccion.titulo}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-purple-700 mb-2 text-sm lg:text-base">
                        {result.leccion.descripcion}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 lg:py-12">
                <p className="text-purple-600 text-base lg:text-lg">
                  No se encontraron resultados
                </p>
                <p className="text-purple-500 text-xs lg:text-sm mt-2">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white border-purple-200 max-w-2xl">
          {selectedResult && (
            <>
              <DialogHeader>
                <DialogTitle className="text-purple-900 text-xl">
                  {selectedResult.leccion.titulo}
                </DialogTitle>
                <DialogDescription className="text-purple-700 text-base">
                  {selectedResult.leccion.descripcion}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-purple-800 mb-3 text-lg">
                    Detalles Completos:
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-purple-800">
                        Categoría:
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchResults;
