import React, { useState } from 'react';
import { FilePlus, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddTankkostenDialog from '@/components/AddTankkostenDialog';
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

const Tankkosten = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [kostenToDelete, setKostenToDelete] = useState<any>(null);

  // Using the same vehicle data from Fahrzeuge.tsx
  const fahrzeugData = [
    {
      id: 1,
      kennzeichen: 'HG-XA 43',
      fahrzeug: 'Toyota Corolla',
      mitarbeiter: 'Faig Mammmadzada',
    },
    {
      id: 2,
      kennzeichen: 'HG-XC 43',
      fahrzeug: 'Toyota Corolla',
      mitarbeiter: 'Petros Tsaturian',
    },
    {
      id: 3,
      kennzeichen: 'HG-XD 43',
      fahrzeug: 'Toyota Corolla',
      mitarbeiter: 'Ruslan Gasimov',
    }
  ];

  // Sample gas cost data
  const tankkostenData = [
    {
      id: 1,
      fahrzeugId: 1,
      monat: '2024-03',
      liter: 120.5,
      kosten: 220.30,
      kilometerstand: 45678
    },
    {
      id: 2,
      fahrzeugId: 2,
      monat: '2024-03',
      liter: 115.2,
      kosten: 210.15,
      kilometerstand: 32456
    },
    {
      id: 3,
      fahrzeugId: 3,
      monat: '2024-03',
      liter: 118.8,
      kosten: 215.45,
      kilometerstand: 28934
    }
  ];

  const handleDeleteClick = (kosten: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setKostenToDelete(kosten);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (kostenToDelete) {
      console.log('Deleting gas cost entry:', kostenToDelete);
      // Here you would typically make an API call to delete the entry
    }
    setDeleteDialogOpen(false);
    setKostenToDelete(null);
  };

  const filteredTankkostenData = tankkostenData.filter(kosten => {
    const fahrzeug = fahrzeugData.find(f => f.id === kosten.fahrzeugId);
    return fahrzeug?.kennzeichen.toLowerCase().includes(searchTerm.toLowerCase()) ||
           fahrzeug?.fahrzeug.toLowerCase().includes(searchTerm.toLowerCase()) ||
           fahrzeug?.mitarbeiter.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalKosten = filteredTankkostenData.reduce((sum, kosten) => sum + kosten.kosten, 0);
  const totalLiter = filteredTankkostenData.reduce((sum, kosten) => sum + kosten.liter, 0);
  const averageKostenProLiter = totalKosten / totalLiter;

  const handleAddTankkosten = (data: any) => {
    console.log('Adding new gas cost entry:', data);
    // Here you would typically make an API call to add the entry
  };

  const handleEditTankkosten = (data: any) => {
    console.log('Updating gas cost entry:', data);
    // Here you would typically make an API call to update the entry
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tankkosten</h1>
        </div>
        <AddTankkostenDialog onSubmit={handleAddTankkosten} />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Gesamtkosten (Monat)</CardTitle>
            <FilePlus className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalKosten.toFixed(2)} €</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Gesamtliter (Monat)</CardTitle>
            <FilePlus className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLiter.toFixed(1)} L</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Durchschnittspreis/Liter</CardTitle>
            <FilePlus className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageKostenProLiter.toFixed(2)} €/L</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input 
          placeholder="Suche nach Kennzeichen, Fahrzeug oder Mitarbeiter..." 
          className="max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tankkosten Table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b transition-colors">
                <th className="h-8 px-2 text-left align-middle text-sm font-medium">Monat</th>
                <th className="h-8 px-2 text-left align-middle text-sm font-medium">Kennzeichen</th>
                <th className="h-8 px-2 text-left align-middle text-sm font-medium">Fahrzeug</th>
                <th className="h-8 px-2 text-left align-middle text-sm font-medium">Mitarbeiter</th>
                <th className="h-8 px-2 text-right align-middle text-sm font-medium">Liter</th>
                <th className="h-8 px-2 text-right align-middle text-sm font-medium">Kosten</th>
                <th className="h-8 px-2 text-right align-middle text-sm font-medium">Kilometerstand</th>
                <th className="h-8 px-2 text-left align-middle text-sm font-medium">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredTankkostenData.map((kosten) => {
                const fahrzeug = fahrzeugData.find(f => f.id === kosten.fahrzeugId);
                return (
                  <tr 
                    key={kosten.id} 
                    className="border-b transition-colors hover:bg-muted/50 text-sm"
                  >
                    <td className="py-2 px-2">{kosten.monat}</td>
                    <td className="py-2 px-2 font-medium">{fahrzeug?.kennzeichen}</td>
                    <td className="py-2 px-2">{fahrzeug?.fahrzeug}</td>
                    <td className="py-2 px-2">{fahrzeug?.mitarbeiter}</td>
                    <td className="py-2 px-2 text-right">{kosten.liter.toFixed(1)} L</td>
                    <td className="py-2 px-2 text-right">{kosten.kosten.toFixed(2)} €</td>
                    <td className="py-2 px-2 text-right">{kosten.kilometerstand} km</td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-1">
                        <AddTankkostenDialog
                          mode="edit"
                          defaultValues={{
                            fahrzeugId: kosten.fahrzeugId.toString(),
                            monat: kosten.monat,
                            liter: kosten.liter.toString(),
                            kosten: kosten.kosten.toString(),
                            kilometerstand: kosten.kilometerstand.toString()
                          }}
                          onSubmit={handleEditTankkosten}
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
                          onClick={(e) => handleDeleteClick(kosten, e)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-muted border-t">
          <p className="text-sm text-muted-foreground">
            Summe: <span className="font-medium">{totalLiter.toFixed(1)} L</span> | <span className="font-medium">{totalKosten.toFixed(2)} €</span> | Durchschnitt: <span className="font-medium">{averageKostenProLiter.toFixed(2)} €/L</span>
          </p>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tankkosten löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Möchten Sie diesen Tankkosten-Eintrag wirklich löschen? 
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
    </div>
  );
};

export default Tankkosten; 