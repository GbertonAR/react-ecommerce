/* src/pages/Login.jsx */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Completá ambos campos.");
      return;
    }

    const result = login(email, password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    //toast.success("Bienvenido!");

    // Redirección según rol desde AuthContext
    const savedUser = JSON.parse(localStorage.getItem("flow_user"));

    navigate(savedUser.role === "admin" ? "/create-product" : "/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-flowDark via-[#090928] to-[#0a0a18] text-white">
      <div className="relative bg-[#111121]/90 backdrop-blur-md border border-flowBlue/40 shadow-[0_0_20px_rgba(0,187,249,0.4)] p-8 rounded-3xl w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-flowBlue to-flowPurple bg-clip-text text-transparent">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-flowBlue">
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="tu@correo.com"
              className="w-full p-3 rounded-lg bg-[#1a1a2e] border border-flowBlue/60 text-white placeholder-gray-400 
              focus:border-flowPurple focus:ring-2 focus:ring-flowPurple/70 outline-none transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-flowBlue">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="••••••••"
              className="w-full p-3 rounded-lg bg-[#1a1a2e] border border-flowBlue/60 text-white placeholder-gray-400 
              focus:border-flowPurple focus:ring-2 focus:ring-flowPurple/70 outline-none transition-all duration-200"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-flowBlue via-flowPurple to-flowRed text-white font-semibold 
            shadow-lg hover:shadow-[0_0_15px_rgba(155,93,229,0.6)] transition-all duration-200"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
