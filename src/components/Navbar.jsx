/* components/Navbar.jsx */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalCount = cart.reduce((sum, p) => sum + (p.quantity || 0), 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-flowPurple via-flowBlue to-flowMagenta p-4 rounded-lg shadow-md mb-6">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        
        {/* LOGO */}
        <Link
          to="/"
          className="text-white font-bold text-xl hover:opacity-90 transition"
        >
          FlowState <span className="font-extrabold">Ecommerce</span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-white font-medium hover:text-flowDark transition"
          >
            Productos
          </Link>

          {/* Ruta de prueba */}
          {/* <Link
            to="/protected"
            className="text-white font-medium hover:text-flowDark transition"
          >
            Protegido
          </Link> */}

          {/* Usuario común → Carrito */}
          {user?.role === "user" && (
            <Link
              to="/cart"
              className="relative text-white font-medium hover:text-flowDark transition"
            >
              Carrito
              <span className="ml-2 inline-block bg-flowRed text-xs text-white rounded-full px-2 py-0.5">
                {totalCount}
              </span>
            </Link>
          )}

          {/* Admin → Crear y Panel */}
          {user?.role === "admin" && (
            <>
              {/* <Link
                to="/create-product"
                className="text-white font-medium hover:text-flowDark transition"
              >
                Crear Producto
              </Link> */}

              <Link
                to="/admin/products"
                className="text-white font-medium hover:text-flowDark transition"
              >
                Panel Admin
              </Link>

              <Link
                to="/admin/dashboard"
                className="text-white font-medium hover:text-flowBlue transition"
              >
                Dashboard
              </Link>

            </>
          )}

          {/* Si NO hay sesión → Login */}
          {!user && (
            <Link
              to="/login"
              className="text-white font-medium hover:text-flowDark transition"
            >
              Login
            </Link>
          )}

          {/* Si hay sesión → Email + Logout */}
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/80 italic">
                {user.email}
              </span>

              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 text-white font-semibold px-3 py-1 rounded-md text-sm transition"
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
