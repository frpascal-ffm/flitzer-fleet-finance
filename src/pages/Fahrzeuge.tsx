import React, { useState } from 'react';
import { FilePlus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddFahrzeugDialog from '@/components/AddFahrzeugDialog';

const Fahrzeuge = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const fahrzeugData = [
    {
      id: 1,
      kennzeichen: 'HG-XA 43',
      fahrzeug: 'Toyota Corolla',
      baujahr: '2024',
      angemeldet: '23.8.2024',
      mitarbeiter: 'Faig Mammmadzada',
      fixkosten: '771.32 €',
      ruecklagen: '114.00 €',
      gesamt: '885.32 €'
    },
    {
      id: 2,
      kennzeichen: 'HG-XC 43',
      fahrzeug: 'Toyota Corolla',
      baujahr: '2024',
      angemeldet: '23.8.2024',
      mitarbeiter: 'Petros Tsaturian',
      fixkosten: '771.32 €',
      ruecklagen: '114.00 €',
      gesamt: '885.32 €'
    },
    {
      id: 3,
      kennzeichen: 'HG-XD 43',
      fahrzeug: 'Toyota Corolla',
      baujahr: '2024',
      angemeldet: '23.8.2024',
      mitarbeiter: 'Ruslan Gasimov',
      fixkosten: '735.91 €',
      ruecklagen: '114.00 €',
      gesamt: '849.91 €'
    }
  ];

  const filteredFahrzeugData = fahrzeugData.filter(fahrzeug => 
    fahrzeug.kennzeichen.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fahrzeug.fahrzeug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fahrzeug.mitarbeiter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFixkosten = filteredFahrzeugData.reduce((sum, fahrzeug) => {
    const kosten = parseFloat(fahrzeug.fixkosten.replace('€', '').trim());
    return sum + kosten;
  }, 0);

  const totalRuecklagen = filteredFahrzeugData.reduce((sum, fahrzeug) => {
    const ruecklagen = parseFloat(fahrzeug.ruecklagen.replace('€', '').trim());
    return sum + ruecklagen;
  }, 0);

  const totalGesamt = totalFixkosten + totalRuecklagen;

  const handleRowClick = (fahrzeugId: number) => {
    navigate(`/fahrzeuge/${fahrzeugId}`);
  };

  const handleEditFahrzeug = (data: any) => {
    console.log('Updating vehicle:', data);
    // Here you would typically make an API call to update the vehicle
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fahrzeuge</h1>
        </div>
        <AddFahrzeugDialog />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monatliche Fixkosten</CardTitle>
            <FilePlus className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFixkosten.toFixed(2)} €</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monatliche Rücklagen</CardTitle>
            <FilePlus className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRuecklagen.toFixed(2)} €</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monatliche Gesamtkosten</CardTitle>
            <FilePlus className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGesamt.toFixed(2)} €</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input 
          placeholder="Suche nach Kennzeichen, Marke oder Modell..." 
          className="max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Fahrzeuge Table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b transition-colors">
                <th className="h-8 px-2 text-left align-middle text-sm font-medium">Status</th>
                <th className="h-8 px-2 text-left align-middle text-sm font-medium">Kennzeichen</th>
                <th className="h-8 px-2 text-left align-middle text-sm font-medium">Fahrzeug</th>
                <th className="h-8 px-2 text-left align-middle text-sm font-medium">Mitarbeiter</th>
                <th className="h-8 px-2 text-left align-middle text-sm font-medium">Fixkosten</th>
                <th className="h-8 px-2 text-left align-middle text-sm font-medium">Gesamt</th>
                <th className="h-8 px-2 text-left align-middle text-sm font-medium">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredFahrzeugData.map((fahrzeug) => (
                <tr 
                  key={fahrzeug.id} 
                  className="border-b transition-colors hover:bg-muted/50 cursor-pointer text-sm"
                  onClick={() => handleRowClick(fahrzeug.id)}
                >
                  <td className="py-2 px-2">
                    <div className="flex h-2 w-2 rounded-full bg-green-500"></div>
                  </td>
                  <td className="py-2 px-2 font-medium">{fahrzeug.kennzeichen}</td>
                  <td className="py-2 px-2">{fahrzeug.fahrzeug}</td>
                  <td className="py-2 px-2">{fahrzeug.mitarbeiter}</td>
                  <td className="py-2 px-2">{fahrzeug.fixkosten}</td>
                  <td className="py-2 px-2 font-medium">{fahrzeug.gesamt}</td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <AddFahrzeugDialog
                        mode="edit"
                        defaultValues={{
                          kennzeichen: fahrzeug.kennzeichen,
                          fahrzeug: fahrzeug.fahrzeug,
                          mitarbeiter: fahrzeug.mitarbeiter,
                          fixkosten: fahrzeug.fixkosten.replace(' €', ''),
                          ruecklagen: fahrzeug.ruecklagen.replace(' €', '')
                        }}
                        onSubmit={handleEditFahrzeug}
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
        <div className="px-4 py-3 bg-muted border-t">
          <p className="text-sm text-muted-foreground">
            Summe (nur aktive Fahrzeuge): <span className="font-medium">{totalFixkosten.toFixed(2)} €</span> | <span className="font-medium">{totalRuecklagen.toFixed(2)} €</span> | <span className="font-medium">{totalGesamt.toFixed(2)} €</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Fahrzeuge;
