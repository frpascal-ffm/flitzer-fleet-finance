import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, FilePlus, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const umsatzData = [
    { name: 'KW 21', umsatz: 3 },
    { name: 'KW 22', umsatz: 3.5 },
    { name: 'KW 23', umsatz: 3.2 },
    { name: 'KW 24', umsatz: 3.8 },
  ];

  const mitarbeiterData = [
    { name: 'Petros Tsaturian', umsatz: 25000 },
    { name: 'Ruslan Gasimov', umsatz: 24000 },
    { name: 'Faig Mammmadzada', umsatz: 20000 },
    { name: 'Pascal Richter', umsatz: 0 },
  ];

  return (
    <div className="h-full w-full overflow-auto p-4 pb-8">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Übersicht für 15.06.2025</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Aktive Fahrzeuge</CardTitle>
            <FilePlus className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-600">von insgesamt 3 Fahrzeugen</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Aktive Mitarbeiter</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-gray-600">von insgesamt 4 Mitarbeitern</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Umsatz aktuelle Woche</CardTitle>
            <ArrowUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.00 €</div>
            <p className="text-xs text-gray-600">KW 24/2025</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monatliche Kosten</CardTitle>
            <ArrowUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2620.55 €</div>
            <p className="text-xs text-gray-600 truncate">Fixkosten: 2278.55 € | Rücklagen: 342.00 €</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mt-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Umsatzentwicklung</CardTitle>
            <p className="text-sm text-gray-600">Überblick über die letzten 4 Wochen</p>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={umsatzData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    dataKey="umsatz" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Umsätze pro Mitarbeiter</CardTitle>
            <p className="text-sm text-gray-600">Gesamtumsatz nach Mitarbeitern</p>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mitarbeiterData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <Bar dataKey="umsatz" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
