import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';

interface AddAllgemeineKostenDialogProps {
  mode: 'add' | 'edit';
  onSubmit: (data: any) => void;
  defaultValues?: {
    bezeichnung: string;
    betrag: string;
    datum: string;
    notiz?: string;
    interval: string;
  };
  trigger?: React.ReactNode;
}

const AddAllgemeineKostenDialog: React.FC<AddAllgemeineKostenDialogProps> = ({
  mode = 'add',
  onSubmit,
  defaultValues,
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(defaultValues || {
    bezeichnung: '',
    betrag: '',
    datum: new Date().toISOString().split('T')[0],
    notiz: '',
    interval: 'monatlich',
  });

  const intervals = [
    { value: 'monatlich', label: 'Monatlich' },
    { value: 'quartalsweise', label: 'Quartalsweise' },
    { value: 'halbjährlich', label: 'Halbjährlich' },
    { value: 'jährlich', label: 'Jährlich' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
    if (mode === 'add') {
      setFormData({
        bezeichnung: '',
        betrag: '',
        datum: new Date().toISOString().split('T')[0],
        notiz: '',
        interval: 'monatlich',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Neue Kosten
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Neue Kosten hinzufügen' : 'Kosten bearbeiten'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bezeichnung">Bezeichnung</Label>
            <Input
              id="bezeichnung"
              value={formData.bezeichnung}
              onChange={(e) =>
                setFormData({ ...formData, bezeichnung: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interval">Intervall</Label>
            <Select
              value={formData.interval}
              onValueChange={(value) =>
                setFormData({ ...formData, interval: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Intervall wählen" />
              </SelectTrigger>
              <SelectContent>
                {intervals.map((interval) => (
                  <SelectItem key={interval.value} value={interval.value}>
                    {interval.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="betrag">Betrag (€)</Label>
            <Input
              id="betrag"
              type="number"
              step="0.01"
              value={formData.betrag}
              onChange={(e) =>
                setFormData({ ...formData, betrag: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="datum">Datum</Label>
            <Input
              id="datum"
              type="date"
              value={formData.datum}
              onChange={(e) =>
                setFormData({ ...formData, datum: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notiz">Notiz</Label>
            <Input
              id="notiz"
              value={formData.notiz}
              onChange={(e) =>
                setFormData({ ...formData, notiz: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
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

export default AddAllgemeineKostenDialog; 