import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
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
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import SSOCallback from "./pages/SSOCallback";

// Create a loading component
const LoadingPage = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-xl font-medium">Loading...</p>
    </div>
  </div>
);

// Create a layout for protected routes
const ProtectedLayout = () => {
  return (
    <SignedIn>
      <Layout>
        <Outlet />
      </Layout>
    </SignedIn>
  );
};

// Create a layout for public routes
const PublicLayout = () => {
  return (
    <SignedOut>
      <Outlet />
    </SignedOut>
  );
};

// Redirect to sign in if not authenticated
const RequireAuth = () => {
  return (
    <>
      <SignedIn>
        <Outlet />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export const router = createBrowserRouter([
  // Root path - redirects to dashboard if signed in, otherwise to login
  {
    path: "/",
    element: (
      <>
        <SignedIn>
          <Navigate to="/dashboard" replace />
        </SignedIn>
        <SignedOut>
          <Navigate to="/login" replace />
        </SignedOut>
      </>
    ),
    errorElement: <NotFound />,
  },
  // Public routes - only accessible when signed out
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/login/*",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/register/*",
        element: <Register />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/verify-email/*",
        element: <VerifyEmail />,
      },
      {
        path: "/sso-callback",
        element: <SSOCallback />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/reset-password/*",
        element: <ResetPassword />,
      },
    ],
  },
  // Protected routes - require authentication
  {
    element: <RequireAuth />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Index />,
          },
          {
            path: "/fahrer",
            element: <Fahrer />,
          },
          {
            path: "/fahrer/:id",
            element: <FahrerDetail />,
          },
          {
            path: "/fahrzeuge",
            element: <Fahrzeuge />,
          },
          {
            path: "/fahrzeuge/:id",
            element: <FahrzeugDetail />,
          },
          {
            path: "/umsaetze",
            element: <Umsaetze />,
          },
          {
            path: "/abrechnung",
            element: <Abrechnung />,
          },
          {
            path: "/kosten",
            element: <AllgemeineKosten />,
          },
          {
            path: "/tankkosten",
            element: <Tankkosten />,
          },
          {
            path: "/bilanz",
            element: <Bilanz />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]); 