import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/lib/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

// Hook to use Supabase with current user's context
export function useSupabase() {
  const { user, isSignedIn } = useUser();
  const [tenantId, setTenantId] = useState<string | null>(null);
  
  useEffect(() => {
    if (isSignedIn && user) {
      // Set tenantId to the user's ID for data isolation
      setTenantId(user.id);
    } else {
      setTenantId(null);
    }
  }, [user, isSignedIn]);

  // Function to create a query with tenant ID in the headers
  const createTenantQuery = () => {
    if (!tenantId) {
      throw new Error("User not authenticated");
    }
    
    // Add tenant ID to Supabase request headers
    // This will be used by RLS policies
    return supabase.headers({
      'x-tenant-id': tenantId
    });
  };

  // Return the client and a function to create tenant-scoped queries
  return {
    supabase,
    createTenantQuery,
    tenantId,
    isReady: isSignedIn
  };
} 