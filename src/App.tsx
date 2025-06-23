
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Mitarbeiter from "./pages/Mitarbeiter";
import MitarbeiterDetail from "./pages/MitarbeiterDetail";
import Fahrzeuge from "./pages/Fahrzeuge";
import Umsaetze from "./pages/Umsaetze";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mitarbeiter" element={<Mitarbeiter />} />
            <Route path="/mitarbeiter/:id" element={<MitarbeiterDetail />} />
            <Route path="/fahrzeuge" element={<Fahrzeuge />} />
            <Route path="/umsaetze" element={<Umsaetze />} />
            <Route path="/abrechnung" element={<div className="p-6"><h1 className="text-2xl font-bold">Abrechnung - Coming Soon</h1></div>} />
            <Route path="/kosten" element={<div className="p-6"><h1 className="text-2xl font-bold">Allgemeine Kosten - Coming Soon</h1></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
