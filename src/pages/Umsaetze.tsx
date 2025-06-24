import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AddUmsatzDialog from '@/components/AddUmsatzDialog';
import UploadUmsatzDialog from '@/components/UploadUmsatzDialog';

// Types for our data structure
interface Umsatz {
  kw: string;
  gesamtumsatz: string;
  nettoFahrpreis: string;
  aktionen: string;
  rueckerstattungen: string;
  trinkgeld: string;
  bargeld: string;
  fahrten: number;
  waschen: string;
}

interface UmsatzByKW {
  kw: string;
  umsaetze: Umsatz[];
  isExpanded: boolean;
}

interface FahrerUmsaetze {
  mitarbeiter: string;
  umsaetzeByKW: UmsatzByKW[];
  isExpanded: boolean;
}

// Helper function to format numbers in German style
const formatNumber = (value: string | number): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
  return numericValue.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Helper function to calculate summary for a driver
const calculateDriverSummary = (umsaetzeByKW: any[]) => {
  return umsaetzeByKW.reduce((acc, kw) => {
    const umsatz = kw.umsaetze[0];
    acc.gesamtumsatz += parseFloat(umsatz.gesamtumsatz);
    acc.nettoFahrpreis += parseFloat(umsatz.nettoFahrpreis);
    acc.rueckerstattungen += parseFloat(umsatz.rueckerstattungen);
    acc.aktionen += parseFloat(umsatz.aktionen);
    acc.trinkgeld += parseFloat(umsatz.trinkgeld);
    acc.bargeld += parseFloat(umsatz.bargeld);
    acc.fahrten += umsatz.fahrten;
    acc.waschen += parseFloat(umsatz.waschen);
    return acc;
  }, {
    gesamtumsatz: 0,
    nettoFahrpreis: 0,
    rueckerstattungen: 0,
    aktionen: 0,
    trinkgeld: 0,
    bargeld: 0,
    fahrten: 0,
    waschen: 0
  });
};

