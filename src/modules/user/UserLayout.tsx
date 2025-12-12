import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";


export const UserLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};
