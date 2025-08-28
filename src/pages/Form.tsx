import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import { useLeccionConCoincidencia } from "@/components/hooks/leccion-con-coincidencia/useLeccionConCoincidencia";
import LoadingSkeleton from "@/components/ui/loading-skeleton";
import { ModalForm } from "@/components/ui/modal-form";

const Forms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, resultados, onGetLeccionConCoincidencia } =
    useLeccionConCoincidencia();

  useEffect(() => {
    const Query = "Query";
    onGetLeccionConCoincidencia(Query);
  }, []);

  const [newForm, setNewForm] = useState({
    title: "",
    description: "",
  });

  const handleCreateForm = () => {
    if (newForm.title.trim() && newForm.description.trim()) {
      setNewForm({ title: "", description: "" });
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setNewForm({ title: "", description: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br to-blue-100 cloud-bg">
      <LeftSidebar />

      <div className="pt-16 lg:pt-0 lg:pl-16">
        <div className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-negro-900">
                Gestión de Formularios
              </h1>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear Formulario
              </Button>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-negro-600 mb-4">
                    Formularios Creados Recientemente
                  </h2>
                  {resultados.length > 0 ? (
                    resultados.map((result) => (
                      <Card
                        key={result.leccion.id}
                        className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-negro-900 text-lg">
                            {result.leccion.titulo}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-negro-700 mb-3 text-sm">
                            {result.leccion.descripcion}
                          </p>
                        </CardContent>
                      </Card>
                    ))
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
                        Intenta creando un formulario
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalForm
          newForm={newForm}
          setNewForm={setNewForm}
          handleCancel={handleCancel}
          handleCreateForm={handleCreateForm}
        />
      </Dialog>
    </div>
  );
};

export default Forms;