const Umsaetze = () => {
  // Sample data restructured for the expandable view
  const [umsatzData, setUmsatzData] = useState<FahrerUmsaetze[]>([
    {
      mitarbeiter: 'Faig Mammmadzada',
      isExpanded: false,
      umsaetzeByKW: [
        {
          kw: 'KW 23',
          isExpanded: false,
          umsaetze: [{
            kw: 'KW 23',
            gesamtumsatz: '20866.84 €',
            nettoFahrpreis: '17275.70 €',
            rueckerstattungen: '3070.00 €',
            aktionen: '11.76 €',
            trinkgeld: '411.14 €',
            bargeld: '6330.70 €',
            fahrten: 1407,
            waschen: '140.00 €'
          }]
        },
        {
          kw: 'KW 24',
          isExpanded: false,
          umsaetze: [{
            kw: 'KW 24',
            gesamtumsatz: '21500.50 €',
            nettoFahrpreis: '18100.30 €',
            rueckerstattungen: '2900.00 €',
            aktionen: '15.20 €',
            trinkgeld: '485.00 €',
            bargeld: '6800.20 €',
            fahrten: 1450,
            waschen: '160.00 €'
          }]
        },
        {
          kw: 'KW 25',
          isExpanded: false,
          umsaetze: [{
            kw: 'KW 25',
            gesamtumsatz: '22100.75 €',
            nettoFahrpreis: '18500.45 €',
            rueckerstattungen: '3100.00 €',
            aktionen: '12.30 €',
            trinkgeld: '488.00 €',
            bargeld: '7000.30 €',
            fahrten: 1480,
            waschen: '150.00 €'
          }]
        }
      ]
    },
    {
      mitarbeiter: 'Petros Tsaturian',
      isExpanded: false,
      umsaetzeByKW: [
        {
          kw: 'KW 23',
          isExpanded: false,
          umsaetze: [{
            kw: 'KW 23',
            gesamtumsatz: '26493.97 €',
            nettoFahrpreis: '23008.00 €',
            rueckerstattungen: '2920.00 €',
            aktionen: '11.76 €',
            trinkgeld: '565.97 €',
            bargeld: '7817.01 €',
            fahrten: 1634,
            waschen: '150.00 €'
          }]
        },
        {
          kw: 'KW 24',
          isExpanded: false,
          umsaetze: [{
            kw: 'KW 24',
            gesamtumsatz: '25800.60 €',
            nettoFahrpreis: '22100.40 €',
            rueckerstattungen: '3100.00 €',
            aktionen: '13.20 €',
            trinkgeld: '587.00 €',
            bargeld: '7500.20 €',
            fahrten: 1590,
            waschen: '160.00 €'
          }]
        },
        {
          kw: 'KW 25',
          isExpanded: false,
          umsaetze: [{
            kw: 'KW 25',
            gesamtumsatz: '27200.30 €',
            nettoFahrpreis: '23500.10 €',
            rueckerstattungen: '3050.00 €',
            aktionen: '14.20 €',
            trinkgeld: '636.00 €',
            bargeld: '8100.50 €',
            fahrten: 1680,
            waschen: '170.00 €'
          }]
        }
      ]
    },
    {
      mitarbeiter: 'Ruslan Gasimov',
      isExpanded: false,
      umsaetzeByKW: [
        {
          kw: 'KW 23',
          isExpanded: false,
          umsaetze: [{
            kw: 'KW 23',
            gesamtumsatz: '25679.83 €',
            nettoFahrpreis: '20874.12 €',
            rueckerstattungen: '4200.00 €',
            aktionen: '42.00 €',
            trinkgeld: '605.71 €',
            bargeld: '5459.50 €',
            fahrten: 1730,
            waschen: '150.00 €'
          }]
        },
        {
          kw: 'KW 24',
          isExpanded: false,
          umsaetze: [{
            kw: 'KW 24',
            gesamtumsatz: '26100.45 €',
            nettoFahrpreis: '21300.25 €',
            rueckerstattungen: '4150.00 €',
            aktionen: '38.20 €',
            trinkgeld: '612.00 €',
            bargeld: '5800.30 €',
            fahrten: 1760,
            waschen: '160.00 €'
          }]
        },
        {
          kw: 'KW 25',
          isExpanded: false,
          umsaetze: [{
            kw: 'KW 25',
            gesamtumsatz: '26800.90 €',
            nettoFahrpreis: '21900.60 €',
            rueckerstattungen: '4300.00 €',
            aktionen: '41.30 €',
            trinkgeld: '559.00 €',
            bargeld: '6100.80 €',
            fahrten: 1790,
            waschen: '170.00 €'
          }]
        }
      ]
    }
  ]);

  // Filter states
  const [selectedYear, setSelectedYear] = useState<string>("2025");
  const [selectedKW, setSelectedKW] = useState<string>("alle");
  const [selectedMitarbeiter, setSelectedMitarbeiter] = useState<string>("alle");

  // Filter the data based on selected filters
  const filteredData = useMemo(() => {
    return umsatzData.filter(fahrer => {
      // Filter by Mitarbeiter
      if (selectedMitarbeiter !== "alle") {
        const mitarbeiterMap: { [key: string]: string } = {
          "faig": "Faig Mammmadzada",
          "petros": "Petros Tsaturian",
          "ruslan": "Ruslan Gasimov"
        };
        if (fahrer.mitarbeiter !== mitarbeiterMap[selectedMitarbeiter]) {
          return false;
        }
      }

      // Filter KWs for each driver
      const filteredKWs = fahrer.umsaetzeByKW.filter(kwData => {
        // Filter by KW
        if (selectedKW !== "alle") {
          const kwNumber = selectedKW.replace("kw", "");
          if (!kwData.kw.includes(kwNumber)) {
            return false;
          }
        }
        
        // Add year filter when we have real year data
        // Currently all data is assumed to be from the selected year
        return true;
      });

      // Update the driver's KWs with filtered ones
      return filteredKWs.length > 0;
    }).map(fahrer => ({
      ...fahrer,
      umsaetzeByKW: fahrer.umsaetzeByKW.filter(kwData => {
        if (selectedKW !== "alle") {
          const kwNumber = selectedKW.replace("kw", "");
          return kwData.kw.includes(kwNumber);
        }
        return true;
      })
    }));
  }, [umsatzData, selectedYear, selectedKW, selectedMitarbeiter]);

  // Calculate totals based on filtered data
  const totals = useMemo(() => {
    return filteredData.reduce((acc, fahrer) => {
      fahrer.umsaetzeByKW.forEach(kw => {
        kw.umsaetze.forEach(umsatz => {
          acc.gesamtumsatz += parseFloat(umsatz.gesamtumsatz) || 0;
          acc.nettoFahrpreis += parseFloat(umsatz.nettoFahrpreis) || 0;
          acc.rueckerstattungen += parseFloat(umsatz.rueckerstattungen) || 0;
          acc.aktionen += parseFloat(umsatz.aktionen) || 0;
          acc.trinkgeld += parseFloat(umsatz.trinkgeld) || 0;
          acc.bargeld += parseFloat(umsatz.bargeld) || 0;
          acc.fahrten += umsatz.fahrten;
          acc.waschen += parseFloat(umsatz.waschen) || 0;
        });
      });
      return acc;
    }, {
      gesamtumsatz: 0,
      nettoFahrpreis: 0,
      rueckerstattungen: 0,
      aktionen: 0,
      trinkgeld: 0,
      bargeld: 0,
      fahrten: 0,
      waschen: 0
    });
  }, [filteredData]);

  const toggleFahrerExpand = (fahrerIndex: number) => {
    setUmsatzData(prevData => {
      const newData = [...prevData];
      newData[fahrerIndex] = {
        ...newData[fahrerIndex],
        isExpanded: !newData[fahrerIndex].isExpanded
      };
      return newData;
    });
  };

  const toggleKWExpand = (fahrerIndex: number, kwIndex: number) => {
    setUmsatzData(prevData => {
      const newData = [...prevData];
      newData[fahrerIndex].umsaetzeByKW[kwIndex] = {
        ...newData[fahrerIndex].umsaetzeByKW[kwIndex],
        isExpanded: !newData[fahrerIndex].umsaetzeByKW[kwIndex].isExpanded
      };
      return newData;
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Umsätze</h1>
        </div>
        <div className="flex items-center gap-2">
          <AddUmsatzDialog />
          <UploadUmsatzDialog />
        </div>
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
              <Select value={selectedYear} onValueChange={setSelectedYear}>
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
              <Select value={selectedKW} onValueChange={setSelectedKW}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alle">Alle</SelectItem>
                  <SelectItem value="kw25">KW 25</SelectItem>
                  <SelectItem value="kw24">KW 24</SelectItem>
                  <SelectItem value="kw23">KW 23</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">Mitarbeiter</label>
              <Select value={selectedMitarbeiter} onValueChange={setSelectedMitarbeiter}>
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
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b transition-colors">
                <th className="h-8 px-2 text-left align-middle text-sm font-medium">Mitarbeiter</th>
                <th className="h-8 px-2 text-right align-middle text-sm font-medium">Gesamtumsatz</th>
                <th className="h-8 px-2 text-right align-middle text-sm font-medium">Netto-Fahrpreis</th>
                <th className="h-8 px-2 text-right align-middle text-sm font-medium">Aktionen</th>
                <th className="h-8 px-2 text-right align-middle text-sm font-medium">Rückerstattungen</th>
                <th className="h-8 px-2 text-right align-middle text-sm font-medium">Trinkgeld</th>
                <th className="h-8 px-2 text-right align-middle text-sm font-medium">Bargeld</th>
                <th className="h-8 px-2 text-right align-middle text-sm font-medium">Fahrten</th>
                <th className="h-8 px-2 text-right align-middle text-sm font-medium">Waschen</th>
                <th className="h-8 px-2 text-center align-middle text-sm font-medium">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((fahrer, fahrerIndex) => {
                const summary = calculateDriverSummary(fahrer.umsaetzeByKW);
                return (
                  <React.Fragment key={fahrerIndex}>
                    {/* Summary Row */}
                    <tr className="border-b transition-colors hover:bg-muted/50 cursor-pointer"
                        onClick={() => toggleFahrerExpand(fahrerIndex)}>
                      <td className="py-1 px-2">
                        <div className="flex items-center">
                          {fahrer.isExpanded ? (
                            <ChevronDown className="h-3 w-3 text-gray-400 mr-2" />
                          ) : (
                            <ChevronRight className="h-3 w-3 text-gray-400 mr-2" />
                          )}
                          <span className="font-medium text-sm">{fahrer.mitarbeiter}</span>
                        </div>
                      </td>
                      <td className="py-1 px-2 text-right text-sm">{formatNumber(summary.gesamtumsatz)} €</td>
                      <td className="py-1 px-2 text-right text-sm">{formatNumber(summary.nettoFahrpreis)} €</td>
                      <td className="py-1 px-2 text-right text-sm">{formatNumber(summary.aktionen)} €</td>
                      <td className="py-1 px-2 text-right text-sm">{formatNumber(summary.rueckerstattungen)} €</td>
                      <td className="py-1 px-2 text-right text-sm">{formatNumber(summary.trinkgeld)} €</td>
                      <td className="py-1 px-2 text-right text-sm">{formatNumber(summary.bargeld)} €</td>
                      <td className="py-1 px-2 text-right text-sm">{summary.fahrten}</td>
                      <td className="py-1 px-2 text-right text-sm">{formatNumber(summary.waschen)} €</td>
                      <td className="py-1 px-2">
                        <div className="flex items-center gap-1 justify-center">
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-5 w-5 text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded KW Rows */}
                    {fahrer.isExpanded && fahrer.umsaetzeByKW.map((kwData, kwIndex) => {
                      const umsatz = kwData.umsaetze[0];
                      return (
                        <tr key={kwIndex} 
                            className="border-b transition-colors hover:bg-muted/50 bg-gray-50">
                          <td className="py-1 px-2 pl-8">
                            <span className="text-xs">{umsatz.kw}</span>
                          </td>
                          <td className="py-1 px-2 text-right text-xs">{formatNumber(umsatz.gesamtumsatz)} €</td>
                          <td className="py-1 px-2 text-right text-xs">{formatNumber(umsatz.nettoFahrpreis)} €</td>
                          <td className="py-1 px-2 text-right text-xs">{formatNumber(umsatz.aktionen)} €</td>
                          <td className="py-1 px-2 text-right text-xs">{formatNumber(umsatz.rueckerstattungen)} €</td>
                          <td className="py-1 px-2 text-right text-xs">{formatNumber(umsatz.trinkgeld)} €</td>
                          <td className="py-1 px-2 text-right text-xs">{formatNumber(umsatz.bargeld)} €</td>
                          <td className="py-1 px-2 text-right text-xs">{umsatz.fahrten}</td>
                          <td className="py-1 px-2 text-right text-xs">{formatNumber(umsatz.waschen)} €</td>
                          <td className="py-1 px-2">
                            <div className="flex items-center gap-1 justify-center">
                              <Button variant="ghost" size="icon" className="h-5 w-5">
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-5 w-5 text-destructive">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-50 border-t">
              <tr>
                <td className="py-1 px-2 font-medium text-sm">Gesamt:</td>
                <td className="py-1 px-2 text-right font-medium text-sm">{formatNumber(totals.gesamtumsatz)} €</td>
                <td className="py-1 px-2 text-right font-medium text-sm">{formatNumber(totals.nettoFahrpreis)} €</td>
                <td className="py-1 px-2 text-right font-medium text-sm">{formatNumber(totals.aktionen)} €</td>
                <td className="py-1 px-2 text-right font-medium text-sm">{formatNumber(totals.rueckerstattungen)} €</td>
                <td className="py-1 px-2 text-right font-medium text-sm">{formatNumber(totals.trinkgeld)} €</td>
                <td className="py-1 px-2 text-right font-medium text-sm">{formatNumber(totals.bargeld)} €</td>
                <td className="py-1 px-2 text-right font-medium text-sm">{totals.fahrten}</td>
                <td className="py-1 px-2 text-right font-medium text-sm">{formatNumber(totals.waschen)} €</td>
                <td className="py-1 px-2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Umsaetze;
