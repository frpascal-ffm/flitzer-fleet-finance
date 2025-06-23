import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2 } from 'lucide-react';
import AddFahrzeugKostenDialog from '@/components/AddFahrzeugKostenDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const FahrzeugDetail = () => {
  const { id } = useParams();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [kostenToDelete, setKostenToDelete] = React.useState<{index: number, beschreibung: string} | null>(null);
  
  // Mock data for the vehicle - in real app this would come from API
  const fahrzeug = {
    kennzeichen: 'HG-XA 43',
    fahrzeug: 'Toyota Corolla',
    baujahr: '2024',
    angemeldet: '23.8.2024',
    mitarbeiter: 'Faig Mammmadzada',
    fixkosten: '771.32 €',
    ruecklagen: '114.00 €',
    gesamt: '885.32 €'
  };

  // Mock data for vehicle costs with intervals
  const [fahrzeugKosten, setFahrzeugKosten] = React.useState([
    {
      beschreibung: 'Versicherung',
      interval: 'monatlich',
      betrag: '85.50 €'
    },
    {
      beschreibung: 'Wartung',
      interval: 'halbjährlich',
      betrag: '120.00 €'
    },
    {
      beschreibung: 'KFZ-Steuer',
      interval: 'jährlich',
      betrag: '340.00 €'
    }
  ]);

  const handleAddKosten = (kosten: { beschreibung: string; interval: string; betrag: string }) => {
    const newKosten = {
      beschreibung: kosten.beschreibung,
      interval: kosten.interval,
      betrag: `${kosten.betrag} €`
    };
    setFahrzeugKosten([newKosten, ...fahrzeugKosten]);
  };

  const handleEditKosten = (kosten: { beschreibung: string; interval: string; betrag: string }, index: number) => {
    const updatedKosten = [...fahrzeugKosten];
    updatedKosten[index] = {
      ...kosten,
      betrag: kosten.betrag.includes('€') ? kosten.betrag : `${kosten.betrag} €`
    };
    setFahrzeugKosten(updatedKosten);
  };

  const handleDeleteClick = (kosten: { beschreibung: string }, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setKostenToDelete({ index, beschreibung: kosten.beschreibung });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (kostenToDelete !== null) {
      const updatedKosten = fahrzeugKosten.filter((_, index) => index !== kostenToDelete.index);
      setFahrzeugKosten(updatedKosten);
    }
    setDeleteDialogOpen(false);
    setKostenToDelete(null);
  };

  return (
    <>
      <div className="p-6 h-full flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Fahrzeug Details - {fahrzeug.kennzeichen}</h1>
        </div>

        {/* Vehicle Basic Data - 25% */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fahrzeugdaten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-600">Kennzeichen</Label>
                  <p className="text-lg font-semibold">{fahrzeug.kennzeichen}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-600">Fahrzeug</Label>
                  <p className="text-lg">{fahrzeug.fahrzeug}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-600">Baujahr</Label>
                  <p className="text-lg">{fahrzeug.baujahr}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-600">Mitarbeiter</Label>
                  <p className="text-lg">{fahrzeug.mitarbeiter}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-600">Fixkosten</Label>
                  <p className="text-lg text-red-600 font-semibold">{fahrzeug.fixkosten}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-600">Rücklagen</Label>
                  <p className="text-lg text-blue-600 font-semibold">{fahrzeug.ruecklagen}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-gray-600">Gesamt</Label>
                  <p className="text-lg text-green-600 font-semibold">{fahrzeug.gesamt}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vehicle Costs Table - 75% */}
        <div className="flex-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Fahrzeugkosten</CardTitle>
              <AddFahrzeugKostenDialog mode="add" onSubmit={handleAddKosten} />
            </CardHeader>
            <CardContent className="flex-1 p-6">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b transition-colors">
                        <th className="h-8 px-2 text-left align-middle text-sm font-medium">Beschreibung</th>
                        <th className="h-8 px-2 text-left align-middle text-sm font-medium">Intervall</th>
                        <th className="h-8 px-2 text-right align-middle text-sm font-medium">Betrag</th>
                        <th className="h-8 px-2 text-left align-middle text-sm font-medium">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fahrzeugKosten.map((kosten, index) => (
                        <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                          <td className="py-2 px-2 font-medium">{kosten.beschreibung}</td>
                          <td className="py-2 px-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              kosten.interval === 'monatlich' ? 'bg-blue-100 text-blue-800' :
                              kosten.interval === 'quartalsweise' ? 'bg-green-100 text-green-800' :
                              kosten.interval === 'halbjährlich' ? 'bg-yellow-100 text-yellow-800' :
                              kosten.interval === 'jährlich' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {kosten.interval}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-right font-medium text-red-600">{kosten.betrag}</td>
                          <td className="py-2 px-2">
                            <div className="flex items-center gap-1">
                              <AddFahrzeugKostenDialog
                                mode="edit"
                                defaultValues={{
                                  beschreibung: kosten.beschreibung,
                                  interval: kosten.interval,
                                  betrag: kosten.betrag.replace(' €', '')
                                }}
                                onSubmit={(data) => handleEditKosten(data, index)}
                                trigger={
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Pencil className="h-3 w-3" />
                                  </Button>
                                }
                              />
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 text-destructive"
                                onClick={(e) => handleDeleteClick(kosten, index, e)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-4 bg-gray-50 p-4 rounded-md border">
                <p className="text-sm text-gray-600">
                  Gesamte Kosten: <span className="font-medium text-red-600">545.50 €</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kosten löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Möchten Sie die Kosten "{kostenToDelete?.beschreibung}" wirklich löschen? 
              Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setKostenToDelete(null)}>Abbrechen</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FahrzeugDetail;
