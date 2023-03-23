import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Order {
  dishId: string;
  orderedBy: string;
  orderId: string;
  restaurantId: string;
  tableNumber: string;
  tableSectionId: string;
  user_description?: string;
  size: "Large" | "Medium" | "Small";
  fullQuantity?: number;
  halfQuantity?: number;

  chefAssign: string | undefined;
  completed: boolean;
}

interface InitialDataTypes {
  orders: Order[];
}

const initialState: InitialDataTypes = {
  orders: [],
};

const orderContainer = createSlice({
  name: "orderContainer",
  initialState,
  reducers: {
    storeDishOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    pushInOrderContainer: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
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

      state.orders[index].completed = true;
    },

    pushBulkOrder: (state, action: PayloadAction<Order[]>) => {
      state.orders.push(...action.payload);
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
