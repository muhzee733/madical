// src/redux/usersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setUsers, setLoading } = usersSlice.actions;

export default usersSlice.reducer;
