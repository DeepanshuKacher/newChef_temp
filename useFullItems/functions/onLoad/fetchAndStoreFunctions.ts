import { axiosGetFunction } from "../../axios";
import { action_types, store } from "../../redux-store";

export const fetchAndStoreOrders = async () => {
  const data = await axiosGetFunction({
    parentUrl: "orders",
  });

  if (data) store.dispatch(action_types.storeDishOrders(data));
};
