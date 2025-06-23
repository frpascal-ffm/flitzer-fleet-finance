
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddMitarbeiterDialog from '@/components/AddMitarbeiterDialog';

const Mitarbeiter = () => {
  const navigate = useNavigate();

  const mitarbeiterData = [
    {
      id: 1,
      name: 'Petros Tsaturian',
      status: 'aktiv',
      provision: '40%',
      nettoGehalt: '11.00 €',
      sollfahrten: 130
    },
    {
      id: 2,
      name: 'Faig Mammmadzada',
      status: 'aktiv',
      provision: '42%',
      nettoGehalt: '0.00 €',
      sollfahrten: 130
    },
    {
      id: 3,
      name: 'Pascal Richter',
      status: 'aktiv',
      provision: '40%',
      nettoGehalt: '123131.00 €',
      sollfahrten: 0
    },
    {
      id: 4,
      name: 'Ruslan Gasimov',
      status: 'aktiv',
      provision: '42%',
      nettoGehalt: '0.00 €',
      sollfahrten: 130
    }
  ];

  const handleRowClick = (mitarbeiterId: number) => {
    navigate(`/mitarbeiter/${mitarbeiterId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mitarbeiter</h1>
        </div>
        <AddMitarbeiterDialog />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Aktive Mitarbeiter</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Durchschnitt Provision</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">41.0%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Gesamtes Netto-Gehalt</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">123142.00 €</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input 
          placeholder="Nach Name oder E-Mail suchen..." 
          className="max-w-md"
        />
      </div>

      {/* Mitarbeiter Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">E-Mail</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Provision</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Netto-Gehalt</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Sollfahrten</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {mitarbeiterData.map((mitarbeiter) => (
                  <tr 
                    key={mitarbeiter.id} 
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(mitarbeiter.id)}
                  >
                    <td className="py-3 px-4">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                    </td>
                    <td className="py-3 px-4 font-medium">{mitarbeiter.name}</td>
                    <td className="py-3 px-4 text-gray-600">-</td>
                    <td className="py-3 px-4">{mitarbeiter.provision}</td>
                    <td className="py-3 px-4">{mitarbeiter.nettoGehalt}</td>
                    <td className="py-3 px-4">{mitarbeiter.sollfahrten}</td>
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Bearbeiten</Button>
                        <Button variant="destructive" size="sm">Löschen</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t">
            <p className="text-sm text-gray-600">
              Summe (nur aktive Mitarbeiter): <span className="font-medium">123142.00 €</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Mitarbeiter;
