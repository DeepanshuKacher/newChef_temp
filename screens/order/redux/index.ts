import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reloadAsync } from "expo-updates";
import { Alert } from "react-native";

export interface Order {
  dishId: string;
  orderId: string;
  tableNumber: string; //here in this app it is string
  tableSectionId: string;
  user_description?: string;
  orderedBy: string;
  size: "Large" | "Medium" | "Small";
  fullQuantity?: number;
  halfQuantity?: number;
  chefAssign?: string;
  completed?: string;
  createdAt: string;
}

interface InitialDataTypes {
  orders: Order[];
  noRepeatContainer: { [orderId: Order["orderId"]]: Order };
}

const initialState: InitialDataTypes = {
  orders: [],
  noRepeatContainer: {},
};

const orderContainer = createSlice({
  name: "orderContainer",
  initialState,
  reducers: {
    storeDishOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      for (let x of state.orders) {
        state.noRepeatContainer[x.orderId] = x;
      }
    },
    pushInOrderContainer: (
      state,
      action: PayloadAction<{
        order: Order;
        orderNo: number;
      }>
    ) => {
      const { order, orderNo } = action.payload;
      if (state.noRepeatContainer[order.orderId] === undefined)
        state.orders.push(action.payload.order);

      const todaysDate = new Date().getDate();
      const totalTodaysOrder = state.orders.reduce((acc, currentValue) => {
        if (new Date(currentValue.createdAt).getDate() === todaysDate)
          return acc + 1;
        else return acc;
      }, 0);

      if (totalTodaysOrder !== action.payload.orderNo) {
        Alert.alert("Please reload for fresh content", undefined, [
          {
            text: "Reload",
            onPress: async () => await reloadAsync(),
          },
        ]);
      }
    },
    acceptOrder: (
      state,
      action: PayloadAction<{ chefId: string; orderId: string }>
    ) => {
      const { chefId, orderId } = action.payload;
      const index = state.orders.findIndex((item) => item.orderId === orderId);

      state.orders[index].chefAssign = chefId;
    },

    rejectOrder: (state, action: PayloadAction<{ orderId: string }>) => {
      const { orderId } = action.payload;
      const index = state.orders.findIndex((item) => item.orderId === orderId);

      state.orders[index].chefAssign = undefined;
    },

    completedOrder: (state, action: PayloadAction<{ orderId: string }>) => {
      const { orderId } = action.payload;
      const index = state.orders.findIndex((item) => item.orderId === orderId);

      // state.orders[index].completed = true;
      state.orders[index].completed = "Completed";
    },

    pushBulkOrder: (
      state,
      action: PayloadAction<{
        orderArray: Order[];
        orderNo: number;
      }>
    ) => {
      const { orderArray, orderNo } = action.payload;
      const newOrderArray = orderArray.filter(
        (order) => state.noRepeatContainer[order.orderId] === undefined
      );
      state.orders.push(...newOrderArray);

      const todaysDate = new Date().getDate();
      const totalTodaysOrder = state.orders.reduce((acc, currentValue) => {
        if (new Date(currentValue.createdAt).getDate() === todaysDate)
          return acc + 1;
        else return acc;
      }, 0);

      if (totalTodaysOrder !== action.payload.orderNo) {
        Alert.alert("Please reload for fresh content", undefined, [
          {
            text: "Reload",
            onPress: async () => await reloadAsync(),
          },
        ]);
      }
    },
  },
});

export const {
  storeDishOrders,
  acceptOrder,
  completedOrder,
  rejectOrder,
  pushBulkOrder,
  pushInOrderContainer,
} = orderContainer.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default orderContainer.reducer;
