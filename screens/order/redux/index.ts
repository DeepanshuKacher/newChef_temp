import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reloadAsync } from "expo-updates";
import { Alert } from "react-native";
import { Kot } from "../../../useFullItems/functions/onLoad/fetchAndStoreFunctions";

export interface Order {
  dishId: string;
  orderId: string;
  tableNumber: string; //here in this app it is string
  tableSectionId: string;
  user_description?: string;
  orderedBy: string;
  size: "large" | "medium" | "small";
  fullQuantity?: string;
  halfQuantity?: string;
  chefAssign?: string;
  completed?: string;
  createdAt: string;
}

interface InitialDataTypes {
  orders: Kot[];
  // noRepeatContainer: { [orderId: Kot["id"]]: Kot };
  totalTodayOrder: number;
  // kot: string[][];
}

const initialState: InitialDataTypes = {
  orders: [],
  // noRepeatContainer: {},
  totalTodayOrder: 0,
  // kot: [[]],
};

const orderContainer = createSlice({
  name: "orderContainer",
  initialState,
  reducers: {
    storeDishOrders: (state, action: PayloadAction<Kot[]>) => {
      // console.log(action.payload);
      // state.orders = action.payload;
      // for (let x of state.orders) {
      //   state.noRepeatContainer[x.orderId] = x;
      // }
      // const todaysDate = new Date().getDate();
      // state.totalTodayOrder = state.orders.reduce((acc, currentValue) => {
      //   if (new Date(currentValue.createdAt).getDate() === todaysDate)
      //     return acc + 1;
      //   else return acc;
      // }, 0);
      state.orders = action.payload;
    },
    pushInOrderContainer: (state, action: PayloadAction<Kot>) => {
      // if (state.noRepeatContainer[order.orderId] === undefined) {
      //   state.orders.push(order);
      //   state.totalTodayOrder++;
      //   state.noRepeatContainer[order.orderId] = order;
      // }
      // if (state.totalTodayOrder !== orderNo) {
      //   Alert.alert("Please reload for fresh content", undefined, [
      //     {
      //       text: "Reload",
      //       onPress: async () => await reloadAsync(),
      //     },
      //   ]);
      // }
      state.orders.push(action.payload);
    },
    acceptOrder: (
      state,
      action: PayloadAction<{ chefId: string; orderId: string }>
    ) => {
      const { chefId, orderId } = action.payload;
      const index = state.orders.findIndex((item) => item.id === orderId);
      state.orders[index].value.chefAssign = chefId;
    },

    rejectOrder: (state, action: PayloadAction<{ orderId: string }>) => {
      const { orderId } = action.payload;
      const index = state.orders.findIndex((item) => item.id === orderId);
      state.orders[index].value.chefAssign = "";
    },

    completedOrder: (state, action: PayloadAction<{ orderId: string }>) => {
      const { orderId } = action.payload;
      const index = state.orders.findIndex((item) => item.id === orderId);
      state.orders[index].value.completed = 1;
    },

    pushBulkOrder: (
      state,
      action: PayloadAction<{
        orderArray: Order[];
        orderNo: number;
      }>
    ) => {
      // const { orderArray, orderNo } = action.payload;
      // const newOrderArray: Order[] = [];
      // for (let x of orderArray) {
      //   if (state.noRepeatContainer[x.orderId] === undefined) {
      //     newOrderArray.push(x);
      //     state.noRepeatContainer[x.orderId] = x;
      //   }
      // }
      // orderArray.filter(
      //   (order) => state.noRepeatContainer[order.orderId] === undefined
      // );
      // state.orders.push(...newOrderArray);
      // state.totalTodayOrder += newOrderArray.length;
      // if (state.totalTodayOrder !== action.payload.orderNo) {
      //   Alert.alert("Please reload for fresh content", undefined, [
      //     {
      //       text: "Reload",
      //       onPress: async () => await reloadAsync(),
      //     },
      //   ]);
      // }
    },
    storeKot: (state, action) => {
      // state.kot = action?.payload || [[]];
    },
    pushKotStore: (state, action: PayloadAction<string[]>) => {
      // state.kot.push(action.payload);
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
  storeKot,
  pushKotStore,
} = orderContainer.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default orderContainer.reducer;
