import { useState, createContext, useContext } from "react";
import React from "react";
import { ItemsContext } from "./ItemsContext";

interface ShoppingCart {
  cartItems: { id: string; quantity: number }[];
  getItemQuantityId: (id: string) => number;
  addToShoppingCartId: (id: string) => void;
  removeFromShoppingCartId: (id: string) => void;
  getItemQuantity: () => number;
  getCartPrice: () => number;
}

interface Props {
  children: React.ReactNode;
}

// initialize the values for the context
const ShoppingCartContext = createContext<ShoppingCart>({
  cartItems: [],
  getItemQuantityId: () => -1,
  addToShoppingCartId: () => {},
  removeFromShoppingCartId: () => {},
  getItemQuantity: () => -1,
  getCartPrice: () => -1,
});

const ShoppingCartProvider = ({ children }: Props) => {
  const [cartItems, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const itemsContext = useContext(ItemsContext);

  const getItemQuantityId = (id: string) => {
    const quantity = cartItems.find(
      (cartItem: { id: string; quantity: number }) => cartItem.id === id
    )?.quantity;
    return quantity === undefined ? 0 : quantity;
  };

  const addToShoppingCartId = (id: string) => {
    const quantity = getItemQuantityId(id);
    if (quantity === 0) {
      setCart([...cartItems, { id: id, quantity: 1 }]);
    } else {
      setCart(
        cartItems.map((cartItem) =>
          cartItem.id === id
            ? { id: cartItem.id, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    }
  };

  const removeFromShoppingCartId = (id: string) => {
    const quantity = getItemQuantityId(id);
    if (quantity === 1) {
      setCart((cartItems) => cartItems.filter((item) => id !== item.id));
    } else {
      setCart(
        cartItems.map((cartItem) =>
          cartItem.id === id
            ? { id: cartItem.id, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const getItemQuantity = () => {
    let count: number = 0;
    cartItems.forEach((cartItem) => (count += cartItem.quantity));
    return count;
  };

  const getCartPrice = () => {
    let cost = 0;
    cartItems.map(async (cartItem) => {
      const item = await itemsContext.getItem(cartItem.id);
      cost += item.price * cartItem.quantity;
    });
    return cost;
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        getItemQuantityId,
        addToShoppingCartId,
        removeFromShoppingCartId,
        getItemQuantity,
        getCartPrice,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContext, ShoppingCartProvider };
