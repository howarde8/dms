import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import levelReducer from "./levelReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  level: levelReducer
});
