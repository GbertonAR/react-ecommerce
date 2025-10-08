import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setError("No se encontró el producto"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div>
        <img src={product.image} alt={product.title} className="w-full h-96 object-contain" />
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-300 mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-4">${product.price}</p>
        <div className="flex gap-3">
          <button onClick={() => addToCart(product, 1)} className="px-4 py-2 bg-flowBlue text-black rounded">Añadir al carrito</button>
        </div>
      </div>
    </div>
  );
}
