
import React from 'react';
import { FilePlus, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Umsaetze = () => {
  const umsatzData = [
    {
      mitarbeiter: 'Faig Mammmadzada',
      kw: '20866.84 €',
      nettoFahrpreis: '17275.70 €',
      provision: '3070.00 €',
      aktionen: '11.76 €',
      trinkgeld: '411.14 €',
      bargeld: '6330.70 €',
      fahrten: 1407,
      waschen: '140.00 €'
    },
    {
      mitarbeiter: 'Petros Tsaturian',
      kw: '26493.97 €',
      nettoFahrpreis: '23008.00 €',
      provision: '2920.00 €',
      aktionen: '11.76 €',
      trinkgeld: '565.97 €',
      bargeld: '7817.01 €',
      fahrten: 1634,
      waschen: '150.00 €'
    },
    {
      mitarbeiter: 'Ruslan Gasimov',
      kw: '25679.83 €',
      nettoFahrpreis: '20874.12 €',
      provision: '4200.00 €',
      aktionen: '42.00 €',
      trinkgeld: '605.71 €',
      bargeld: '5459.50 €',
      fahrten: 1730,
      waschen: '150.00 €'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Umsätze</h1>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <FilePlus className="w-4 h-4 mr-2" />
          Umsatz hinzufügen
        </Button>
      </div>

      {/* Filter Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">Jahr</label>
              <Select defaultValue="2025">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">Kalenderwoche</label>
              <Select defaultValue="alle">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alle">Alle</SelectItem>
                  <SelectItem value="kw24">KW 24</SelectItem>
                  <SelectItem value="kw23">KW 23</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">Mitarbeiter</label>
              <Select defaultValue="alle">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alle">Alle Mitarbeiter</SelectItem>
                  <SelectItem value="faig">Faig Mammmadzada</SelectItem>
                  <SelectItem value="petros">Petros Tsaturian</SelectItem>
                  <SelectItem value="ruslan">Ruslan Gasimov</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Umsätze Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Mitarbeiter</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">KW</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Netto-Fahrpreis</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Aktionen</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Rückerstattungen</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Trinkgeld</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Bargeld</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Fahrten</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Waschen</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {umsatzData.map((umsatz, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <ArrowUp className="w-3 h-3 text-gray-400 mr-2" />
                        <span className="font-medium">{umsatz.mitarbeiter}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{umsatz.kw}</td>
                    <td className="py-3 px-4">{umsatz.nettoFahrpreis}</td>
                    <td className="py-3 px-4">{umsatz.aktionen}</td>
                    <td className="py-3 px-4">{umsatz.provision}</td>
                    <td className="py-3 px-4">{umsatz.trinkgeld}</td>
                    <td className="py-3 px-4">{umsatz.bargeld}</td>
                    <td className="py-3 px-4">{umsatz.fahrten}</td>
                    <td className="py-3 px-4">{umsatz.waschen}</td>
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
              Gesamt: <span className="font-medium">73040.64 €</span> | <span className="font-medium">61157.82 €</span> | <span className="font-medium">10190.00 €</span> | <span className="font-medium">65.52 €</span> | <span className="font-medium">1612.82 €</span> | <span className="font-medium">19607.21 €</span> | <span className="font-medium">4771</span> | <span className="font-medium">440.00 €</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Umsaetze;
