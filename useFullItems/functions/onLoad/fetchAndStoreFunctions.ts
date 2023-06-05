import { axiosGetFunction } from "../../axios";
import { action_types, store } from "../../redux-store";

export const fetchAndStoreOrders = async () => {
  const data = await axiosGetFunction({
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
