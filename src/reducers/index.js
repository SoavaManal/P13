import { combineReducers } from "redux";
import authReducer from "./jwt.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  //Reducers
  authReducer,
  userReducer,
});
