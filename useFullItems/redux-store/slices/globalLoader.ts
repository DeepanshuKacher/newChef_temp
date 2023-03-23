import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialDataTypes {
  defaultValues: boolean;
}

const initialState: InitialDataTypes = {
  defaultValues: false,
};

const globalLoader = createSlice({
  name: "globalLoader",
  initialState,
  reducers: {
    toggleGlobalLoader: (state, action: PayloadAction<boolean>) => {
      state.defaultValues = action.payload;
    },
  },
});

export const { toggleGlobalLoader } = globalLoader.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getRestaurantInfo = (state: RootState) => state.restaurantInfo;

export default globalLoader.reducer;
