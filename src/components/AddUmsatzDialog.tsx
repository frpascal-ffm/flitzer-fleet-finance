import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilePlus } from 'lucide-react';

const AddUmsatzDialog = () => {
  // Generate years array (current year and next 3 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear + i);
  
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setOpen(true)}>
          <FilePlus className="w-4 h-4 mr-2" />
          Umsatz hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Neuen Umsatz hinzufügen</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="mitarbeiter">
              Mitarbeiter
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Mitarbeiter wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="faig">Faig Mammmadzada</SelectItem>
                <SelectItem value="petros">Petros Tsaturian</SelectItem>
                <SelectItem value="ruslan">Ruslan Gasimov</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jahr">
                Jahr
              </Label>
              <Select defaultValue={currentYear.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder="Jahr wählen" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="kalenderwoche">
                Kalenderwoche
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="KW wählen" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 53 }, (_, i) => i + 1).map((week) => (
                    <SelectItem key={week} value={week.toString()}>
                      KW {week}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nettoFahrpreis">
                Netto-Fahrpreis (€)
              </Label>
              <Input id="nettoFahrpreis" type="number" placeholder="0,00" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="aktionen">
                Aktionen (€)
              </Label>
              <Input id="aktionen" type="number" placeholder="0,00" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trinkgeld">
                Trinkgeld (€)
              </Label>
              <Input id="trinkgeld" type="number" placeholder="0,00" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bargeld">
                Bargeld (€)
              </Label>
              <Input id="bargeld" type="number" placeholder="0,00" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fahrten">
                Fahrten
              </Label>
              <Input id="fahrten" type="number" placeholder="0" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="waschen">
                Waschen (€)
              </Label>
              <Input id="waschen" type="number" placeholder="0,00" />
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
          <Button>Speichern</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUmsatzDialog;
