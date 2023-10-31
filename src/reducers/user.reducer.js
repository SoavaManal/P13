import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateFirstname: (state, action) => {
      state.user.firstName = action.payload;
    },
    updateLastname: (state, action) => {
      state.user.lastName = action.payload;
    },
  },
});

export const { setUser, updateFirstname, updateLastname } = userReducer.actions;
export default userReducer.reducer;
