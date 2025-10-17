// src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

// 1. Create Context
const CartContext = createContext();

// 2. Provider Component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (item, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        // Update quantity if item already in cart
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    toast.success(`${item.crop} added to cart!`);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    toast.info(`Item removed from cart`);
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };

  // Update quantity of a cart item
  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
    .toFixed(2);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom Hook for easier usage
export const useCart = () => useContext(CartContext);
