import React from 'react';
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
import { PiggyBank } from 'lucide-react';

const formSchema = z.object({
  beschreibung: z.string().min(1, 'Beschreibung ist erforderlich'),
  interval: z.string().min(1, 'Interval ist erforderlich'),
  betrag: z.string().min(1, 'Betrag ist erforderlich'),
});

interface AddRuecklagenDialogProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  mode?: 'add' | 'edit';
  defaultValues?: {
    beschreibung: string;
    interval: string;
    betrag: string;
  };
  trigger?: React.ReactNode;
}

const AddRuecklagenDialog: React.FC<AddRuecklagenDialogProps> = ({
  onSubmit,
  mode = 'add',
  defaultValues,
  trigger,
}) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      beschreibung: '',
      interval: '',
      betrag: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <PiggyBank className="mr-2 h-4 w-4" />
            Rücklagen hinzufügen
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Rücklagen hinzufügen' : 'Rücklagen bearbeiten'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="beschreibung"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beschreibung</FormLabel>
                  <FormControl>
                    <Input placeholder="Beschreibung eingeben" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interval"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interval</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Interval auswählen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="monatlich">Monatlich</SelectItem>
                      <SelectItem value="quartalsweise">Quartalsweise</SelectItem>
                      <SelectItem value="halbjährlich">Halbjährlich</SelectItem>
                      <SelectItem value="jährlich">Jährlich</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="betrag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Betrag</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Abbrechen
              </Button>
              <Button type="submit">
                {mode === 'add' ? 'Hinzufügen' : 'Speichern'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRuecklagenDialog; 