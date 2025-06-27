import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import App from './App'
import { ClerkProvider } from '@clerk/clerk-react'

// Create a query client for data fetching
const queryClient = new QueryClient();

// Get the Clerk publishable key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={clerkPubKey}
    afterSignInUrl="/dashboard"
    afterSignUpUrl="/dashboard"
    signInUrl="/login"
    signUpUrl="/register"
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <App />
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);
