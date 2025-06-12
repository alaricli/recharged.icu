"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Cart } from "../types";

type CartContextType = {
  cart: Cart | null;
  setCart: (cart: Cart | null) => void;
  updateCart: (sku: string, quantity: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(null);

  async function fetchCart() {
    console.log("fetching cart");
    try {
      const response = await fetch("http://localhost:8080/api/user/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 401) {
        setCart(null);
        return;
      }

      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart", error);
      setCart(null);
    }
  }

  async function updateCart(sku: string, quantity: number) {
    try {
      const response = await fetch("http://localhost:8080/api/user/cart/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ sku, quantity }),
      });

      if (response.status === 401) {
        return;
      }

      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error updating cart", error);
    }

  }

  useEffect(() => {
    try {
      fetchCart();
    } catch (error) {
      console.error("Error fetching cart", error);
    }

  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
}