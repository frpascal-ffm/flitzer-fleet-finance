import { useNavigate, useLocation } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect URL from query parameters if it exists
  const urlParams = new URLSearchParams(location.search);
  const redirectUrl = urlParams.get('redirect_url');
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <SignUp 
          routing="path"
          path="/register"
          signInUrl="/login"
          redirectUrl={redirectUrl ? decodeURIComponent(redirectUrl) : "/dashboard"}
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "shadow-none border-none",
              header: "text-center",
              footer: "text-center",
            }
          }}
        />
      </div>
    </div>
  );
} 