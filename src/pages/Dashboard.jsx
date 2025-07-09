import React from 'react';

export function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-10 bg-white rounded-lg shadow">
        <h1 className="text-4xl font-bold text-green-700">Welcome to the Dashboard</h1>
        <p className="text-gray-600 mt-4">Vous êtes connecté avec succès.</p>
      </div>
    </div>
  );
}
