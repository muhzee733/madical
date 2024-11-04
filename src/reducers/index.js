// slices/index.js
import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

// Example slice
const exampleSlice = createSlice({
  name: 'example',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Export actions
export const { increment, decrement } = exampleSlice.actions;

// Combine reducers (if you have more)
const rootReducer = combineReducers({
  example: exampleSlice.reducer,
  // add other reducers here
});

export default rootReducer;
