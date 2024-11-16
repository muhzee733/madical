// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    userData: null,
    online: false
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
      state.online = action.payload;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.online = false;
    }
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
