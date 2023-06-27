import { checkCommit } from "./checkCommit";
import {
  fetchAndStoreKot,
  fetchAndStoreOrders,
} from "./fetchAndStoreFunctions";
import { mqttConnect } from "./mqttConnect";

export const onLoad = async (restaurantId: string) => {
  await checkCommit();
  const fetchAndStoreOrdersPromise = fetchAndStoreOrders();
  // const fetchAndStoreKotPromise = fetchAndStoreKot();
  await mqttConnect(restaurantId);

  await Promise.all([fetchAndStoreOrdersPromise]);
};
