import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to get the user's tenant ID from Clerk
// This will be used in RLS policies to isolate data
export const getTenantId = async (userId: string) => {
  // For simple implementation, we use the user's Clerk ID as their tenant ID
  // In a more complex system, you might want to look up a mapping in a separate table
  return userId;
}; 