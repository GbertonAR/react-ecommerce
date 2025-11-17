/* src/pages/CreateProduct.jsx */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/products";

export default function CreateProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!product.name.trim()) return "El nombre es obligatorio.";
    const price = Number(product.price);
    if (!price || price <= 0) return "El precio debe ser un número mayor a 0.";
    if (!product.description || product.description.trim().length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    // image is optional, but if provided, a simple URL check:
    if (product.image && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i.test(product.image)) {
      return "La URL de imagen no parece válida (debe terminar en .jpg/.png/etc).";
    }
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
    if (err) {
      setError(err);
      return;
    }

    try {
      setLoading(true);
      // Aseguramos tipos correctos para la API
      const payload = {
        name: product.name.trim(),
        price: Number(product.price),
        description: product.description.trim(),
        image: product.image?.trim() || "https://via.placeholder.com/400x300?text=Sin+imagen",
        // si necesitás campos extras, agregalos aquí
      };

      const res = await createProduct(payload);
      // res.data es el producto creado
      // Mensaje y redirección
      alert("Producto creado correctamente.");
      navigate("/"); // o a "/create-product" si querés quedarte en admin
    } catch (err) {
      console.error("Error creando producto:", err);
      setError("Ocurrió un error al crear el producto. Intentá de nuevo.");
    } finally {
      setLoading(false);
      // reset si querés limpiar el form:
      setProduct({ name: "", price: "", description: "", image: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-flowDark via-[#0a0a23] to-[#101030] p-6">
      <div className="bg-[#111121]/90 backdrop-blur-md border border-flowBlue/40 shadow-[0_0_20px_rgba(0,187,249,0.3)] p-8 rounded-3xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-flowBlue to-flowPurple bg-clip-text text-transparent">
          Crear nuevo producto
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-flowBlue mb-2">
              Nombre del producto
            </label>
            <input
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1a1a2e] text-white border border-flowBlue/60 placeholder-gray-400 focus:border-flowPurple focus:ring-2 focus:ring-flowPurple/70 outline-none transition"
              placeholder="Ej: Auriculares IA"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-flowBlue mb-2">
              Precio
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={product.price}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1a1a2e] text-white border border-flowBlue/60 placeholder-gray-400 focus:border-flowPurple focus:ring-2 focus:ring-flowPurple/70 outline-none transition"
              placeholder="Ej: 19999"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-flowBlue mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={product.description}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1a1a2e] text-white border border-flowBlue/60 placeholder-gray-400 focus:border-flowPurple focus:ring-2 focus:ring-flowPurple/70 outline-none transition"
              placeholder="Breve descripción del producto"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-flowBlue mb-2">
              URL de imagen (opcional)
            </label>
            <input
              id="image"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1a1a2e] text-white border border-flowBlue/60 placeholder-gray-400 focus:border-flowPurple focus:ring-2 focus:ring-flowPurple/70 outline-none transition"
              placeholder="https://imagen.com/producto.jpg"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className={`w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-flowPurple via-flowBlue to-flowRed text-white font-semibold shadow-lg transition-all ${loading ? "opacity-60 pointer-events-none" : "hover:shadow-[0_0_15px_rgba(155,93,229,0.6)]"}`}
          >
            {loading ? "Creando..." : "Crear producto"}
          </button>
        </form>
      </div>
    </div>
  );
}
