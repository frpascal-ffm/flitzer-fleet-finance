
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FilePlus } from 'lucide-react';

const AddFahrzeugDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <FilePlus className="w-4 h-4 mr-2" />
          Fahrzeug hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Neues Fahrzeug hinzufügen</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="kennzeichen" className="text-right">
              Kennzeichen
            </Label>
            <Input id="kennzeichen" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fahrzeug" className="text-right">
              Fahrzeug
            </Label>
            <Input id="fahrzeug" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="baujahr" className="text-right">
              Baujahr
            </Label>
            <Input id="baujahr" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="angemeldet" className="text-right">
              Angemeldet
            </Label>
            <Input id="angemeldet" type="date" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fixkosten" className="text-right">
              Fixkosten (€)
            </Label>
            <Input id="fixkosten" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ruecklagen" className="text-right">
              Rücklagen (€)
            </Label>
            <Input id="ruecklagen" type="number" className="col-span-3" />
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

export default AddFahrzeugDialog;
