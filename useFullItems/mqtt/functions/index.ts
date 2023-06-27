import type { Order } from "../../../screens/order/redux";
import { Kot } from "../../functions/onLoad/fetchAndStoreFunctions";
import { action_types, store } from "../../redux-store";

export const pushInOrderContainer = (item: Kot) => {
  // store.dispatch(action_types.pushKotStore([item.order.orderId]));
  store.dispatch(action_types.pushInOrderContainer(item));
};

export const updateOrder = (message: {
  chefId?: string;
  orderId: string;
  orderStatus: "Accept" | "Completed" | "Remove";
}) => {
  if (message.orderStatus === "Accept") {
    store.dispatch(
      action_types.acceptOrder({
        chefId: message.chefId!,
        orderId: message.orderId,
      })
    );
  } else if (message.orderStatus === "Remove") {
    store.dispatch(action_types.rejectOrder({ orderId: message.orderId }));
  } else if (message.orderStatus === "Completed") {
    store.dispatch(action_types.completedOrder({ orderId: message.orderId }));
  }
};

export const pushBulkOrder = (orders: {
  orderArray: Order[];
  orderNo: number;
}) => {
  // console.log(orders);

  // return;

  const storeKotString: string[] = [];

  for (let x of orders.orderArray) {
    storeKotString.push(x.orderId);
  }

  store.dispatch(action_types.pushKotStore(storeKotString));

  store.dispatch(action_types.pushBulkOrder(orders));
};
