import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  FETCH_USER
} from "../actions/types";
import { message } from "antd";

const initialState = {
  logged: false,
  loading: true,
  errMsg: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload || false };
    case LOGIN_BEGIN:
      return { ...state, logged: false, loading: true };
    case LOGIN_SUCCESS:
      message.success("Login Successful");
      return { ...state, logged: true, loading: false };
    case LOGIN_FAILURE:
      message.error(action.payload);
      return {
        ...state,
        logged: false,
        loading: false,
        errMsg: action.payload
      };
    case LOGOUT_BEGIN:
      return { ...state, logged: true, loading: true };
    case LOGOUT_SUCCESS:
      message.success("Logged out");
      return { ...state, logged: false, loading: false };
    case LOGOUT_FAILURE:
      message.warning("Connect to server fail");
      return { ...state, logged: false, loading: false };
    default:
      return state;
  }
}
