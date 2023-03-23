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
      pushInOrderContainer(message);
      break;

    case "updateOrder":
      updateOrder(message);
      break;

    case "cardDishOrder":
      pushBulkOrder(message);
      break;

    default:
      console.log(props);
      break;
  }
};
