/* src/App.jsx */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 1. ✅ DESCOMENTAR: Importación de ToastContainer y estilos para notificaciones
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Cart from "./components/Cart";
import CreateProduct from "./pages/CreateProduct";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import EditProduct from "./pages/EditProduct";

export default function App() {
  return (
    // 2. ✅ CORRECCIÓN ESTILO GLOBAL: Aplicar el fondo y texto oscuro aquí
    <div className="bg-flowDark text-white">
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar />

              <main className="container mx-auto px-4 py-8 flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />

                  {/* Rutas Protegidas */}
                  <Route
                    path="/protected"
                    element={
                      <ProtectedRoute>
                        <div className="text-center">Sección protegida</div>
                      </ProtectedRoute>
                    }
                  />

                  {/* Rutas de Administrador */}
                  <Route
                    path="/create-product"
                    element={
                      <ProtectedRoute roleRequired="admin">
                        <CreateProduct />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute roleRequired="admin">
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/admin/products"
                    element={
                      <ProtectedRoute roleRequired="admin">
                        <AdminProducts />
                      </ProtectedRoute>
                    }
                  />

                  {/* 3. ✅ CORRECCIÓN ENRUTAMIENTO: Ruta dinámica para editar productos */}
                  <Route
                    path="/edit-product/:id"
                    element={
                      <ProtectedRoute roleRequired="admin">
                        <EditProduct />
                      </ProtectedRoute>
                    }
                  />

                  {/* Rutas de Usuario Logueado */}
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>

              {/* 4. ✅ CORRECCIÓN NOTIFICACIONES: ToastContainer global */}
              <ToastContainer
                position="top-right"
                autoClose={2500}
                theme="dark"
              />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}