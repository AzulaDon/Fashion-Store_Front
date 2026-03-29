import { useState, useEffect } from "react";

const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const exists = cart.find(p => p.id === product.id);

    if (exists) {
      const updated = cart.map(p =>
        p.id === product.id ? { ...p, qty: p.qty + 1 } : p
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const updated = cart.filter(p => p.id !== id);
    saveCart(updated);
  };

  const totalItems = cart.reduce((acc, p) => acc + p.qty, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    totalItems
  };
};

export default useCart;