import { useNavigate } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <SignIn
          routing="path"
          path="/reset-password"
          signUpUrl="/register"
          redirectUrl="/dashboard"
          initialStep="forgot_password"
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