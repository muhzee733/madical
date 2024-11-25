// reducers/appointmentsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
  },
});

export const { setAppointments } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
