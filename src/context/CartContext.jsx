// src/context/CartContext.jsx
import React, { createContext, useContext, useMemo, useReducer } from "react";

/**
 * CartContext (Clean + Scalable)
 * - useReducer for predictable updates
 * - Derived values via useMemo (totalPrice, totalItems)
 * - Safe helpers: setQty, clearCart, getItemQty
 */

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider />");
  return ctx;
};

const ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
  SET_QTY: "SET_QTY",
  CLEAR: "CLEAR",
};

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      const item = action.payload;
      const found = state.find((x) => x.id === item.id);

      if (found) {
        return state.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        );
      }

      return [...state, { ...item, qty: 1 }];
    }

    case ACTIONS.REMOVE: {
      const id = action.payload;
      return state.filter((x) => x.id !== id);
    }

    case ACTIONS.INCREASE: {
      const id = action.payload;
      return state.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x));
    }

    case ACTIONS.DECREASE: {
      const id = action.payload;
      return state.map((x) =>
        x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x
      );
    }

    case ACTIONS.SET_QTY: {
      const { id, qty } = action.payload;
      const nextQty = Math.max(1, Number(qty) || 1);
      return state.map((x) => (x.id === id ? { ...x, qty: nextQty } : x));
    }

    case ACTIONS.CLEAR:
      return [];

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Actions
  const addToCart = (item) => dispatch({ type: ACTIONS.ADD, payload: item });
  const removeFromCart = (id) =>
    dispatch({ type: ACTIONS.REMOVE, payload: id });
  const increaseQty = (id) =>
    dispatch({ type: ACTIONS.INCREASE, payload: id });
  const decreaseQty = (id) =>
    dispatch({ type: ACTIONS.DECREASE, payload: id });

  const setQty = (id, qty) =>
    dispatch({ type: ACTIONS.SET_QTY, payload: { id, qty } });

  const clearCart = () => dispatch({ type: ACTIONS.CLEAR });

  // Derived values (premium UX helpers)
  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 0), 0),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + (item.qty || 0), 0),
    [cart]
  );

  const getItemQty = (id) => cart.find((x) => x.id === id)?.qty || 0;

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      setQty,
      clearCart,
      totalPrice,
      totalItems,
      getItemQty,
    }),
    [cart, totalPrice, totalItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;