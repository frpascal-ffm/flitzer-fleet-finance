
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FilePlus } from 'lucide-react';

const AddMitarbeiterDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <FilePlus className="w-4 h-4 mr-2" />
          Mitarbeiter hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Neuen Mitarbeiter hinzufügen</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              E-Mail
            </Label>
            <Input id="email" type="email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="provision" className="text-right">
              Provision (%)
            </Label>
            <Input id="provision" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nettoGehalt" className="text-right">
              Netto-Gehalt (€)
            </Label>
            <Input id="nettoGehalt" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sollfahrten" className="text-right">
              Sollfahrten
            </Label>
            <Input id="sollfahrten" type="number" className="col-span-3" />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline">Abbrechen</Button>
          <Button>Speichern</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMitarbeiterDialog;
