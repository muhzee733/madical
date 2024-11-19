import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  slots: [],
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatientSlots: (state, action) => {
      state.slots = action.payload; 
    },
  },
});

export const { setPatientSlots } = patientSlice.actions;

export default patientSlice.reducer;
