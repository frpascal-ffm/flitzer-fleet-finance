import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

const FahrerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app would fetch based on id
  const fahrer = {
    name: 'Petros Tsaturian',
    email: 'petros@example.com',
    provision: '40%',
    nettoGehalt: '11.00 €',
    sollfahrten: 130,
    status: 'aktiv',
    eingestellt: '2024-01-15',
    telefon: '+49 123 456789'
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/fahrer')}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">{fahrer.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Persönliche Informationen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Name</label>
              <p className="text-lg">{fahrer.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">E-Mail</label>
              <p className="text-lg">{fahrer.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Telefon</label>
              <p className="text-lg">{fahrer.telefon}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="capitalize">{fahrer.status}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Eingestellt am</label>
              <p className="text-lg">{fahrer.eingestellt}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Arbeitsinformationen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Provision</label>
              <p className="text-lg font-semibold">{fahrer.provision}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Netto-Gehalt</label>
              <p className="text-lg font-semibold">{fahrer.nettoGehalt}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Sollfahrten</label>
              <p className="text-lg">{fahrer.sollfahrten}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex space-x-4">
        <Button>
          <Edit className="w-4 h-4 mr-2" />
          Bearbeiten
        </Button>
        <Button variant="destructive">
          <Trash2 className="w-4 h-4 mr-2" />
          Löschen
        </Button>
      </div>
    </div>
  );
};

export default FahrerDetail;
