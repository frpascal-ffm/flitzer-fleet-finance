import React, { useEffect, useState } from 'react';
import { useSupabase } from '@/hooks/use-supabase';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';

interface Fahrzeug {
  id: string;
  kennzeichen: string;
  hersteller: string;
  modell: string;
}

export default function TenantDataExample() {
  const { user } = useUser();
  const { createTenantQuery, isReady } = useSupabase();
  const [fahrzeuge, setFahrzeuge] = useState<Fahrzeug[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to load vehicles for current tenant
  const loadFahrzeuge = async () => {
    if (!isReady) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Use createTenantQuery to get tenant-scoped client
      const { data, error } = await createTenantQuery()
        .from('fahrzeuge')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setFahrzeuge(data || []);
    } catch (err: any) {
      console.error('Error loading fahrzeuge:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new vehicle for the current tenant
  const addFahrzeug = async () => {
    if (!isReady) return;
    
    try {
      const newFahrzeug = {
        kennzeichen: `M-${Math.floor(Math.random() * 1000)}-XX`,
        hersteller: 'Example',
        modell: 'Test Model',
        // Notice we don't need to set tenant_id manually
        // It will be set by the Postgres trigger
      };
      
      const { data, error } = await createTenantQuery()
        .from('fahrzeuge')
        .insert(newFahrzeug)
        .select()
        .single();
      
      if (error) throw error;
      
      // Reload the list
      loadFahrzeuge();
    } catch (err: any) {
      console.error('Error adding fahrzeug:', err);
      setError(err.message);
    }
  };

  // Load data when component mounts and user is authenticated
  useEffect(() => {
    if (isReady) {
      loadFahrzeuge();
    }
  }, [isReady]);

  if (!user) {
    return <div>Please sign in to view your data.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Vehicles</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <Button onClick={addFahrzeug} disabled={loading}>
          Add Test Vehicle
        </Button>
        <Button 
          variant="outline" 
          onClick={loadFahrzeuge} 
          disabled={loading}
          className="ml-2"
        >
          Refresh
        </Button>
      </div>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          {fahrzeuge.length === 0 ? (
            <div>No vehicles found. Add one to get started.</div>
          ) : (
            fahrzeuge.map((fahrzeug) => (
              <div 
                key={fahrzeug.id} 
                className="p-4 border rounded shadow-sm"
              >
                <div className="font-bold">{fahrzeug.kennzeichen}</div>
                <div>{fahrzeug.hersteller} {fahrzeug.modell}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
} 