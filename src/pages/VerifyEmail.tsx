import { useNavigate } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";

export default function VerifyEmail() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <SignUp 
          routing="path"
          path="/verify-email"
          signInUrl="/login"
          redirectUrl="/dashboard"
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