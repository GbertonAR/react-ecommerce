import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("flow_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("flow_cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product, qty = 1) {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(p => p.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  function updateQuantity(productId, quantity) {
    setCart(prev =>
      prev.map(p => (p.id === productId ? { ...p, quantity } : p))
    );
  }

  const value = { cart, addToCart, removeFromCart, clearCart, updateQuantity };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
