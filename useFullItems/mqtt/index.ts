import { action_types, store } from "../redux-store";
import { pushInOrderContainer, updateOrder, pushBulkOrder } from "./functions";

interface Props {
  code: string;
  message: any;
}
export const mqttFunction = (props: Props) => {
  store.dispatch(action_types.toggleGlobalLoader(false));
  const { code, message } = props;
  switch (code) {
    case "dishOrder":
      if (
        store
          .getState()
          .orderContainer.orders?.filter(
            (order) => order?.chefAssign === undefined && !order?.completed
          ).length < 4
      )
        pushInOrderContainer(message);
      break;

    case "updateOrder":
      updateOrder(message);
      break;

    case "cardDishOrder":
      if (
        store
          .getState()
          .orderContainer.orders?.filter(
            (order) => order?.chefAssign === undefined && !order?.completed
          ).length < 4
      )
        pushBulkOrder(message);
      break;

    default:
      console.log(props);
      break;
  }
};
