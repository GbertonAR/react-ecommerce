import React, { useEffect, useState } from "react";
import { getProducts } from "../services/products";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    avgPrice: 0,
    max: null,
    min: null,
  });

  useEffect(() => {
    async function load() {
      const products = await getProducts();
      const total = products.length;
      const avgPrice = (products.reduce((s, p) => s + Number(p.price), 0) / total).toFixed(2);
      const max = products.reduce((a, b) => (a.price > b.price ? a : b));
      const min = products.reduce((a, b) => (a.price < b.price ? a : b));

      setStats({ total, avgPrice, max, min });
    }
    load();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-flowBlue to-flowPurple text-transparent bg-clip-text">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="p-4 bg-flowDark2 rounded-xl shadow">
          <h2 className="text-xl">Productos totales</h2>
          <p className="text-4xl font-bold mt-2">{stats.total}</p>
        </div>

        <div className="p-4 bg-flowDark2 rounded-xl shadow">
          <h2 className="text-xl">Precio promedio</h2>
          <p className="text-4xl font-bold mt-2">${stats.avgPrice}</p>
        </div>

        <div className="p-4 bg-flowDark2 rounded-xl shadow">
          <h2 className="text-xl">Más caro</h2>
          <p className="mt-2">{stats.max?.name} — ${stats.max?.price}</p>
        </div>
      </div>

      <div className="p-4 bg-flowDark2 rounded-xl shadow mt-6">
        <h2 className="text-xl">Más barato</h2>
        <p className="mt-2">{stats.min?.name} — ${stats.min?.price}</p>
      </div>
    </div>
  );
}
