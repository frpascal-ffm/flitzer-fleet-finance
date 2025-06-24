import React, { useState } from 'react';
import { Euro, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddAllgemeineKostenDialog from '@/components/AddAllgemeineKostenDialog';
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

const AllgemeineKosten = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [kostenToDelete, setKostenToDelete] = useState<any>(null);

  // Example data - replace with actual data from your backend
  const [kostenData, setKostenData] = useState([
    {
      id: 1,
      bezeichnung: 'Büromaterial',
      betrag: '150.00',
      datum: '2024-03-15',
      notiz: 'Drucker Papier, Stifte',
      interval: 'monatlich'
    },
    {
      id: 2,
      bezeichnung: 'Versicherung',
      betrag: '450.00',
      datum: '2024-03-01',
      notiz: 'Monatliche Versicherung',
      interval: 'quartalsweise'
    },
    {
      id: 3,
      bezeichnung: 'Software Lizenzen',
      betrag: '299.99',
      datum: '2024-03-10',
      notiz: 'Jahresabonnement',
      interval: 'jährlich'
    }
  ]);

  const handleAddKosten = (data: any) => {
    const newKosten = {
      id: kostenData.length + 1,
      ...data,
      betrag: data.betrag.includes('€') ? data.betrag : `${data.betrag} €`
    };
    setKostenData([newKosten, ...kostenData]);
  };

  const handleEditKosten = (data: any, id: number) => {
    const updatedKosten = kostenData.map(kosten => 
      kosten.id === id ? {
        ...kosten,
        ...data,
        betrag: data.betrag.includes('€') ? data.betrag : `${data.betrag} €`
      } : kosten
    );
    setKostenData(updatedKosten);
  };

  const handleDeleteClick = (kosten: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setKostenToDelete(kosten);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (kostenToDelete) {
      const updatedKosten = kostenData.filter(kosten => kosten.id !== kostenToDelete.id);
      setKostenData(updatedKosten);
    }
    setDeleteDialogOpen(false);
    setKostenToDelete(null);
  };

  const filteredKostenData = kostenData.filter(kosten => 
    kosten.bezeichnung.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kosten.notiz?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalKosten = filteredKostenData.reduce((sum, kosten) => {
    const betrag = parseFloat(kosten.betrag.replace('€', '').trim());
    // Adjust the monthly total based on interval
    switch (kosten.interval) {
      case 'monatlich':
        return sum + betrag;
      case 'quartalsweise':
        return sum + (betrag / 3);
      case 'halbjährlich':
        return sum + (betrag / 6);
      case 'jährlich':
        return sum + (betrag / 12);
      default:
        return sum + betrag;
    }
  }, 0);

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Allgemeine Kosten</h1>
          </div>
          <AddAllgemeineKostenDialog mode="add" onSubmit={handleAddKosten} />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Anzahl Kosten</CardTitle>
              <Euro className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredKostenData.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monatliche Gesamtkosten</CardTitle>
              <Euro className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalKosten.toFixed(2)} €</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input 
            placeholder="Nach Bezeichnung oder Notiz suchen..." 
            className="max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Kosten Table */}
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b transition-colors">
                  <th className="h-8 px-2 text-left align-middle text-sm font-medium">Bezeichnung</th>
                  <th className="h-8 px-2 text-left align-middle text-sm font-medium">Intervall</th>
                  <th className="h-8 px-2 text-left align-middle text-sm font-medium">Datum</th>
                  <th className="h-8 px-2 text-right align-middle text-sm font-medium">Betrag</th>
                  <th className="h-8 px-2 text-left align-middle text-sm font-medium">Notiz</th>
                  <th className="h-8 px-2 text-left align-middle text-sm font-medium">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredKostenData.map((kosten) => (
                  <tr 
                    key={kosten.id} 
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="py-2 px-2 font-medium">{kosten.bezeichnung}</td>
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
                    <td className="py-2 px-2">{new Date(kosten.datum).toLocaleDateString('de-DE')}</td>
                    <td className="py-2 px-2 text-right font-medium text-red-600">{kosten.betrag}</td>
                    <td className="py-2 px-2 text-muted-foreground">{kosten.notiz}</td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-1">
                        <AddAllgemeineKostenDialog
                          mode="edit"
                          defaultValues={{
                            bezeichnung: kosten.bezeichnung,
                            betrag: kosten.betrag.replace(' €', ''),
                            datum: kosten.datum,
                            notiz: kosten.notiz,
                            interval: kosten.interval
                          }}
                          onSubmit={(data) => handleEditKosten(data, kosten.id)}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kosten löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Möchten Sie die Kosten "{kostenToDelete?.bezeichnung}" wirklich löschen? 
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

export default AllgemeineKosten; 