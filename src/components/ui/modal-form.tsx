import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "./textarea";
import { Input } from "./input";

type ModalProps = {
  newForm: {
    title: string;
    description: string;
  };
  setNewForm: (form: { title: string; description: string }) => void;
  handleCancel: () => void;
  handleCreateForm: () => void;
};

export const ModalForm = ({
  newForm,
  setNewForm,
  handleCancel,
  handleCreateForm,
}: ModalProps) => {
  return (
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
            onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
            placeholder="Ingresa el título del formulario"
            className="mt-1 focus:border-nego-300"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-negro-900 font-medium">
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
  );
};
