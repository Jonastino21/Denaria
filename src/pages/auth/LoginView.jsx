import React from 'react';
import DenariaLogo from "../../assets/denaria_ico.png"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full p-7 bg-white shadow-md rounded-lg">
        <div className="flex justify-center mb-0"> 
          <a href="/" className="flex items-center">
            <img src={DenariaLogo} alt="Logo denaria" className="w-24 h-24 m-0 p-0 block" />
          </a>
        </div>

        <h4 className="text-center text-2xl font-bold mb-4">Denaria</h4>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="text"
              id="email"
              name="email-username"
              placeholder="Entrer votre adresse email"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">Mot de passe</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••••"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                <i className="ti ti-eye-off"></i>
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-700">Se souvenir de moi</span>
            </label>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
            Se connecter
          </button>


          <div className=' text-center'>
                <a href="/forgot-password" className="text-primary hover:underline ">Mot de passe oublié ?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
