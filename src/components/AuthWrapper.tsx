import { useClerk, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthWrapperProps {
  children: React.ReactNode;
  publicRoutes?: string[];
}

export const AuthWrapper = ({ children, publicRoutes = ['/login', '/register'] }: AuthWrapperProps) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { redirectToSignIn } = useClerk();
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  useEffect(() => {
    if (isLoaded) {
      const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route));
      
      if (!isSignedIn && !isPublicRoute) {
        navigate('/login');
      } else if (isSignedIn && isPublicRoute) {
        navigate('/');
      }
    }
  }, [isLoaded, isSignedIn, navigate, pathname, publicRoutes]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}; 