import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import App from './App'
import { deDE } from '@clerk/localizations'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key")
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ClerkProvider 
          publishableKey={PUBLISHABLE_KEY} 
          navigate={(to) => window.location.href = to}
          afterSignInUrl="/"
          afterSignUpUrl="/"
          afterSignOutUrl="/login"
          localization={deDE}
        >
          <App />
        </ClerkProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
