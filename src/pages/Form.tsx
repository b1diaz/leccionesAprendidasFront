import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import { useLeccionConCoincidencia } from "@/components/hooks/leccion-con-coincidencia/useLeccionConCoincidencia";
import LoadingSkeleton from "@/components/ui/loading-skeleton";

interface FormData {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

const Forms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, resultados, onGetLeccionConCoincidencia } =
    useLeccionConCoincidencia();

  useEffect(() => {
    const Consulta = "Consulta";
    onGetLeccionConCoincidencia(Consulta);
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

      {/* Contenido principal con margen para la barra lateral */}
      <div className="pt-16 lg:pt-0 lg:pl-16">
        <div className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header con botón de crear */}
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

            {/* Lista de formularios recientes */}
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

      {/* Modal para crear formulario */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white border-blue-200 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-negro-900 text-xl">
              Crear Nuevo Formulario
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="title" className="text-negro-800 font-medium">
                Título
              </Label>
              <Input
                id="title"
                value={newForm.title}
                onChange={(e) =>
                  setNewForm({ ...newForm, title: e.target.value })
                }
                placeholder="Ingresa el título del formulario"
                className="mt-1 focus:border-nego-300"
              />
            </div>

            <div>
              <Label
                htmlFor="description"
                className="text-negro-900 font-medium"
              >
                Descripción
              </Label>
              <Textarea
                id="description"
                value={newForm.description}
                onChange={(e) =>
                  setNewForm({ ...newForm, description: e.target.value })
                }
                placeholder="Describe el propósito de este formulario"
                className="mt-1 focus:border-negro-300 min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="border-negro-100 hover:bg-blue-50"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateForm}
              disabled={!newForm.title.trim() || !newForm.description.trim()}
              className="bg-negro-600 hover:bg-negro-600 text-white"
            >
              Crear
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Forms;
