import { axiosGetFunction } from "../../axios";
import { action_types, store } from "../../redux-store";

export interface JsonOrder {
  completed: string;
  createdAt: string;
  dishId: string;
  fullQuantity: string;
  halfQuantity: string;
  kotId: string;
  orderedBy: string;
  orderId: string;
  restaurantId: string;
  size: "large" | "medium" | "small";
  tableNumber: string;
  tableSectionId: string;
  user_description: string;
  sessionId: string;
  chefAssign: string;
}

export interface Kot {
  id: `kot:${string}`;
  value: {
    kotId: string;
    tableSectionId: string;
    tableNumber: number;
    restaurantId: string;
    createdAt: number;
    orderedBy: string;
    completed: number;
    sessionId: string;
    chefAssign: string;
    orders: JsonOrder[];
  };
}

export const fetchAndStoreOrders = async () => {
  const data: Kot[] = await axiosGetFunction({
    parentUrl: "orders",
  });

  if (data) store.dispatch(action_types.storeDishOrders(data));
};

export const fetchAndStoreKot = async () => {
  const data = await axiosGetFunction({
    parentUrl: "kot",
  });

  if (data) store.dispatch(action_types.storeKot(data));
};
