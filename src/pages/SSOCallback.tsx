import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function SSOCallback() {
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isLoaded && userId) {
      navigate("/dashboard");
    }
  }, [isLoaded, userId, navigate]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-xl font-medium">Processing authentication...</p>
      </div>
    </div>
  );
} 