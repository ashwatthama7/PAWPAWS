import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  onlineUsers: [],
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { login, logout, setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
