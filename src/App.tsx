import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <img
                src={logo || "/placeholder.svg"}
                className="h-40 animate-spin"
                alt="logo"
              />
              <p className="text-xl font-semibold ml-4">
                Tailwind CSS is working if this text is styled!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
