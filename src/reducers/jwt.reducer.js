import { createSlice } from "@reduxjs/toolkit";

const tokenLs = localStorage.getItem("token");
const authReducer = createSlice({
  name: "auth",
  initialState: {
    token: tokenLs ? tokenLs : null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authReducer.actions;
export default authReducer.reducer;
