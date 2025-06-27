import { useState, useEffect } from 'react';
import { useClerkSupabase } from '@/lib/supabase-clerk-auth';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface TenantDetails {
  id: string;
  name: string;
  created_at: string;
  settings?: {
    currency: string;
    preferences: Record<string, any>;
  };
  features: {
    id: string;
    name: string;
    description: string | null;
    enabled: boolean;
  }[];
}

export function TenantInfo() {
  const { user } = useUser();
  const { supabase, tenantId, isReady, isLoading } = useClerkSupabase();
  const [tenantDetails, setTenantDetails] = useState<TenantDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTenantDetails = async () => {
      if (!isReady || !supabase || !tenantId) return;
      
      setLoading(true);
      try {
        // Get tenant info
        const { data: tenant } = await supabase
          .from('tenants')
          .select('*')
          .eq('id', tenantId)
          .single();
        
        // Get tenant settings
        const { data: settings } = await supabase
          .from('tenant_settings')
          .select('*')
          .eq('tenant_id', tenantId)
          .single();
          
        // Get tenant features
        const { data: features } = await supabase
          .from('tenant_features')
          .select(`
            feature_id,
            enabled,
            features:feature_id (
              id,
              name,
              description
            )
          `)
          .eq('tenant_id', tenantId);
        
        // Format features data
        const formattedFeatures = features?.map(f => ({
          id: f.features.id,
          name: f.features.name,
          description: f.features.description,
          enabled: f.enabled
        })) || [];
        
        setTenantDetails({
          id: tenant.id,
          name: tenant.name,
          created_at: tenant.created_at,
          settings: settings,
          features: formattedFeatures
        });
      } catch (error) {
        console.error('Error fetching tenant details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTenantDetails();
  }, [isReady, supabase, tenantId]);
  
  // Create expense category as a test
  const createTestCategory = async () => {
    if (!isReady || !supabase || !tenantId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('expense_categories')
        .insert({
          name: `Test Category ${new Date().toISOString().substring(0, 19)}`,
          type: 'general',
          tenant_id: tenantId
        })
        .select()
        .single();
      
      if (error) throw error;
      alert(`Category created: ${data.name}`);
    } catch (error) {
      console.error('Error creating test category:', error);
      alert('Failed to create test category');
    } finally {
      setLoading(false);
    }
  };
  
  if (isLoading || loading) {
    return (
      <div className="flex justify-center my-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }
  
  if (!tenantDetails) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tenant Information</CardTitle>
          <CardDescription>No tenant information available</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Tenant Information</CardTitle>
        <CardDescription>Details about your tenant</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">User</h3>
          <p>{user?.fullName || user?.username || 'Unknown'} ({user?.primaryEmailAddress?.emailAddress})</p>
        </div>
        
        <div>
          <h3 className="font-semibold">Tenant</h3>
          <p>ID: {tenantDetails.id}</p>
          <p>Name: {tenantDetails.name}</p>
          <p>Created: {new Date(tenantDetails.created_at).toLocaleString()}</p>
        </div>
        
        {tenantDetails.settings && (
          <div>
            <h3 className="font-semibold">Settings</h3>
            <p>Currency: {tenantDetails.settings.currency}</p>
            <p>Language: {tenantDetails.settings.preferences?.language || 'Default'}</p>
          </div>
        )}
        
        {tenantDetails.features.length > 0 && (
          <div>
            <h3 className="font-semibold">Features</h3>
            <ul className="list-disc pl-5">
              {tenantDetails.features.map(feature => (
                <li key={feature.id} className={feature.enabled ? 'text-green-600' : 'text-gray-400'}>
                  {feature.name} - {feature.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={createTestCategory} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Working...
            </>
          ) : (
            'Create Test Category'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
} 