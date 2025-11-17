/* src/components/Cart.jsx */

import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const total = cart
    .reduce((sum, p) => sum + p.price * (p.quantity || 1), 0)
    .toFixed(2);

  if (cart.length === 0) {
    return (
      <div className="text-center mt-6">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <Link to="/" className="text-flowBlue underline">
          Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Carrito</h2>

      <div className="space-y-4">
        {cart.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white/5 p-4 rounded-lg shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-20 w-20 object-contain rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-white">{item.name}</h3>
              <p className="text-sm text-gray-300">${item.price} c/u</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => {
                  const value = Math.max(1, Number(e.target.value));
                  updateQuantity(item.id, value);
                }}
                className="w-16 p-1 text-black rounded"
              />

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-flowRed underline"
              >
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between p-4 bg-white/10 rounded-lg">
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded"
        >
          Vaciar carrito
        </button>

        <div>
          <p className="text-lg font-bold">Total: ${total}</p>
          <button className="mt-2 px-4 py-2 bg-flowBlue text-black font-semibold rounded">
            Ir a pagar
          </button>
        </div>
      </div>
    </div>
  );
}
