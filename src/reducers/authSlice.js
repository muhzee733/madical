import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    userData: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    }
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
