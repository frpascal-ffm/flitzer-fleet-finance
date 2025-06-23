import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FahrerDialog from '@/components/AddFahrerDialog';
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

const Fahrer = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fahrerToDelete, setFahrerToDelete] = useState<any>(null);

  const fahrerData = [
    {
      id: 1,
      name: 'Petros Tsaturian',
      email: 'petros@example.com',
      status: 'aktiv',
      provision: '40%',
      nettoGehalt: '11.00 €',
      sollfahrten: 130
    },
    {
      id: 2,
      name: 'Faig Mammmadzada',
      email: 'faig@example.com',
      status: 'aktiv',
      provision: '42%',
      nettoGehalt: '0.00 €',
      sollfahrten: 130
    },
    {
      id: 4,
      name: 'Ruslan Gasimov',
      email: 'ruslan@example.com',
      status: 'aktiv',
      provision: '42%',
      nettoGehalt: '0.00 €',
      sollfahrten: 130
    }
  ];

  const handleRowClick = (fahrerId: number) => {
    navigate(`/fahrer/${fahrerId}`);
  };

  const handleAddFahrer = (data: any) => {
    console.log('Adding new driver:', data);
    // Here you would typically make an API call to add the driver
  };

  const handleEditFahrer = (data: any) => {
    console.log('Updating driver:', data);
    // Here you would typically make an API call to update the driver
  };

  const handleDeleteClick = (fahrer: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setFahrerToDelete(fahrer);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (fahrerToDelete) {
      console.log('Deleting driver:', fahrerToDelete);
      // Here you would typically make an API call to delete the driver
    }
    setDeleteDialogOpen(false);
    setFahrerToDelete(null);
  };

  const filteredFahrerData = fahrerData.filter(fahrer => 
    fahrer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fahrer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalNettoGehalt = filteredFahrerData.reduce((sum, fahrer) => {
    const gehalt = parseFloat(fahrer.nettoGehalt.replace('€', '').trim());
    return sum + gehalt;
  }, 0);

  const averageProvision = filteredFahrerData.reduce((sum, fahrer) => {
    const provision = parseFloat(fahrer.provision.replace('%', ''));
    return sum + provision;
  }, 0) / filteredFahrerData.length;

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fahrer</h1>
          </div>
          <FahrerDialog mode="add" onSubmit={handleAddFahrer} />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Aktive Fahrer</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredFahrerData.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Durchschnitt Provision</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageProvision.toFixed(1)}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Gesamtes Netto-Gehalt</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalNettoGehalt.toFixed(2)} €</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input 
            placeholder="Nach Name oder E-Mail suchen..." 
            className="max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Fahrer Table */}
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b transition-colors">
                  <th className="h-8 px-2 text-left align-middle text-sm font-medium">Status</th>
                  <th className="h-8 px-2 text-left align-middle text-sm font-medium">Name</th>
                  <th className="h-8 px-2 text-left align-middle text-sm font-medium">E-Mail</th>
                  <th className="h-8 px-2 text-left align-middle text-sm font-medium">Provision</th>
                  <th className="h-8 px-2 text-right align-middle text-sm font-medium">Netto-Gehalt</th>
                  <th className="h-8 px-2 text-right align-middle text-sm font-medium">Sollfahrten</th>
                  <th className="h-8 px-2 text-left align-middle text-sm font-medium">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredFahrerData.map((fahrer) => (
                  <tr 
                    key={fahrer.id} 
                    className="border-b transition-colors hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleRowClick(fahrer.id)}
                  >
                    <td className="py-2 px-2">
                      <div className="flex h-2 w-2 rounded-full bg-green-500"></div>
                    </td>
                    <td className="py-2 px-2 font-medium">{fahrer.name}</td>
                    <td className="py-2 px-2 text-muted-foreground">{fahrer.email}</td>
                    <td className="py-2 px-2">{fahrer.provision}</td>
                    <td className="py-2 px-2 text-right">{fahrer.nettoGehalt}</td>
                    <td className="py-2 px-2 text-right">{fahrer.sollfahrten}</td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <FahrerDialog
                          mode="edit"
                          defaultValues={{
                            name: fahrer.name,
                            email: fahrer.email,
                            provision: fahrer.provision,
                            sollfahrten: fahrer.sollfahrten
                          }}
                          onSubmit={handleEditFahrer}
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
                          onClick={(e) => handleDeleteClick(fahrer, e)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRowClick(fahrer.id)}>
                          <ExternalLink className="h-3 w-3" />
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
            <AlertDialogTitle>Fahrer löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Möchten Sie den Fahrer "{fahrerToDelete?.name}" wirklich löschen? 
              Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setFahrerToDelete(null)}>Abbrechen</AlertDialogCancel>
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

export default Fahrer;
