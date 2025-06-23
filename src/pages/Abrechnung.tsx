
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight, ChevronLeft, Plus, Trash2 } from 'lucide-react';

const Abrechnung = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedWeeks, setSelectedWeeks] = useState<string[]>([]);
  const [deductions, setDeductions] = useState([
    { description: '', amount: 0 }
  ]);
  const [netSalary, setNetSalary] = useState('0.00');
  const [taxDeduction, setTaxDeduction] = useState('0.00');
  const [svDeduction, setSvDeduction] = useState('0.00');

  const employees = [
    { id: 'faig', name: 'Faig Mammmadzada' },
    { id: 'petros', name: 'Petros Tsaturian' },
    { id: 'ruslan', name: 'Ruslan Gasimov' }
  ];

  const availableWeeks = [
    { id: 'kw24', label: 'KW 24', amount: '20866.84 €' },
    { id: 'kw23', label: 'KW 23', amount: '18500.00 €' },
    { id: 'kw22', label: 'KW 22', amount: '22100.50 €' }
  ];

  const handleWeekToggle = (weekId: string) => {
    setSelectedWeeks(prev => 
      prev.includes(weekId) 
        ? prev.filter(id => id !== weekId)
        : [...prev, weekId]
    );
  };

  const addDeduction = () => {
    setDeductions([...deductions, { description: '', amount: 0 }]);
  };

  const removeDeduction = (index: number) => {
    setDeductions(deductions.filter((_, i) => i !== index));
  };

  const updateDeduction = (index: number, field: string, value: string | number) => {
    const updated = deductions.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setDeductions(updated);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const generatePayroll = () => {
    // This would generate the payroll calculation
    console.log('Generating payroll for:', { selectedEmployee, selectedWeeks, deductions, netSalary, taxDeduction, svDeduction });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Abrechnung</h1>
        <p className="text-gray-600">Erstellen Sie eine Abrechnung für einen Mitarbeiter</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step 1: Employee Selection */}
        <Card className={`${currentStep === 1 ? 'ring-2 ring-blue-500' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
              Mitarbeiter auswählen
            </CardTitle>
            <p className="text-sm text-gray-600">Wählen Sie einen Mitarbeiter für die Abrechnung aus</p>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="employee">Mitarbeiter</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Mitarbeiter wählen" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(employee => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Week Selection */}
        <Card className={`${currentStep === 2 ? 'ring-2 ring-blue-500' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
              Wochen auswählen
            </CardTitle>
            <p className="text-sm text-gray-600">Wählen Sie die Wochen für die Abrechnung aus</p>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Kalenderwochen</Label>
              <div className="space-y-2 mt-2">
                {availableWeeks.map(week => (
                  <div key={week.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={week.id}
                      checked={selectedWeeks.includes(week.id)}
                      onChange={() => handleWeekToggle(week.id)}
                      className="rounded"
                    />
                    <label htmlFor={week.id} className="flex-1 cursor-pointer">
                      {week.label} - {week.amount}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Deductions */}
        <Card className={`${currentStep === 3 ? 'ring-2 ring-blue-500' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
              Sonstiges
            </CardTitle>
            <p className="text-sm text-gray-600">Fügen Sie weitere Abzüge oder Einnahmen für die Abrechnung hinzu</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="netSalary">Netto-Gehalt (€)</Label>
              <Input
                id="netSalary"
                type="number"
                step="0.01"
                value={netSalary}
                onChange={(e) => setNetSalary(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="taxDeduction">Steuerrechtl. Abzüge (€)</Label>
              <Input
                id="taxDeduction"
                type="number"
                step="0.01"
                value={taxDeduction}
                onChange={(e) => setTaxDeduction(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="svDeduction">SV-rechtl. Abzüge (€)</Label>
              <Input
                id="svDeduction"
                type="number"
                step="0.01"
                value={svDeduction}
                onChange={(e) => setSvDeduction(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Sonstiges</Label>
                <Button variant="outline" size="sm" onClick={addDeduction}>
                  <Plus className="w-4 h-4 mr-1" />
                  Hinzufügen
                </Button>
              </div>
              {deductions.map((deduction, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="Beschreibung"
                    value={deduction.description}
                    onChange={(e) => updateDeduction(index, 'description', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Betrag"
                    value={deduction.amount}
                    onChange={(e) => updateDeduction(index, 'amount', parseFloat(e.target.value) || 0)}
                    className="w-24"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeDeduction(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <p className="text-xs text-gray-500">
              Hinweis: Positive Beträge werden als Abzüge berechnet, negative Beträge als zusätzliche Einnahmen.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Zurück
        </Button>
        
        {currentStep < 3 ? (
          <Button
            onClick={nextStep}
            disabled={
              (currentStep === 1 && !selectedEmployee) ||
              (currentStep === 2 && selectedWeeks.length === 0)
            }
          >
            Weiter
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={generatePayroll}>
            Abrechnung erstellen
          </Button>
        )}
      </div>

      {/* Payroll Result (would be shown after generation) */}
      {currentStep === 3 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Abrechnungsvorschau</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Mitarbeiter:</p>
                <p className="font-medium">{employees.find(e => e.id === selectedEmployee)?.name || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ausgewählte Wochen:</p>
                <p className="font-medium">{selectedWeeks.length} Wochen</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Netto-Gehalt:</p>
                <p className="font-medium">{netSalary} €</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gesamtabzüge:</p>
                <p className="font-medium">{(parseFloat(taxDeduction) + parseFloat(svDeduction)).toFixed(2)} €</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Abrechnung;
