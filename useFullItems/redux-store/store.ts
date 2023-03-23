import { configureStore } from "@reduxjs/toolkit";
import restaurantInfoSlice from "./slices/restaurant";
import orderContainer from "../../screens/order/redux";
import selfInfo from "./slices/selfDetail";
import globalLoader from "./slices/globalLoader";

const store = configureStore({
  reducer: { restaurantInfoSlice, orderContainer, selfInfo, globalLoader },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
