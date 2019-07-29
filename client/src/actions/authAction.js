import axios from "axios";
import history from "../history";
import {
  FETCH_USER,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const login = (username, password) => async dispatch => {
  try {
    dispatch({ type: LOGIN_BEGIN });
    await axios.post("/api/login", {
      username,
      password
    });
    dispatch({ type: LOGIN_SUCCESS });
    history.push("/");
  } catch (err) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: "Login fail"
    });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: LOGOUT_BEGIN });
    await axios.post("/api/logout");
    dispatch({ type: LOGOUT_SUCCESS });
    history.push("/login");
  } catch (err) {
    dispatch({ type: LOGOUT_FAILURE });
  }
};
