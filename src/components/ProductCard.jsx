import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white/9 p-4 rounded-lg shadow-sm flex flex-col">
      <Link to={`/product/${product.id}`} className="mb-3">
        <img src={product.image} alt={product.title} className="h-40 w-full object-contain" />
      </Link>
      <h3 className="text-sm font-semibold mb-2">{product.title}</h3>
      <p className="text-xs text-gray-300 mb-3 line-clamp-2">{product.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-bold">${product.price}</span>
        <button
          onClick={() => addToCart(product, 1)}
          className="bg-flowBlue text-black px-3 py-1 rounded hover:opacity-90"
        >
          Añadir
        </button>
      </div>
    </div>
  );
}
