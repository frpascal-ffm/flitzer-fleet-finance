
import React from 'react';
import { FilePlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Fahrzeuge = () => {
  const fahrzeugData = [
    {
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fahrzeuge</h1>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <FilePlus className="w-4 h-4 mr-2" />
          Fahrzeug hinzufügen
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monatliche Fixkosten</CardTitle>
            <FilePlus className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2278.55 €</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monatliche Rücklagen</CardTitle>
            <FilePlus className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342.00 €</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monatliche Gesamtkosten</CardTitle>
            <FilePlus className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2620.55 €</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input 
          placeholder="Suche nach Kennzeichen, Marke oder Modell..." 
          className="max-w-md"
        />
      </div>

      {/* Fahrzeuge Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Kennzeichen</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Fahrzeug</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Baujahr</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Angemeldet</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Mitarbeiter</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Fixkosten</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Rücklagen</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Gesamt</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {fahrzeugData.map((fahrzeug, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                    </td>
                    <td className="py-3 px-4 font-medium">{fahrzeug.kennzeichen}</td>
                    <td className="py-3 px-4">{fahrzeug.fahrzeug}</td>
                    <td className="py-3 px-4">{fahrzeug.baujahr}</td>
                    <td className="py-3 px-4">{fahrzeug.angemeldet}</td>
                    <td className="py-3 px-4">{fahrzeug.mitarbeiter}</td>
                    <td className="py-3 px-4">{fahrzeug.fixkosten}</td>
                    <td className="py-3 px-4">{fahrzeug.ruecklagen}</td>
                    <td className="py-3 px-4 font-medium">{fahrzeug.gesamt}</td>
                    <td className="py-3 px-4">
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
              Summe (nur aktive Fahrzeuge): <span className="font-medium">2278.55 €</span> | <span className="font-medium">342.00 €</span> | <span className="font-medium">2620.55 €</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Fahrzeuge;
