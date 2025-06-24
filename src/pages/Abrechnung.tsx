import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight, ChevronLeft, Plus, Trash2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [isWeeksOpen, setIsWeeksOpen] = useState(false);

  const employees = [
    { id: 'faig', name: 'Faig Mammmadzada' },
    { id: 'petros', name: 'Petros Tsaturian' },
    { id: 'ruslan', name: 'Ruslan Gasimov' }
  ];

  const availableWeeksByEmployee = {
    faig: [
      { id: 'kw24', label: 'KW 24', amount: '20866.84 €' },
      { id: 'kw23', label: 'KW 23', amount: '18500.00 €' }
    ],
    petros: [
      { id: 'kw24', label: 'KW 24', amount: '19500.00 €' },
      { id: 'kw22', label: 'KW 22', amount: '22100.50 €' }
    ],
    ruslan: [
      { id: 'kw23', label: 'KW 23', amount: '21000.00 €' },
      { id: 'kw22', label: 'KW 22', amount: '20500.00 €' }
    ]
  };

  const handleEmployeeChange = (employeeId: string) => {
    setSelectedEmployee(employeeId);
    setSelectedWeeks([]);
  };

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

  // Helper function to determine if a step is accessible
  const isStepAccessible = (step: number) => {
    switch (step) {
      case 1: // Employee selection is always accessible
        return true;
      case 2: // Week selection requires employee to be selected
        return selectedEmployee !== '';
      case 3: // Step 3 requires at least one week to be selected
        return selectedEmployee !== '' && selectedWeeks.length > 0;
      default:
        return false;
    }
  };

  // Helper function to determine if a step is completed
  const isStepCompleted = (step: number) => {
    switch (step) {
      case 1:
        return selectedEmployee !== '';
      case 2:
        return selectedWeeks.length > 0;
      case 3:
        return false; // Step 3 is completed when form is submitted
      default:
        return false;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Abrechnung</h1>
        <p className="text-gray-600">Erstellen Sie eine Abrechnung für einen Mitarbeiter</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step 1: Employee Selection */}
        <Card className={cn(
          currentStep === 1 && "ring-2 ring-blue-500",
          isStepCompleted(1) && "bg-gray-50"
        )}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className={cn(
                "w-6 h-6 flex items-center justify-center text-sm mr-2 rounded-full",
                isStepCompleted(1) ? "bg-green-500" : "bg-blue-500",
                "text-white"
              )}>
                {isStepCompleted(1) ? "✓" : "1"}
              </span>
              Mitarbeiter auswählen
            </CardTitle>
            <p className="text-sm text-gray-600">Wählen Sie einen Mitarbeiter für die Abrechnung aus</p>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="employee">Mitarbeiter</Label>
              <Select value={selectedEmployee} onValueChange={handleEmployeeChange}>
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
        <Card className={cn(
          currentStep === 2 && isStepAccessible(2) && "ring-2 ring-blue-500",
          !isStepAccessible(2) && "opacity-50",
          isStepCompleted(2) && "bg-gray-50"
        )}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className={cn(
                "w-6 h-6 flex items-center justify-center text-sm mr-2 rounded-full",
                !isStepAccessible(2) ? "bg-gray-400" :
                isStepCompleted(2) ? "bg-green-500" : "bg-blue-500",
                "text-white"
              )}>
                {isStepCompleted(2) ? "✓" : "2"}
              </span>
              Wochen auswählen
            </CardTitle>
            <p className="text-sm text-gray-600">
              {!isStepAccessible(2)
                ? 'Bitte wählen Sie zuerst einen Mitarbeiter aus'
                : `Wählen Sie die Wochen für ${employees.find(e => e.id === selectedEmployee)?.name}`}
            </p>
          </CardHeader>
          <CardContent className={!isStepAccessible(2) ? "pointer-events-none" : ""}>
            <div>
              <Label>Kalenderwochen</Label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => selectedEmployee && setIsWeeksOpen(!isWeeksOpen)}
                  disabled={!isStepAccessible(2)}
                  className={cn(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    !isStepAccessible(2) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span className="truncate">
                    {!selectedEmployee
                      ? 'Bitte Mitarbeiter auswählen'
                      : selectedWeeks.length === 0
                      ? 'Wochen auswählen'
                      : `${selectedWeeks.length} Wochen ausgewählt`}
                  </span>
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    isWeeksOpen && "rotate-90"
                  )} />
                </button>
                {isWeeksOpen && selectedEmployee && (
                  <div className="absolute z-50 w-full mt-1 bg-white rounded-md border shadow-lg">
                    <div className="p-1 space-y-1">
                      {availableWeeksByEmployee[selectedEmployee as keyof typeof availableWeeksByEmployee].map(week => (
                        <button
                          key={week.id}
                          onClick={() => handleWeekToggle(week.id)}
                          className={cn(
                            "flex items-center w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground",
                            selectedWeeks.includes(week.id) && "bg-accent"
                          )}
                        >
                          <div className="w-4 h-4 mr-2">
                            {selectedWeeks.includes(week.id) && (
                              <Check className="w-4 h-4" />
                            )}
                          </div>
                          <span className="flex-1 text-left">{week.label}</span>
                          <span className="text-gray-500">{week.amount}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {selectedEmployee && selectedWeeks.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Gesamtbetrag: {availableWeeksByEmployee[selectedEmployee as keyof typeof availableWeeksByEmployee]
                      .filter(week => selectedWeeks.includes(week.id))
                      .reduce((sum, week) => sum + parseFloat(week.amount.replace('€', '').replace('.', '').replace(',', '.')), 0)
                      .toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Deductions */}
        <Card className={cn(
          currentStep === 3 && isStepAccessible(3) && "ring-2 ring-blue-500",
          !isStepAccessible(3) && "opacity-50"
        )}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className={cn(
                "w-6 h-6 flex items-center justify-center text-sm mr-2 rounded-full",
                !isStepAccessible(3) ? "bg-gray-400" : "bg-blue-500",
                "text-white"
              )}>
                3
              </span>
              Sonstiges
            </CardTitle>
            <p className="text-sm text-gray-600">
              {!isStepAccessible(3)
                ? 'Bitte wählen Sie zuerst die Wochen aus'
                : 'Fügen Sie weitere Abzüge oder Einnahmen für die Abrechnung hinzu'}
            </p>
          </CardHeader>
          <CardContent className={!isStepAccessible(3) ? "pointer-events-none" : ""}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="netSalary">Netto-Gehalt (€)</Label>
                <Input
                  id="netSalary"
                  type="number"
                  step="0.01"
                  value={netSalary}
                  onChange={(e) => setNetSalary(e.target.value)}
                  disabled={!isStepAccessible(3)}
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
                  disabled={!isStepAccessible(3)}
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
                  disabled={!isStepAccessible(3)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Sonstiges</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addDeduction}
                    disabled={!isStepAccessible(3)}
                  >
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
                      disabled={!isStepAccessible(3)}
                    />
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Betrag"
                      value={deduction.amount}
                      onChange={(e) => updateDeduction(index, 'amount', parseFloat(e.target.value) || 0)}
                      className="w-24"
                      disabled={!isStepAccessible(3)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeDeduction(index)}
                      disabled={!isStepAccessible(3)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-500">
                Hinweis: Positive Beträge werden als Abzüge berechnet, negative Beträge als zusätzliche Einnahmen.
              </p>
            </div>
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
          <Button 
            onClick={generatePayroll}
            disabled={!isStepAccessible(3)}
          >
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
