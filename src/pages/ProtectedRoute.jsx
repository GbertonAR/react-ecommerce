/* src/pages/ProtectedRoute.jsx */
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roleRequired }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  // No autenticado
  if (!user) return <Navigate to="/login" replace />;

  // Si requiere rol de admin
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children;
}
