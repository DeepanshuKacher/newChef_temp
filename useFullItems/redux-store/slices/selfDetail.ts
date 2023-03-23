import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialDataTypes {
  defaultValues: {
    name: string;
    id: string;

    // waiters: Waiter[];
  };
}

const initialState: InitialDataTypes | undefined = {
  defaultValues: {
    id: "",
    name: "",
  },
};

export type SelfDataType = typeof initialState.defaultValues;

const selfInfo = createSlice({
  name: "selfInfo",
  initialState,
  reducers: {
    loadSelfData: (state, action: PayloadAction<SelfDataType>) => {
      state.defaultValues = action.payload;
    },
  },
});

export const { loadSelfData } = selfInfo.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default selfInfo.reducer;
