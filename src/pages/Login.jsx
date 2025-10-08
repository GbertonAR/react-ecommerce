import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (!email.trim()) {
      setError("Por favor, ingresá un correo válido.");
      return;
    }

    // simulación simple: guardamos "session" en localStorage
    localStorage.setItem("flow_user", JSON.stringify({ email }));
    navigate("/");
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-r from-flowPurple via-flowBlue to-flowMagenta p-[1px] rounded-2xl shadow-lg mt-10">
      <div className="bg-flowElectric/95 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white mb-2"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="tu@correo.com"
              className="w-full p-3 rounded-lg text-black border border-transparent focus:border-flowBlue focus:ring-2 focus:ring-flowBlue outline-none transition-all duration-150"
              required
            />
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-flowPurple via-flowBlue to-flowMagenta text-white font-semibold p-3 rounded-lg shadow-md hover:opacity-90 transition-all duration-200"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
