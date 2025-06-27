// This file is now a placeholder since all the routing and provider logic
// has been moved to main.tsx and router.tsx

import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Fahrer from "./pages/Fahrer";
import FahrerDetail from "./pages/FahrerDetail";
import Fahrzeuge from "./pages/Fahrzeuge";
import FahrzeugDetail from "./pages/FahrzeugDetail";
import Umsaetze from "./pages/Umsaetze";
import NotFound from "./pages/NotFound";
import Abrechnung from "./pages/Abrechnung";
import AllgemeineKosten from "./pages/AllgemeineKosten";
import Tankkosten from "./pages/Tankkosten";
import Bilanz from "./pages/Bilanz";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

const App = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/login" element={
      <SignedOut>
        <Login />
      </SignedOut>
    } />
    <Route path="/register" element={
      <SignedOut>
        <Register />
      </SignedOut>
    } />

    {/* Protected routes */}
    <Route path="/" element={
      <ProtectedRoute>
        <Layout>
          <Index />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/fahrer" element={
      <ProtectedRoute>
        <Layout>
          <Fahrer />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/fahrer/:id" element={
      <ProtectedRoute>
        <Layout>
          <FahrerDetail />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/fahrzeuge" element={
      <ProtectedRoute>
        <Layout>
          <Fahrzeuge />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/fahrzeuge/:id" element={
      <ProtectedRoute>
        <Layout>
          <FahrzeugDetail />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/umsaetze" element={
      <ProtectedRoute>
        <Layout>
          <Umsaetze />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/abrechnung" element={
      <ProtectedRoute>
        <Layout>
          <Abrechnung />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/kosten" element={
      <ProtectedRoute>
        <Layout>
          <AllgemeineKosten />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/tankkosten" element={
      <ProtectedRoute>
        <Layout>
          <Tankkosten />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/bilanz" element={
      <ProtectedRoute>
        <Layout>
          <Bilanz />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
