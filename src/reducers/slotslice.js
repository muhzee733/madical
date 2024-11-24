import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slots: [],
};

const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    setSlots: (state, action) => {
      state.slots = action.payload;
    }
  },
});

export const { setSlots } = slotsSlice.actions;
export default slotsSlice.reducer;
