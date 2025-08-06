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
    const Query = searchParams.get("Query");
    onGetLeccionConCoincidencia(Query);
  };

  const handleClick = (Id: string) => {
    setSelectedResultId(Id);
    setIsModalOpen(true);
  };

  const selectedResult =
    selectedResultId !== null
      ? resultados.find((r) => r.Lesson.Id === selectedResultId)
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
                    key={result.Lesson.Id}
                    onClick={() => handleClick(result.Lesson.Id)}
                    className="bg-negro-75 hover:shadow-lg shadow-md transition-shadow cursor-pointer "
                  >
                    <CardHeader className="pb-2 lg:pb-4">
                      <CardTitle className="text-negro-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-base lg:text-lg">
                        <span className="truncate">
                          {result.Lesson.relatedPosition}
                        </span>
                        <span
                          className={
                            "text-xs text-white bg-blue-600 px-2 py-1 rounded-full self-start sm:self-auto"
                          }
                        >
                          {result.Lesson.situationType}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-negro-600 mb-2 text-sm lg:text-base">
                        {result.Lesson.description}
                      </p>
                      <p className="text-negro-600 mb-2 text-sm lg:text-base">
                        {result.Lesson.dateTime
                          ? new Date(result.Lesson.dateTime).toLocaleString(
                              "es-CO",
                              {
                                dateStyle: "full",
                                timeStyle: "short",
                              }
                            )
                          : ""}
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
        <DialogContent className="border-blue-200 max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedResult && (
            <>
              <DialogHeader>
                <DialogDescription className="text-negro-600 text-base">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-negro-900">
                        Fecha y hora del evento:
                      </label>
                      <textarea
                        rows={1}
                        className="w-full bg-gris-100 border rounded-md px-3 py-2 text-sm resize-none resize-y"
                        readOnly
                        value={
                          selectedResult?.Lesson.dateTime
                            ? new Date(
                                selectedResult.Lesson.dateTime
                              ).toLocaleString("es-CO", {
                                dateStyle: "full",
                                timeStyle: "short",
                              })
                            : ""
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-negro-900">
                        Cargo relacionado:
                      </label>
                      <textarea
                        rows={1}
                        className="w-full bg-gris-100 border rounded-md px-3 py-2 text-sm resize-none resize-y"
                        readOnly
                        value={selectedResult?.Lesson.relatedPosition}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-negro-900">
                        Tipo de situación:
                      </label>
                      <textarea
                        rows={1}
                        className="w-full bg-gris-100 border rounded-md px-3 py-2 text-sm resize-none resize-y"
                        readOnly
                        value={selectedResult?.Lesson.situationType}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-negro-900">
                        Ubicación:
                      </label>
                      <textarea
                        rows={1}
                        className="w-full bg-gris-100 border rounded-md px-3 py-2 text-sm resize-none resize-y"
                        readOnly
                        value={selectedResult?.Lesson.location}
                      />
                    </div>
                  </div>

                  <br />
                  <br />

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm font-medium text-negro-900">
                        Descripción:
                      </label>
                      <textarea
                        rows={4}
                        className="w-full bg-gris-100 border rounded-md px-3 py-2 text-sm resize-none resize-y"
                        readOnly
                        value={selectedResult?.Lesson.description}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-negro-900">
                        Análisis:
                      </label>
                      <textarea
                        rows={4}
                        className="w-full bg-gris-100 border rounded-md px-3 py-2 text-sm resize-none resize-y"
                        readOnly
                        value={selectedResult?.Lesson.analysis}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-negro-900">
                        Consecuencias reales o potenciales:
                      </label>
                      <textarea
                        rows={4}
                        className="w-full bg-gris-100 border rounded-md px-3 py-2 text-sm resize-none resize-y"
                        readOnly
                        value={selectedResult?.Lesson.consequences}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-negro-900">
                        Lección:
                      </label>
                      <textarea
                        rows={4}
                        className="w-full bg-gris-100 border rounded-md px-3 py-2 text-sm resize-none resize-y"
                        readOnly
                        value={selectedResult?.Lesson.lesson}
                      />
                    </div>
                  </div>
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
