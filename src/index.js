import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Redux import
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>

  // </React.StrictMode>
);

// import {useDispatch, useSelector} from "react-redux";
// const token = useSelector((state)=>state.user.token)

// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
// navigate("/session-timed-out");
// https://reactrouter.com/en/main/hooks/use-navigate
// https://reactrouter.com/en/main/components/navigate

// import {createSlice} from "@reduxjs/toolkit";
// const userSlice = createSlice({ })
