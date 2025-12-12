import React from "react";
import { SignInForm } from "../components/SignInForm";


export const SignInPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200">
        
        <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800">
          Welcome Back
        </h1>

      

        <SignInForm />
      </div>
    </div>
  );
};
