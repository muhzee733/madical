// src/reducers/slotsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slots: [],
};

const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    setSlots: (state, action) => {
      state.slots = action.payload; // Set slots fetched from Firebase
    },
    resetSlots: (state) => {
      state.slots = []; // Reset slots if needed
    },
  },
});

export const { setSlots, resetSlots } = slotsSlice.actions;
export default slotsSlice.reducer;
