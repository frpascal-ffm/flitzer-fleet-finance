import { createBrowserRouter } from "react-router-dom";
import { SignedIn, SignedOut, ClerkLoading } from "@clerk/react-router";
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

// Create a loading component
const LoadingPage = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-xl font-medium">Loading...</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  // Loader for all routes
  {
    id: "root",
    element: (
      <ClerkLoading fallback={<LoadingPage />}>
        <div />
      </ClerkLoading>
    ),
    loader: () => null,
  },
  // Public routes
  {
    path: "/login",
    element: (
      <SignedOut>
        <Login />
      </SignedOut>
    ),
  },
  {
    path: "/register",
    element: (
      <SignedOut>
        <Register />
      </SignedOut>
    ),
  },
  // Protected routes
  {
    path: "/",
    element: (
      <SignedIn>
        <Layout>
          <Index />
        </Layout>
      </SignedIn>
    ),
  },
  {
    path: "/fahrer",
    element: (
      <SignedIn>
        <Layout>
          <Fahrer />
        </Layout>
      </SignedIn>
    ),
  },
  {
    path: "/fahrer/:id",
    element: (
      <SignedIn>
        <Layout>
          <FahrerDetail />
        </Layout>
      </SignedIn>
    ),
  },
  {
    path: "/fahrzeuge",
    element: (
      <SignedIn>
        <Layout>
          <Fahrzeuge />
        </Layout>
      </SignedIn>
    ),
  },
  {
    path: "/fahrzeuge/:id",
    element: (
      <SignedIn>
        <Layout>
          <FahrzeugDetail />
        </Layout>
      </SignedIn>
    ),
  },
  {
    path: "/umsaetze",
    element: (
      <SignedIn>
        <Layout>
          <Umsaetze />
        </Layout>
      </SignedIn>
    ),
  },
  {
    path: "/abrechnung",
    element: (
      <SignedIn>
        <Layout>
          <Abrechnung />
        </Layout>
      </SignedIn>
    ),
  },
  {
    path: "/kosten",
    element: (
      <SignedIn>
        <Layout>
          <AllgemeineKosten />
        </Layout>
      </SignedIn>
    ),
  },
  {
    path: "/tankkosten",
    element: (
      <SignedIn>
        <Layout>
          <Tankkosten />
        </Layout>
      </SignedIn>
    ),
  },
  {
    path: "/bilanz",
    element: (
      <SignedIn>
        <Layout>
          <Bilanz />
        </Layout>
      </SignedIn>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]); 