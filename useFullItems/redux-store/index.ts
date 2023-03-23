import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { updateRestaurantInfo } from "./slices/restaurant";
import { AppDispatch, RootState } from "./store";
import store from "./store";
import {
  acceptOrder,
  storeDishOrders,
  completedOrder,
  rejectOrder,
  pushBulkOrder,
  pushInOrderContainer,
} from "../../screens/order/redux";
import { loadSelfData } from "./slices/selfDetail";
import { toggleGlobalLoader } from "./slices/globalLoader";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { store };
export const action_types = {
  updateRestaurantInfo,
  storeDishOrders,
  loadSelfData,
  acceptOrder,
  completedOrder,
  rejectOrder,
  pushBulkOrder,
  pushInOrderContainer,
  toggleGlobalLoader,
};
