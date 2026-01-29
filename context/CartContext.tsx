import { createContext, ReactNode, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  quantity: number;
};

type AddToCartPayload = {
  name: string;
  description: string;
  price: number;
  image?: string;
  quantity?: number;
};

export type CartContextValue = {
  items: CartItem[];
  addToCart: (item: AddToCartPayload) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
};

export const CartContext = createContext<CartContextValue | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = ({
    name,
    description,
    price,
    image,
    quantity = 1,
  }: AddToCartPayload) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.name === name);
      if (existing) {
        return prev.map((entry) =>
          entry.name === name
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry,
        );
      }

      const newItem: CartItem = {
        id: `${name}-${Date.now()}`,
        name,
        description,
        price,
        image,
        quantity,
      };

      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
