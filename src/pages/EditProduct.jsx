/* src/pages/EditProduct.jsx */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../services/products";
import { toast } from "react-toastify";

const FALLBACK = "https://via.placeholder.com/400x300?text=Sin+imagen";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar datos del producto
  useEffect(() => {
    async function load() {
      try {
        const data = await getProductById(id);

        if (!data) {
          setError("Producto no encontrado.");
          return;
        }

        setProduct({
          name: data.name ?? "",
          price: String(data.price ?? ""),
          description: data.description ?? "",
          image: data.image ?? "",
        });

      } catch (err) {
        console.error("Error cargando producto:", err);
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const validate = () => {
    if (!product.name.trim()) return "El nombre es obligatorio.";
    if (Number(product.price) <= 0) return "El precio debe ser mayor que 0.";
    if (!product.description.trim() || product.description.length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) return setError(err);

    try {
      await updateProduct(id, {
        ...product,
        image: product.image.trim() || FALLBACK,
        price: Number(product.price),
      });

      toast.success("Producto actualizado correctamente 🔥");
      navigate("/admin/products");

    } catch (err) {
      console.error(err);
      toast.error("Hubo un error al actualizar el producto.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-white">Cargando producto...</p>;

  if (error)
    return <p className="text-center text-red-400 mt-10">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-flowDark via-[#0a0a23] to-[#101030] p-6">
      <div className="bg-[#111121]/90 backdrop-blur-md border border-flowBlue/40 shadow-[0_0_20px_rgba(0,187,249,0.3)] p-8 rounded-3xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-flowBlue to-flowPurple bg-clip-text text-transparent">
          Editar producto
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-flowBlue mb-2">
              Nombre
            </label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1a1a2e] text-white border border-flowBlue/60"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-flowBlue mb-2">
              Precio
            </label>
            <input
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1a1a2e] text-white border border-flowBlue/60"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-flowBlue mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              rows="3"
              value={product.description}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1a1a2e] text-white border border-flowBlue/60"
            />
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-flowBlue mb-2">
              Imagen (URL)
            </label>
            <input
              name="image"
              value={product.image}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1a1a2e] text-white border border-flowBlue/60"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Botón */}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-flowPurple via-flowBlue to-flowRed text-white font-semibold shadow-lg hover:shadow-[0_0_15px_rgba(155,93,229,0.6)] transition-all"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}
