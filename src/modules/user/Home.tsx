import React from "react";
import { Navbar } from "./components/Navbar";
export const HomePage: React.FC = () => {


  return (
    <div>
      <Navbar />
      <main className="max-w-4xl  mx-auto p-6">
        <h1 className="text-3xl  font-bold mb-4">Welcome to the Application, !</h1>
      </main>
    </div>
  );
};
