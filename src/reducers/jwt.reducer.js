// // ajouter le token qui existe dans le localStorage
// const tokenLs = localStorage.getItem("token");
// const initialState = { token: tokenLs ? tokenLs : null };

// export default function authReducer(state = initialState, action) {
//   switch (action.type) {
//     case "SET_TOKEN":
//       return {
//         ...state,
//         token: action.payload,
//       };
//     default:
//       return state;
//   }
// }

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
