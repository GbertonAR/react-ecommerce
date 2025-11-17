import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("flow_user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("flow_user");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-flowDark via-[#10102A] to-[#0B0B20] border-b border-flowBlue/30 shadow-md backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-white">
        {/* Logo / Marca */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-flowBlue to-flowPurple bg-clip-text text-transparent tracking-wide hover:opacity-90 transition"
        >
          FlowState<span className="text-flowRed">AI</span>
        </Link>

        {/* Enlaces de navegación */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-flowBlue transition duration-150 font-medium"
          >
            Inicio
          </Link>

          {/* Si es usuario normal */}
          {user?.role === "user" && (
            <Link
              to="/cart"
              className="hover:text-flowBlue transition duration-150 font-medium"
            >
              Carrito
            </Link>
          )}

          {/* Si es admin */}
          {user?.role === "admin" && (
            <Link
              to="/create-product"
              className="hover:text-flowBlue transition duration-150 font-medium"
            >
              Crear Producto
            </Link>
          )}

          {/* Si no hay sesión */}
          {!user && (
            <Link
              to="/login"
              className="hover:text-flowBlue transition duration-150 font-medium"
            >
              Ingresar
            </Link>
          )}

          {/* Si hay sesión, mostrar email y logout */}
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300 italic">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-flowPurple to-flowRed text-white px-3 py-1 rounded-lg text-sm font-semibold hover:opacity-90 transition-all"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
