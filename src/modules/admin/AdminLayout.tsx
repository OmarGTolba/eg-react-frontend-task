import React from "react";
import { Sidebar } from "./components/Sidebar";

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      <Sidebar />

      <div className="flex-1 ml-64 p-6">

        <header className="bg-white p-4 rounded-lg shadow mb-8">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        </header>

        <main className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to the Application
          </h2>
          <p className="text-gray-600">
            This is your admin dashboard.
          </p>
        </main>

      </div>
    </div>
  );
};
