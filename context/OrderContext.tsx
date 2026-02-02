import { createContext, ReactNode, useMemo, useState } from "react";
import { CartItem } from "./CartContext";

export type PaymentMethod = "cod" | "card";

export type OrderRecord = {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  address: string;
  coords?: {
    latitude: number;
    longitude: number;
  };
  placedAt: string;
};

export type OrdersContextValue = {
  orders: OrderRecord[];
  addOrder: (order: Omit<OrderRecord, "id" | "placedAt">) => void;
};

export const OrdersContext = createContext<OrdersContextValue | undefined>(
  undefined,
);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  const addOrder: OrdersContextValue["addOrder"] = (order) => {
    setOrders((prev) => [
      {
        ...order,
        id: `order-${Date.now()}`,
        placedAt: new Date().toISOString(),
        items: order.items.map((item) => ({ ...item })),
      },
      ...prev,
    ]);
  };

  const value = useMemo(
    () => ({
      orders,
      addOrder,
    }),
    [orders],
  );

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};
