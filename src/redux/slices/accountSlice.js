import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    userName: null,
    role: null,
  }

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const { token, userName, role } = action.payload;
      state.token = token,
      state.userName = userName,
      state.role = role
    },
    logoutAction: (state) => {
        return initialState
    }
  },
});

export const { loginAction, logoutAction } = accountSlice.actions;

export default accountSlice.reducer;
