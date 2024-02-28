import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    userName: null,
    role: null,
    id: null,
  }

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const { token, userName, role, id } = action.payload;
      state.token = token,
      state.userName = userName,
      state.role = role,
      state.id = id
    },
    logoutAction: (state) => {
        return initialState
    }
  },
});

export const { loginAction, logoutAction } = accountSlice.actions;

export default accountSlice.reducer;
