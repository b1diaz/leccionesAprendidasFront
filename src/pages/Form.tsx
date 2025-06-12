import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import LeftSidebar from '@/components/LeftSidebar/LeftSidebar';

interface FormData {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

const Forms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forms, setForms] = useState<FormData[]>([
    {
      id: 1,
      title: 'Formulario de Contacto',
      description: 'Formulario básico para capturar información de contacto de usuarios',
      createdAt: '2024-01-15 10:30'
    },
    {
      id: 2,
      title: 'Encuesta de Satisfacción',
      description: 'Encuesta para medir la satisfacción del cliente con nuestros servicios',
      createdAt: '2024-01-14 16:45'
    },
    {
      id: 3,
      title: 'Registro de Eventos',
      description: 'Formulario para el registro de asistentes a eventos corporativos',
      createdAt: '2024-01-13 09:20'
    }
  ]);

  const [newForm, setNewForm] = useState({
    title: '',
    description: ''
  });

  const handleCreateForm = () => {
    if (newForm.title.trim() && newForm.description.trim()) {
      const newFormData: FormData = {
        id: forms.length + 1,
        title: newForm.title,
        description: newForm.description,
        createdAt: new Date().toLocaleString('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      
      setForms([newFormData, ...forms]);
      setNewForm({ title: '', description: '' });
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setNewForm({ title: '', description: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 cloud-bg">
      <LeftSidebar />
      
      {/* Contenido principal con margen para la barra lateral */}
      <div className="pt-16 lg:pt-0 lg:pl-16">
        <div className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header con botón de crear */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-purple-900">
                Gestión de Formularios
              </h1>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear Formulario
              </Button>
            </div>

            {/* Lista de formularios recientes */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-purple-800 mb-4">
                Formularios Creados Recientemente
              </h2>
              
              {forms.map((form) => (
                <Card 
                  key={form.id} 
                  className="bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-purple-800 text-lg">
                      {form.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-700 mb-3 text-sm">
                      {form.description}
                    </p>
                    <p className="text-xs text-purple-600">
                      Creado: {form.createdAt}
                    </p>
                  </CardContent>
                </Card>
              ))}

              {forms.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-purple-600 text-lg">No hay formularios creados</p>
                  <p className="text-purple-500 text-sm mt-2">
                    Crea tu primer formulario usando el botón de arriba
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para crear formulario */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white border-purple-200 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-purple-900 text-xl">
              Crear Nuevo Formulario
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="title" className="text-purple-800 font-medium">
                Título
              </Label>
              <Input
                id="title"
                value={newForm.title}
                onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                placeholder="Ingresa el título del formulario"
                className="mt-1 border-purple-200 focus:border-purple-500"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-purple-800 font-medium">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={newForm.description}
                onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                placeholder="Describe el propósito de este formulario"
                className="mt-1 border-purple-200 focus:border-purple-500 min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateForm}
              disabled={!newForm.title.trim() || !newForm.description.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
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