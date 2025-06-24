import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, DollarSign, ChevronDown, ChevronRight } from 'lucide-react';

// Helper function to get week number
const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

// Helper function to get calendar weeks for a specific month
const getKalenderWochenForMonth = (year: number, month: number): string[] => {
  const weeks: string[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Get the first Thursday of the month to determine the first calendar week
  let firstThursday = new Date(firstDay);
  while (firstThursday.getDay() !== 4) {
    firstThursday.setDate(firstThursday.getDate() + 1);
  }
  
  // Get the last Thursday of the month to determine the last calendar week
  let lastThursday = new Date(lastDay);
  while (lastThursday.getDay() !== 4) {
    lastThursday.setDate(lastThursday.getDate() - 1);
  }
  
  // Get week numbers
  const firstWeek = getWeekNumber(firstThursday);
  const lastWeek = getWeekNumber(lastThursday);
  
  for (let week = firstWeek; week <= lastWeek; week++) {
    weeks.push(`KW ${week}`);
  }
  
  return weeks;
};

// Helper function to format numbers in German mathematical style
const formatNumber = (value: number): string => {
  return value.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  });
};

// Helper function to format currency
const formatCurrency = (value: number): string => {
  return `${formatNumber(value)} €`;
};

interface BilanzData {
  kalenderwoche: string;
  // Umsätze data
  gesamtumsatz: number;
  nettoFahrpreis: number;
  trinkgeld: number;
  // Fahrzeuge data
  fahrzeugFixkosten: number;
  fahrzeugRuecklagen: number;
  // Fahrer data
  fahrerGehalt: number;
  // Allgemeine Kosten
  allgemeineKosten: number;
  // Tankkosten
  tankkosten: number;
  // Calculated fields
  gewinnVerlust: number;
}

