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

    case "sessionClose":
      const messageType: { tableNumber: number; tableSectionId: string } =
        message;
      const selectTable = store
        .getState()
        .restaurantInfoSlice.defaultValues.tables.find(
          (table) => table.id === messageType.tableSectionId
        );

      toast.show(
        `Billing for ${selectTable?.prefix}${messageType.tableNumber}${selectTable?.suffix}`,
        {
          // type: "normal | success | warning | danger | custom",
          // placement: "top | bottom",
          duration: 60 * 1000,
          // offset: 30,
          // animationType: "slide-in | zoom-in",
        }
      );

      break;

    default:
      console.log(props);
      break;
  }
};
