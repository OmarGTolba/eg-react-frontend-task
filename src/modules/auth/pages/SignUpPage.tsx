import React from "react";
import { SignUpForm } from "../components/SignUpForm";

export const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create an Account  
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Join us and get started
        </p>

        <SignUpForm />
      </div>
    </div>
  );
};
