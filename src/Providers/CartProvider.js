"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const email = session?.user?.email;

  const fetchCart = useCallback(async () => {
    if (!email) return;
    setLoading(true);
    const res = await fetch(`/api/cart?email=${email}`, { cache: "no-store" });
    const data = await res.json();
    setCart(data);
    setLoading(false);
  }, [email]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider value={{ cart, loading, setCart, refetchCart: fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
