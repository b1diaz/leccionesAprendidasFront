import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "./input";

type ModalProps = {
  newForm: {
    name: string;
  };
  setNewForm: (form: { name: string }) => void;
  handleCancel: () => void;
  handleCreateForm: () => void;
};

export const ModalState = ({
  newForm,
  setNewForm,
  handleCancel,
  handleCreateForm,
}: ModalProps) => {
  if (!open) return null;
  return (
    <DialogContent className="bg-white border-blue-200 max-w-md">
      <DialogHeader>
        <DialogTitle className="text-negro-900 text-xl">
          Crear Nuevo Estado
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-4 mt-4">
        <div>
          <Label htmlFor="name" className="text-negro-800 font-medium">
            Estado
          </Label>
          <Input
            id="name"
            value={newForm.name}
            onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
            placeholder="Ingresa el nombre del estado"
            className="mt-1 focus:border-nego-300"
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
          disabled={!newForm.name.trim()}
          className="bg-negro-600 hover:bg-negro-600 text-white"
        >
          Crear
        </Button>
      </div>
    </DialogContent>
  );
};
