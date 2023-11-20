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
    updateName: (state, action) => {
      const { firstName, lastName } = action.payload;
      state.user.firstName = firstName;
      state.user.lastName = lastName;
    },
  },
});

export const { setUser, updateName } = userReducer.actions;
export default userReducer.reducer;
