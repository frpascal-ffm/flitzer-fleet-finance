import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FahrerDialogProps {
  mode: 'add' | 'edit';
  trigger?: React.ReactNode;
  defaultValues?: {
    name: string;
    email: string;
    provision: string;
    sollfahrten: number;
  };
  onSubmit?: (data: any) => void;
}

const FahrerDialog = ({ mode, trigger, defaultValues, onSubmit }: FahrerDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState(defaultValues || {
    name: '',
    email: '',
    provision: '',
    sollfahrten: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Fahrer hinzufügen</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{mode === 'add' ? 'Neuen Fahrer hinzufügen' : 'Fahrer bearbeiten'}</DialogTitle>
            <DialogDescription>
              {mode === 'add' ? 'Fügen Sie hier die Details des neuen Fahrers hinzu.' : 'Bearbeiten Sie die Details des Fahrers.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Name des Fahrers"
                className="col-span-3"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                E-Mail
              </Label>
              <Input
                id="email"
                placeholder="E-Mail Adresse"
                type="email"
                className="col-span-3"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="provision" className="text-right">
                Provision
              </Label>
              <Input
                id="provision"
                placeholder="z.B. 40%"
                className="col-span-3"
                value={formData.provision}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sollfahrten" className="text-right">
                Sollfahrten
              </Label>
              <Input
                id="sollfahrten"
                type="number"
                placeholder="z.B. 130"
                className="col-span-3"
                value={formData.sollfahrten}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {mode === 'add' ? 'Speichern' : 'Aktualisieren'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FahrerDialog;

