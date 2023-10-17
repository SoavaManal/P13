import { combineReducers } from "redux";
import authReducer from "./jwt.reducer";

export default combineReducers({
  //Reducers
  authReducer,
});
