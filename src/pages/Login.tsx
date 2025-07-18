import { useNavigate } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/register"
          redirectUrl="/dashboard"
          afterSignInUrl="/dashboard"
          appearance={{
            elements: {
              card: "shadow-none border-none",
              rootBox: "mx-auto w-full"
            }
          }}
        />
      </div>
    </div>
  );
} 