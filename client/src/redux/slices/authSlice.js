import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || '', 
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); 
    },
    logout: (state) => {
      state.token = '';
      localStorage.removeItem('token'); 
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
