import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilePlus } from 'lucide-react';

interface AddFahrzeugKostenDialogProps {
  mode: 'add' | 'edit';
  onSubmit: (kosten: {
    beschreibung: string;
    interval: string;
    betrag: string;
  }) => void;
  defaultValues?: {
    beschreibung: string;
    interval: string;
    betrag: string;
  };
  trigger?: React.ReactNode;
}

const AddFahrzeugKostenDialog: React.FC<AddFahrzeugKostenDialogProps> = ({ 
  mode = 'add',
  onSubmit,
  defaultValues,
  trigger 
}) => {
  const [beschreibung, setBeschreibung] = React.useState(defaultValues?.beschreibung || '');
  const [interval, setInterval] = React.useState(defaultValues?.interval || '');
  const [betrag, setBetrag] = React.useState(defaultValues?.betrag || '');
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      beschreibung,
      interval,
      betrag,
    });
    setBeschreibung('');
    setInterval('');
    setBetrag('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90">
            <FilePlus className="w-4 h-4 mr-2" />
            Kosten hinzufügen
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Neue Fahrzeugkosten hinzufügen' : 'Fahrzeugkosten bearbeiten'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="beschreibung">Beschreibung</Label>
            <Input
              id="beschreibung"
              placeholder="z.B. Versicherung"
              value={beschreibung}
              onChange={(e) => setBeschreibung(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interval">Zahlungsintervall</Label>
            <Select value={interval} onValueChange={setInterval} required>
              <SelectTrigger>
                <SelectValue placeholder="Intervall auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monatlich">Monatlich</SelectItem>
                <SelectItem value="quartalsweise">Quartalsweise</SelectItem>
                <SelectItem value="halbjährlich">Halbjährlich</SelectItem>
                <SelectItem value="jährlich">Jährlich</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="betrag">Betrag (€)</Label>
            <Input
              id="betrag"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={betrag}
              onChange={(e) => setBetrag(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Hinzufügen' : 'Speichern'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFahrzeugKostenDialog; 