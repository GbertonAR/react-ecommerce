/* src/components/ProductCard.jsx */

import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Compatibilidad por si MockAPI usa "name" y FakeStore usa "title"
  const name = product.name || product.title;
  const img = product.image;
  const description = product.description || "";
  const price = Number(product.price) || 0;

  return (
    <div className="bg-flowDark2 p-4 rounded-xl shadow-md border border-flowBlue/20 hover:border-flowBlue/40 transition flex flex-col">
      
      {/* Imagen */}
      <Link to={`/product/${product.id}`} className="mb-3">
        <img
          src={img}
          alt={name}
          className="h-40 w-full object-contain rounded"
        />
      </Link>

      {/* Título */}
      <h3 className="text-sm font-semibold text-white mb-2 line-clamp-1">
        {name}
      </h3>

      {/* Descripción */}
      <p className="text-xs text-flowGray mb-3 line-clamp-2">
        {description}
      </p>

      {/* Precio + Botón */}
      <div className="mt-auto flex items-center justify-between">
        <span className="font-bold text-flowBlue text-lg">
          ${price}
        </span>

        <button
          onClick={() => addToCart(product, 1)}
          className="bg-flowPurple text-white px-4 py-1.5 rounded-lg 
                     hover:bg-flowMagenta transition 
                     shadow-md shadow-flowPurple/30"
        >
          Añadir
        </button>
      </div>
    </div>
  );
}
