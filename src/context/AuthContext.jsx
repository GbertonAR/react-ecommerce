/* src/context/AuthContext.jsx */

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Leer usuario del localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("flow_user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Error leyendo usuario:", err);
    }
    setLoading(false);
  }, []);

  // Login real basado en Login.jsx
  function login(email, password) {
    const USERS = {
      "admin@flowstate.ai": { role: "admin", password: "admin123" },
      "user@flowstate.ai": { role: "user", password: "user123" },
    };

    const existing = USERS[email];

    if (!existing || existing.password !== password) {
      return { ok: false, message: "Credenciales incorrectas" };
    }

    const newUser = { email, role: existing.role };
    setUser(newUser);
    localStorage.setItem("flow_user", JSON.stringify(newUser));

    return { ok: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("flow_user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
