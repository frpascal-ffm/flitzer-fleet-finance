
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilePlus } from 'lucide-react';

const AddUmsatzDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <FilePlus className="w-4 h-4 mr-2" />
          Umsatz hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Neuen Umsatz hinzufügen</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mitarbeiter" className="text-right">
              Mitarbeiter
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Mitarbeiter wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="faig">Faig Mammmadzada</SelectItem>
                <SelectItem value="petros">Petros Tsaturian</SelectItem>
                <SelectItem value="ruslan">Ruslan Gasimov</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nettoFahrpreis" className="text-right">
              Netto-Fahrpreis (€)
            </Label>
            <Input id="nettoFahrpreis" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="aktionen" className="text-right">
              Aktionen (€)
            </Label>
            <Input id="aktionen" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="trinkgeld" className="text-right">
              Trinkgeld (€)
            </Label>
            <Input id="trinkgeld" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bargeld" className="text-right">
              Bargeld (€)
            </Label>
            <Input id="bargeld" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fahrten" className="text-right">
              Fahrten
            </Label>
            <Input id="fahrten" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="waschen" className="text-right">
              Waschen (€)
            </Label>
            <Input id="waschen" type="number" className="col-span-3" />
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

export default AddUmsatzDialog;
