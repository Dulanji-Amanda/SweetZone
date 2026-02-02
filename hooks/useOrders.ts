import { OrdersContext } from "@/context/OrderContext";
import { useContext } from "react";

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};
