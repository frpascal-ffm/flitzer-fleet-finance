import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create a Supabase client with JWT from Clerk
export const createClerkSupabaseClient = async (getToken: () => Promise<string>): Promise<SupabaseClient> => {
  const jwt = await getToken();
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  });
};

// Hook to use Supabase with Clerk authentication
export function useClerkSupabase() {
  const { getToken } = useAuth();
  const { user, isSignedIn } = useUser();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Initialize Supabase client with Clerk token
  useEffect(() => {
    const initSupabase = async () => {
      if (!isSignedIn) {
        setSupabase(null);
        setIsReady(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const client = await createClerkSupabaseClient(() => getToken({ template: 'supabase' }));
        setSupabase(client);
        setIsReady(true);
        setError(null);
      } catch (e) {
        console.error('Failed to initialize Supabase client:', e);
        setError(e instanceof Error ? e : new Error(String(e)));
        setIsReady(false);
      } finally {
        setIsLoading(false);
      }
    };

    initSupabase();
  }, [isSignedIn, getToken]);

  // Initialize user and tenant
  useEffect(() => {
    const initializeUserTenant = async () => {
      if (!isReady || !supabase || !user) return;

      try {
        // Use the SECURITY DEFINER function that bypasses RLS
        const { data, error } = await supabase.rpc('initialize_user_tenant');
        
        if (error) {
          console.error('Error initializing user/tenant:', error);
          throw new Error(`${error.message} (Code: ${error.code})`);
        }
        
        console.log('User tenant initialization result:', data);
        
        if (data && data.tenant_id) {
          setTenantId(data.tenant_id);
          
          if (data.created) {
            console.log('Created new tenant:', data.tenant_id);
          } else {
            console.log('Using existing tenant:', data.tenant_id);
          }
        } else {
          throw new Error('No tenant ID returned from initialization');
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
        console.error('Error initializing user/tenant:', e);
        setError(new Error(`Error initializing user/tenant: ${errorMessage}`));
      }
    };

    initializeUserTenant();
  }, [user, supabase, isReady]);

  // Function to create a query that automatically includes tenant context
  const createTenantQuery = useCallback(() => {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    if (!tenantId) {
      throw new Error('No tenant ID available');
    }
    return supabase;
  }, [supabase, tenantId]);

  return useMemo(() => ({
    supabase,
    tenantId,
    createTenantQuery,
    isReady: isReady && !!tenantId,
    isLoading,
    error
  }), [supabase, tenantId, createTenantQuery, isReady, isLoading, error]);
} 