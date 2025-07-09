// 📁 LoginPage.jsx (authentification avec token JWT)

import React, { useState } from 'react';
import DenariaLogo from "../../assets/denaria_ico.png";
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/Auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    console.log("Email: "+email)
    console.log("Password: "+password)
    try {
      const response = await login(email, password);

       const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json(); // Parse la réponse JSON

          console.log(data); // Affiche la réponse pour déboguer
          console.log("Response: "+response)
          console.log("Response DATA: "+response.data)
          const token = response.data.token;
          localStorage.setItem('authToken', token);
        }       

      navigate('/admin'); // ou une autre route protégée
    } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message); // message détaillé du backend
        } else {
          setError('Email ou mot de passe invalide.');
        }
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full p-10 bg-white shadow-md rounded-lg">
        <div className="flex justify-center mb-0">
          <a href="/" className="flex items-center">
            <img src={DenariaLogo} alt="Logo denaria" className="w-24 h-24 m-0 p-0 block" />
          </a>
        </div>

        <h4 className="text-center text-2xl font-bold mb-4">DENARIA</h4>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                <i className="ti ti-eye-off"></i>
              </span>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
            Se connecter
          </button>

          <div className=' text-center'>
            <a href="/forgot-password" className="text-primary hover:underline">Mot de passe oublié ?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
