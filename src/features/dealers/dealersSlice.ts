import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IDealersState {
  dealers: string[];
}

const initialState: IDealersState = {
  dealers: [],
};

export const dealersSlice = createSlice({
  name: "dealers",
  initialState,
  reducers: {
    setDealers: (state, action: PayloadAction<IDealersState>) => {
      state.dealers = action.payload.dealers;
    },
  },
});

export const { setDealers } = dealersSlice.actions;
export default dealersSlice.reducer;
