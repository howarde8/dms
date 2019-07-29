import axios from "axios";
import {
  GET_ALL_USERS,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
} from "./types";

export const getAllUsers = () => async dispatch => {
  const res = await axios.get("/api/users");
  dispatch({ type: GET_ALL_USERS, payload: res.data });
};

export const addUser = ({
  username,
  password,
  name,
  level
}) => async dispatch => {
  try {
    await axios.post("/api/user", { username, password, name, level });
    const res = await axios.get(`/api/user/${username}`);
    dispatch({ type: ADD_USER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: ADD_USER_FAILURE });
  }
};

export const deleteUser = (username, tableIdx) => async dispatch => {
  try {
    await axios.delete(`/api/user/${username}`);
    dispatch({ type: DELETE_USER_SUCCESS, payload: { tableIdx } });
  } catch (err) {
    dispatch({ type: DELETE_USER_FAILURE });
  }
};
