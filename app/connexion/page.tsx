"use client"
import React, { useState } from 'react';
import Navbar from "@/app/components/navbar";

const Connexion = () => {
  const [isLogin, setIsLogin] = useState(true); 
  

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
         <Navbar />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h2>
        <form>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                placeholder="Entrez votre nom complet"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="confirm-password">
                Confirmez le mot de passe
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirmez votre mot de passe"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#60259f] text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            {isLogin ? 'Se connecter' : 'S’inscrire'}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          {isLogin ? (
            <>
              Pas encore de compte ?{' '}
              <button
                className="text-[#60259f] hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Inscrivez-vous
              </button>
            </>
          ) : (
            <>
              Déjà inscrit ?{' '}
              <button
                className="text-[#60259f] hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Connectez-vous
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Connexion;
