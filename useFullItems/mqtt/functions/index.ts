import type { Order } from "../../../screens/order/redux";
import { action_types, store } from "../../redux-store";

export const pushInOrderContainer = (orderDetail: Order) =>
  store.dispatch(action_types.pushInOrderContainer(orderDetail));

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

export const pushBulkOrder = (orders: Order[]) => {
  store.dispatch(action_types.pushBulkOrder(orders));
};
