/* src/pages/Home.jsx */

import React, { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // PAGINACIÓN
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await getProducts();
        setProducts(res.data);
        setFiltered(res.data);
      } catch (err) {
        setError("Error cargando productos.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // BÚSQUEDA EN VIVO
  useEffect(() => {
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setPage(1);
  }, [search, products]);

  // PAGINAR RESULTADOS
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginated = filtered.slice(start, end);

  if (loading) return <div className="text-center">Cargando productos...</div>;
  if (error) return <div className="text-center text-red-400">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Productos</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-lg bg-[#1e1e2f] border border-flowBlue text-white"
      />

      {/* GRID DE PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginated.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-flowBlue text-black rounded disabled:opacity-30"
        >
          Anterior
        </button>

        <button
          disabled={end >= filtered.length}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-flowBlue text-black rounded disabled:opacity-30"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
