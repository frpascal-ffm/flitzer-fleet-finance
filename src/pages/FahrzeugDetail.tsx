
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FilePlus } from 'lucide-react';

const FahrzeugDetail = () => {
  const { id } = useParams();
  
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

  // Mock data for vehicle costs
  const fahrzeugKosten = [
    {
      datum: '15.12.2024',
      beschreibung: 'Tankfüllung',
      kategorie: 'Kraftstoff',
      betrag: '85.50 €'
    },
    {
      datum: '10.12.2024',
      beschreibung: 'Ölwechsel',
      kategorie: 'Wartung',
      betrag: '120.00 €'
    },
    {
      datum: '05.12.2024',
      beschreibung: 'Reifenwechsel',
      kategorie: 'Wartung',
      betrag: '340.00 €'
    }
  ];

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Fahrzeug Details - {fahrzeug.kennzeichen}</h1>
      </div>

      {/* Vehicle Basic Data - 25% */}
      <div className="h-1/4 mb-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg">Fahrzeugdaten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Kennzeichen</Label>
                <p className="text-lg font-semibold">{fahrzeug.kennzeichen}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Fahrzeug</Label>
                <p className="text-lg">{fahrzeug.fahrzeug}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Baujahr</Label>
                <p className="text-lg">{fahrzeug.baujahr}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Mitarbeiter</Label>
                <p className="text-lg">{fahrzeug.mitarbeiter}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Fixkosten</Label>
                <p className="text-lg text-red-600 font-semibold">{fahrzeug.fixkosten}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Rücklagen</Label>
                <p className="text-lg text-blue-600 font-semibold">{fahrzeug.ruecklagen}</p>
              </div>
              <div>
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
            <Button className="bg-primary hover:bg-primary/90">
              <FilePlus className="w-4 h-4 mr-2" />
              Kosten hinzufügen
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="overflow-auto h-full">
              <table className="w-full">
                <thead className="bg-gray-50 border-b sticky top-0">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Datum</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Beschreibung</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Kategorie</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Betrag</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {fahrzeugKosten.map((kosten, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{kosten.datum}</td>
                      <td className="py-3 px-4">{kosten.beschreibung}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          kosten.kategorie === 'Kraftstoff' ? 'bg-blue-100 text-blue-800' :
                          kosten.kategorie === 'Wartung' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {kosten.kategorie}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-red-600">{kosten.betrag}</td>
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
                Gesamte Kosten: <span className="font-medium text-red-600">545.50 €</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FahrzeugDetail;
