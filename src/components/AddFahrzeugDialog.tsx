import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';

interface FahrzeugDialogProps {
  mode?: 'add' | 'edit';
  defaultValues?: {
    kennzeichen?: string;
    fahrzeug?: string;
    mitarbeiter?: string;
    fixkosten?: string;
    ruecklagen?: string;
  };
  onSubmit?: (data: any) => void;
  trigger?: React.ReactNode;
}

const AddFahrzeugDialog: React.FC<FahrzeugDialogProps> = ({ 
  mode = 'add', 
  defaultValues = {}, 
  onSubmit,
  trigger 
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      kennzeichen: defaultValues.kennzeichen || '',
      fahrzeug: defaultValues.fahrzeug || '',
      mitarbeiter: defaultValues.mitarbeiter || '',
      fixkosten: defaultValues.fixkosten || '',
      ruecklagen: defaultValues.ruecklagen || ''
    }
  });

  const onSubmitForm = (data: any) => {
    if (onSubmit) {
      onSubmit(data);
    }
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Fahrzeug hinzufügen
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Fahrzeug hinzufügen' : 'Fahrzeug bearbeiten'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Fügen Sie hier ein neues Fahrzeug hinzu.' 
              : 'Bearbeiten Sie die Fahrzeugdaten.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="kennzeichen">Kennzeichen</Label>
            <Input id="kennzeichen" {...register('kennzeichen')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fahrzeug">Fahrzeug</Label>
            <Input id="fahrzeug" {...register('fahrzeug')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mitarbeiter">Mitarbeiter</Label>
            <Input id="mitarbeiter" {...register('mitarbeiter')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fixkosten">Fixkosten</Label>
            <Input 
              id="fixkosten" 
              {...register('fixkosten')} 
              type="number" 
              step="0.01"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ruecklagen">Rücklagen</Label>
            <Input 
              id="ruecklagen" 
              {...register('ruecklagen')} 
              type="number" 
              step="0.01"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit">
              {mode === 'add' ? 'Hinzufügen' : 'Speichern'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFahrzeugDialog;
