
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UploadUmsatzDialog = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
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
    
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length >= headers.length && values[0]) {
        data.push({
          mitarbeiter: values[0],
          kw: kw,
          nettoFahrpreis: parseFloat(values[1]) || 0,
          aktionen: parseFloat(values[2]) || 0,
          rueckerstattungen: parseFloat(values[3]) || 0,
          trinkgeld: parseFloat(values[4]) || 0,
          bargeld: parseFloat(values[5]) || 0,
          fahrten: parseInt(values[6]) || 0
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
      const extractedData = processCSV(csvText, file.name);
      
      console.log('Extracted data:', extractedData);
      
      // Here you would normally send the data to your backend
      // For now, we'll just show a success message
      
      toast({
        title: "Upload erfolgreich",
        description: `${extractedData.length} Umsatz-Einträge wurden verarbeitet.`
      });
      
      setFile(null);
      
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-2">
          <Upload className="w-4 h-4 mr-2" />
          Umsatz hochladen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Umsatz CSV hochladen</DialogTitle>
        </DialogHeader>
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
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" disabled={isUploading}>
            Abbrechen
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!file || isUploading}
          >
            {isUploading ? 'Wird hochgeladen...' : 'Hochladen'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadUmsatzDialog;