const Bilanz = () => {
  // Get current year
  const currentYear = new Date().getFullYear();
  
  const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedKW, setSelectedKW] = useState<string>("");
  const [expandedKW, setExpandedKW] = useState<string | null>(null);

  // Example data combining all sources
  const bilanzData: BilanzData[] = [
    {
      kalenderwoche: "KW 23",
      gesamtumsatz: 73040.64,
      nettoFahrpreis: 61157.82,
      trinkgeld: 1582.82,
      fahrzeugFixkosten: 2278.55 / 4,
      fahrzeugRuecklagen: 342.00 / 4,
      fahrerGehalt: 25686.28,
      allgemeineKosten: 899.99 / 4,
      tankkosten: 645.90,
      gewinnVerlust: 0
    },
    {
      kalenderwoche: "KW 24",
      gesamtumsatz: 73401.55,
      nettoFahrpreis: 61500.95,
      trinkgeld: 1684.00,
      fahrzeugFixkosten: 2278.55 / 4,
      fahrzeugRuecklagen: 342.00 / 4,
      fahrerGehalt: 25830.40,
      allgemeineKosten: 899.99 / 4,
      tankkosten: 635.60,
      gewinnVerlust: 0
    },
    {
      kalenderwoche: "KW 25",
      gesamtumsatz: 76101.95,
      nettoFahrpreis: 63901.15,
      trinkgeld: 1683.00,
      fahrzeugFixkosten: 2278.55 / 4,
      fahrzeugRuecklagen: 342.00 / 4,
      fahrerGehalt: 26838.48,
      allgemeineKosten: 899.99 / 4,
      tankkosten: 670.00,
      gewinnVerlust: 0
    }
  ];

  // Calculate Gewinn/Verlust for each week
  bilanzData.forEach(bilanz => {
    bilanz.gewinnVerlust = bilanz.gesamtumsatz - (
      bilanz.fahrerGehalt +
      bilanz.fahrzeugFixkosten +
      bilanz.fahrzeugRuecklagen +
      bilanz.allgemeineKosten +
      bilanz.tankkosten
    );
  });

  // Get available calendar weeks based on selected month
  const availableKWs = selectedMonth 
    ? getKalenderWochenForMonth(parseInt(selectedYear), parseInt(selectedMonth) - 1)
    : [];

  // Reset KW selection when month changes
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setSelectedKW("");
  };

  // Filter data based on selections
  const filteredBilanzData = bilanzData.filter(bilanz => {
    if (selectedKW) {
      return bilanz.kalenderwoche === selectedKW;
    }
    if (selectedMonth) {
      return availableKWs.includes(bilanz.kalenderwoche);
    }
    return true;
  });

  const totals = filteredBilanzData.reduce((acc, bilanz) => ({
    gesamtumsatz: acc.gesamtumsatz + bilanz.gesamtumsatz,
    nettoFahrpreis: acc.nettoFahrpreis + bilanz.nettoFahrpreis,
    trinkgeld: acc.trinkgeld + bilanz.trinkgeld,
    fahrzeugFixkosten: acc.fahrzeugFixkosten + bilanz.fahrzeugFixkosten,
    fahrzeugRuecklagen: acc.fahrzeugRuecklagen + bilanz.fahrzeugRuecklagen,
    fahrerGehalt: acc.fahrerGehalt + bilanz.fahrerGehalt,
    allgemeineKosten: acc.allgemeineKosten + bilanz.allgemeineKosten,
    tankkosten: acc.tankkosten + bilanz.tankkosten,
    gewinnVerlust: acc.gewinnVerlust + bilanz.gewinnVerlust
  }), {
    gesamtumsatz: 0,
    nettoFahrpreis: 0,
    trinkgeld: 0,
    fahrzeugFixkosten: 0,
    fahrzeugRuecklagen: 0,
    fahrerGehalt: 0,
    allgemeineKosten: 0,
    tankkosten: 0,
    gewinnVerlust: 0
  });

  const toggleExpand = (kw: string) => {
    setExpandedKW(expandedKW === kw ? null : kw);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bilanz</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtumsatz</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.gesamtumsatz)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtkosten</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {formatCurrency(
                totals.fahrerGehalt +
                totals.fahrzeugFixkosten +
                totals.fahrzeugRuecklagen +
                totals.allgemeineKosten +
                totals.tankkosten
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gewinn/Verlust</CardTitle>
            {totals.gewinnVerlust >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totals.gewinnVerlust >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatCurrency(totals.gewinnVerlust)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trinkgeld</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.trinkgeld)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger>
            <SelectValue placeholder="Jahr auswählen" />
          </SelectTrigger>
          <SelectContent>
            {[currentYear - 1, currentYear, currentYear + 1].map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMonth} onValueChange={handleMonthChange}>
          <SelectTrigger>
            <SelectValue placeholder="Monat auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Monate</SelectItem>
            {Array.from({ length: 12 }, (_, i) => {
              const month = (i + 1).toString().padStart(2, '0');
              const monthName = new Date(2024, i).toLocaleString('de-DE', { month: 'long' });
              return (
                <SelectItem key={month} value={month}>
                  {monthName}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select 
          value={selectedKW} 
          onValueChange={setSelectedKW}
          disabled={!selectedMonth || selectedMonth === 'all'}
        >
          <SelectTrigger>
            <SelectValue placeholder={selectedMonth && selectedMonth !== 'all' ? "Kalenderwoche auswählen" : "Erst Monat auswählen"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Kalenderwochen</SelectItem>
            {availableKWs.map(kw => (
              <SelectItem key={kw} value={kw}>
                {kw}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Kalenderwoche</th>
              <th className="text-right p-4">Gesamtumsatz</th>
              <th className="text-right p-4">Gesamtkosten</th>
              <th className="text-right p-4">Gewinn/Verlust</th>
            </tr>
          </thead>
          <tbody>
            {filteredBilanzData.map((bilanz) => (
              <React.Fragment key={bilanz.kalenderwoche}>
                <tr 
                  className="border-b hover:bg-muted/50 cursor-pointer"
                  onClick={() => toggleExpand(bilanz.kalenderwoche)}
                >
                  <td className="p-4 flex items-center">
                    {expandedKW === bilanz.kalenderwoche ? (
                      <ChevronDown className="h-4 w-4 mr-2" />
                    ) : (
                      <ChevronRight className="h-4 w-4 mr-2" />
                    )}
                    {bilanz.kalenderwoche}
                  </td>
                  <td className="text-right p-4">{formatCurrency(bilanz.gesamtumsatz)}</td>
                  <td className="text-right p-4 text-red-500">
                    {formatCurrency(
                      bilanz.fahrerGehalt +
                      bilanz.fahrzeugFixkosten +
                      bilanz.fahrzeugRuecklagen +
                      bilanz.allgemeineKosten +
                      bilanz.tankkosten
                    )}
                  </td>
                  <td className={`text-right p-4 ${bilanz.gewinnVerlust >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatCurrency(bilanz.gewinnVerlust)}
                  </td>
                </tr>
                {expandedKW === bilanz.kalenderwoche && (
                  <tr className="bg-muted/50">
                    <td colSpan={4} className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Einnahmen</h4>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Netto Fahrpreis:</span>
                              <span>{formatCurrency(bilanz.nettoFahrpreis)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Trinkgeld:</span>
                              <span>{formatCurrency(bilanz.trinkgeld)}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Ausgaben</h4>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Fahrer Gehalt:</span>
                              <span className="text-red-500">{formatCurrency(bilanz.fahrerGehalt)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Fahrzeug Fixkosten:</span>
                              <span className="text-red-500">{formatCurrency(bilanz.fahrzeugFixkosten)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Fahrzeug Rücklagen:</span>
                              <span className="text-red-500">{formatCurrency(bilanz.fahrzeugRuecklagen)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Allgemeine Kosten:</span>
                              <span className="text-red-500">{formatCurrency(bilanz.allgemeineKosten)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tankkosten:</span>
                              <span className="text-red-500">{formatCurrency(bilanz.tankkosten)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bilanz; 