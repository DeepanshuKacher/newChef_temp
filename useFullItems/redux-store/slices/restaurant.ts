import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Dish {
  [id: string]: string;
}

export interface Table {
  id: string;
  name: string;
  prefix?: string;
  suffix?: string;
  startNumber: number;
  endNumber: number;
}

// interface Waiter {
//   id: string;
//   name: string;
//   passportPhoto?: string;
//   MobileNumber?: number;
//   verified: boolean;
//   available: boolean;
// }

interface InitialDataTypes {
  defaultValues: {
    name: string;
    city: string;
    id: string;
    tables: Table[];
    dishesh: Dish;
    // waiters: Waiter[];
  };
}

const initialState: InitialDataTypes | undefined = {
  defaultValues: {
    name: "",
    city: "",
    id: "",
    tables: [],
    dishesh: {},
    // waiters: [],
  },
};

export type RestaurantSliceType = typeof initialState.defaultValues;

const restaurantInfoSlice = createSlice({
  name: "restaurantInfo",
  initialState,
  reducers: {
    updateRestaurantInfo: (
      state,
      action: PayloadAction<RestaurantSliceType>
    ) => {
      state.defaultValues = action.payload;
    },
  },
});

export const { updateRestaurantInfo } = restaurantInfoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default restaurantInfoSlice.reducer;
