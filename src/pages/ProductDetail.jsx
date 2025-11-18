/* pages/ProductDetail.jsx */

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("No se encontró el producto.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center">Cargando producto...</div>;
  if (error) return <div className="text-red-400 text-center">{error}</div>;
  if (!product) return null;

  const name = product.name || product.title;
  const price = Number(product.price) || 0;
  const description = product.description || "";
  const img = product.image;

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

      {/* IMAGEN */}
      <div className="bg-white/10 p-4 rounded-xl shadow">
        <img
          src={img}
          alt={name}
          className="w-full h-96 object-contain rounded"
        />
      </div>

      {/* INFO */}
      <div>
        <h1 className="text-3xl font-bold mb-2 text-flowBlue">{name}</h1>

        <p className="text-gray-300 mb-4 text-sm">{description}</p>

        <p className="text-2xl font-semibold mb-6 text-white">
          ${price}
        </p>

        <button
          onClick={() => addToCart(product, 1)}
          className="px-5 py-2 bg-flowBlue text-black rounded-lg font-semibold hover:opacity-90 transition"
        >
          Añadir al carrito
        </button>

        <div className="mt-6">
          <Link
            to="/"
            className="text-flowBlue underline text-sm hover:text-flowPurple"
          >
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
