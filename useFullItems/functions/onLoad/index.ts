import { checkCommit } from "./checkCommit";
import { fetchAndStoreOrders } from "./fetchAndStoreFunctions";
import { mqttConnect } from "./mqttConnect";

export const onLoad = async (restaurantId: string) => {
  await checkCommit();
  mqttConnect(restaurantId);
  await fetchAndStoreOrders();
};
