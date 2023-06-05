import { checkCommit } from "./checkCommit";
import {
  fetchAndStoreKot,
  fetchAndStoreOrders,
} from "./fetchAndStoreFunctions";
import { mqttConnect } from "./mqttConnect";

export const onLoad = async (restaurantId: string) => {
  await checkCommit();
  mqttConnect(restaurantId);
  const fetchAndStoreOrdersPromise = fetchAndStoreOrders();
  const fetchAndStoreKotPromise = fetchAndStoreKot();

  await Promise.all([fetchAndStoreOrdersPromise, fetchAndStoreKotPromise]);
};
