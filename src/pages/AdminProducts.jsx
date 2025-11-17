/* src/pages/AdminProducts.jsx */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../services/products";
import { toast } from "react-toastify";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      setError("Error cargando productos");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirm = window.confirm("¿Seguro que querés eliminar este producto?");
    if (!confirm) return;

    try {
      await deleteProduct(id);
      toast.success("Producto eliminado");
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Error eliminando producto");
    }
  }

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;

  return (
    <div className="bg-[#111121]/90 p-6 rounded-2xl shadow-xl border border-flowBlue/40">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-flowBlue to-flowPurple bg-clip-text text-transparent">
          Administración de Productos
        </h1>

        <Link
          to="/create-product"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-flowPurple via-flowBlue to-flowRed text-white font-semibold shadow hover:opacity-90"
        >
          + Nuevo Producto
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#1a1a2e] text-flowBlue uppercase text-xs">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Imagen</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-b border-white/10 hover:bg-white/5 transition"
              >
                <td className="p-3">{p.id}</td>

                <td className="p-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>

                <td className="p-3">{p.name}</td>
                <td className="p-3 font-semibold">${p.price}</td>

                <td className="p-3 flex gap-3">
                  <Link
                    
                    to={`/edit-product/${p.id}`} //  ✅ CORRECCIÓN ENRUTAMIENTO
                    className="px-3 py-1 rounded bg-flowBlue text-black font-semibold hover:opacity-90"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 rounded bg-flowRed/80 text-white font-semibold hover:bg-flowRed transition"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
