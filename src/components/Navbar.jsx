import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const totalCount = cart.reduce((s, p) => s + (p.quantity || 0), 0);

  return (
    <nav className="bg-gradient-to-r from-flowPurple via-flowBlue to-flowMagenta p-4 rounded-lg shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl">
          FlowState <span className="font-extrabold">Ecommerce</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-white">Productos</Link>
          <Link to="/protected" className="text-white">Protegido</Link>
          <Link to="/cart" className="relative text-white">
            Carrito
            <span className="ml-2 inline-block bg-flowRed text-xs text-white rounded-full px-2 py-0.5">
              {totalCount}
            </span>
          </Link>
          <Link to="/login" className="text-white">Login</Link>
        </div>
      </div>
    </nav>
  );
}
