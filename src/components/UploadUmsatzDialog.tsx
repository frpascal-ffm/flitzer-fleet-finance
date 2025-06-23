
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, AlertCircle, ChevronLeft, ChevronRight, Check, Edit2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UmsatzData {
  id: string;
  mitarbeiter: string;
  kw: string;
  nettoFahrpreis: number;
  aktionen: number;
  rueckerstattungen: number;
  trinkgeld: number;
  bargeld: number;
  fahrten: number;
  approved: boolean;
  editing: boolean;
}

const UploadUmsatzDialog = () => {
  const [file, setFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [extractedData, setExtractedData] = useState<UmsatzData[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [editingData, setEditingData] = useState<UmsatzData | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      toast({
        title: "Ungültiger Dateityp",
        description: "Bitte wählen Sie eine CSV-Datei aus.",
        variant: "destructive"
      });
    }
  };

  const processCSV = (csvText: string, filename: string) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    // Extract calendar week from filename
    const kwMatch = filename.match(/kw(\d+)/i) || filename.match(/(\d+)/);
    const kw = kwMatch ? kwMatch[1] : '1';
    
    const data: UmsatzData[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length >= headers.length && values[0]) {
        data.push({
          id: `${i}-${Date.now()}`,
          mitarbeiter: values[0],
          kw: kw,
          nettoFahrpreis: parseFloat(values[1]) || 0,
          aktionen: parseFloat(values[2]) || 0,
          rueckerstattungen: parseFloat(values[3]) || 0,
          trinkgeld: parseFloat(values[4]) || 0,
          bargeld: parseFloat(values[5]) || 0,
          fahrten: parseInt(values[6]) || 0,
          approved: false,
          editing: false
        });
      }
    }
    
    return data;
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      const csvText = await file.text();
      const data = processCSV(csvText, file.name);
      
      console.log('Extracted data:', data);
      setExtractedData(data);
      setCurrentStep(2);
      setCurrentLineIndex(0);
      
    } catch (error) {
      console.error('Error processing CSV:', error);
      toast({
        title: "Upload-Fehler",
        description: "Die CSV-Datei konnte nicht verarbeitet werden.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleApprove = () => {
    const updatedData = [...extractedData];
    updatedData[currentLineIndex].approved = true;
    setExtractedData(updatedData);
    
    if (currentLineIndex < extractedData.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    } else {
      setCurrentStep(3);
    }
  };

  const handleEdit = () => {
    const updatedData = [...extractedData];
    updatedData[currentLineIndex].editing = true;
    setExtractedData(updatedData);
    setEditingData({ ...extractedData[currentLineIndex] });
  };

  const handleSaveEdit = () => {
    if (!editingData) return;
    
    const updatedData = [...extractedData];
    updatedData[currentLineIndex] = {
      ...editingData,
      editing: false,
      approved: true
    };
    setExtractedData(updatedData);
    setEditingData(null);
    
    if (currentLineIndex < extractedData.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    } else {
      setCurrentStep(3);
    }
  };

  const handleCancelEdit = () => {
    const updatedData = [...extractedData];
    updatedData[currentLineIndex].editing = false;
    setExtractedData(updatedData);
    setEditingData(null);
  };

  const handleFinalSave = () => {
    const approvedData = extractedData.filter(item => item.approved);
    
    console.log('Final data to save:', approvedData);
    
    toast({
      title: "Umsätze gespeichert",
      description: `${approvedData.length} Umsatz-Einträge wurden erfolgreich gespeichert.`
    });
    
    // Reset dialog
    setCurrentStep(1);
    setFile(null);
    setExtractedData([]);
    setCurrentLineIndex(0);
    setIsOpen(false);
  };

  const resetDialog = () => {
    setCurrentStep(1);
    setFile(null);
    setExtractedData([]);
    setCurrentLineIndex(0);
    setEditingData(null);
  };

  const currentItem = extractedData[currentLineIndex];
  const approvedCount = extractedData.filter(item => item.approved).length;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetDialog();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2">
          <Upload className="w-4 h-4 mr-2" />
          Umsatz hochladen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Umsatz CSV hochladen - Schritt {currentStep} von 3
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: File Upload */}
        {currentStep === 1 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="csvFile">CSV-Datei auswählen</Label>
              <Input
                id="csvFile"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            
            {file && (
              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-md">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700">{file.name}</span>
              </div>
            )}
            
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                <div className="text-xs text-gray-600">
                  <p className="font-medium mb-1">Erwartetes CSV-Format:</p>
                  <p>Mitarbeitername, Netto-Fahrpreis, Aktionen, Rückerstattungen, Trinkgeld, Bargeld, Fahrten</p>
                  <p className="mt-1">Die Kalenderwoche (KW) wird automatisch aus dem Dateinamen extrahiert.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Abbrechen
              </Button>
              <Button onClick={handleUpload} disabled={!file || isUploading}>
                {isUploading ? 'Wird verarbeitet...' : 'Weiter'}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Line-by-line approval */}
        {currentStep === 2 && currentItem && (
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Eintrag {currentLineIndex + 1} von {extractedData.length}
              </span>
              <span className="text-sm text-gray-600">
                Bestätigt: {approvedCount}
              </span>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {currentItem.editing ? 'Bearbeiten' : 'Überprüfen'}: {currentItem.mitarbeiter}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentItem.editing && editingData ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Mitarbeiter</Label>
                      <Input
                        value={editingData.mitarbeiter}
                        onChange={(e) => setEditingData({...editingData, mitarbeiter: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>KW</Label>
                      <Input
                        value={editingData.kw}
                        onChange={(e) => setEditingData({...editingData, kw: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Netto-Fahrpreis (€)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={editingData.nettoFahrpreis}
                        onChange={(e) => setEditingData({...editingData, nettoFahrpreis: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label>Aktionen (€)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={editingData.aktionen}
                        onChange={(e) => setEditingData({...editingData, aktionen: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label>Rückerstattungen (€)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={editingData.rueckerstattungen}
                        onChange={(e) => setEditingData({...editingData, rueckerstattungen: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label>Trinkgeld (€)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={editingData.trinkgeld}
                        onChange={(e) => setEditingData({...editingData, trinkgeld: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label>Bargeld (€)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={editingData.bargeld}
                        onChange={(e) => setEditingData({...editingData, bargeld: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label>Fahrten</Label>
                      <Input
                        type="number"
                        value={editingData.fahrten}
                        onChange={(e) => setEditingData({...editingData, fahrten: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>KW:</strong> {currentItem.kw}</div>
                    <div><strong>Netto-Fahrpreis:</strong> {currentItem.nettoFahrpreis.toFixed(2)} €</div>
                    <div><strong>Aktionen:</strong> {currentItem.aktionen.toFixed(2)} €</div>
                    <div><strong>Rückerstattungen:</strong> {currentItem.rueckerstattungen.toFixed(2)} €</div>
                    <div><strong>Trinkgeld:</strong> {currentItem.trinkgeld.toFixed(2)} €</div>
                    <div><strong>Bargeld:</strong> {currentItem.bargeld.toFixed(2)} €</div>
                    <div><strong>Fahrten:</strong> {currentItem.fahrten}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentLineIndex(Math.max(0, currentLineIndex - 1))}
                disabled={currentLineIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>

              <div className="space-x-2">
                {currentItem.editing ? (
                  <>
                    <Button variant="outline" onClick={handleCancelEdit}>
                      <X className="w-4 h-4 mr-2" />
                      Abbrechen
                    </Button>
                    <Button onClick={handleSaveEdit}>
                      <Save className="w-4 h-4 mr-2" />
                      Speichern
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={handleEdit}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Bearbeiten
                    </Button>
                    <Button onClick={handleApprove}>
                      <Check className="w-4 h-4 mr-2" />
                      Bestätigen
                    </Button>
                  </>
                )}
              </div>
            </div>

            {currentLineIndex === extractedData.length - 1 && (
              <div className="text-center">
                <Button onClick={() => setCurrentStep(3)} variant="outline">
                  Zur Übersicht
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Overview */}
        {currentStep === 3 && (
          <div className="space-y-4 py-4">
            <h3 className="text-lg font-semibold">Übersicht der zu speichernden Daten</h3>
            
            <div className="max-h-96 overflow-y-auto">
              {extractedData.filter(item => item.approved).map((item, index) => (
                <Card key={item.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{item.mitarbeiter} - KW {item.kw}</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2 text-sm">
                    <div>Netto-Fahrpreis: {item.nettoFahrpreis.toFixed(2)} €</div>
                    <div>Aktionen: {item.aktionen.toFixed(2)} €</div>
                    <div>Rückerstattungen: {item.rueckerstattungen.toFixed(2)} €</div>
                    <div>Trinkgeld: {item.trinkgeld.toFixed(2)} €</div>
                    <div>Bargeld: {item.bargeld.toFixed(2)} €</div>
                    <div>Fahrten: {item.fahrten}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Zurück zur Überprüfung
              </Button>
              <Button onClick={handleFinalSave}>
                {approvedCount} Einträge speichern
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadUmsatzDialog;
