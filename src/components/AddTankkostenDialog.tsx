import React from 'react';
import { FilePlus, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  fahrzeugId: z.string().min(1, { message: 'Bitte wählen Sie ein Fahrzeug aus' }),
  monat: z.string().min(1, { message: 'Bitte geben Sie einen Monat an' }),
  liter: z.string().min(1, { message: 'Bitte geben Sie die Literzahl an' }),
  kosten: z.string().min(1, { message: 'Bitte geben Sie die Kosten an' }),
  kilometerstand: z.string().min(1, { message: 'Bitte geben Sie den Kilometerstand an' }),
});

interface AddTankkostenDialogProps {
  mode?: 'add' | 'edit';
  defaultValues?: {
    fahrzeugId?: string;
    monat?: string;
    liter?: string;
    kosten?: string;
    kilometerstand?: string;
  };
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
  trigger?: React.ReactNode;
}

const AddTankkostenDialog: React.FC<AddTankkostenDialogProps> = ({
  mode = 'add',
  defaultValues,
  onSubmit,
  trigger,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      fahrzeugId: '',
      monat: new Date().toISOString().slice(0, 7), // Current month in YYYY-MM format
      liter: '',
      kosten: '',
      kilometerstand: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit?.(data);
    form.reset();
  };

  // Sample vehicle data (should be fetched from your data source)
  const fahrzeugData = [
    { id: '1', kennzeichen: 'HG-XA 43', fahrzeug: 'Toyota Corolla' },
    { id: '2', kennzeichen: 'HG-XC 43', fahrzeug: 'Toyota Corolla' },
    { id: '3', kennzeichen: 'HG-XD 43', fahrzeug: 'Toyota Corolla' },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="default">
            <FilePlus className="mr-2 h-4 w-4" />
            Tankkosten hinzufügen
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Tankkosten hinzufügen' : 'Tankkosten bearbeiten'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fahrzeugId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fahrzeug</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Fahrzeug auswählen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fahrzeugData.map((fahrzeug) => (
                        <SelectItem key={fahrzeug.id} value={fahrzeug.id}>
                          {fahrzeug.kennzeichen} - {fahrzeug.fahrzeug}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monat</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="liter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Liter</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kosten"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kosten (€)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kilometerstand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilometerstand</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {mode === 'add' ? 'Hinzufügen' : 'Speichern'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTankkostenDialog; 