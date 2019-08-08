import axios from "axios";
import {
  GET_USER_ME,
  GET_ALL_USERS,
  UPDATE_USER_ME_SUCCESS,
  UPDATE_USER_ME_FAILURE,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  OPEN_USER_EDIT_FORM,
  CLOSE_USER_EDIT_FORM,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from "./types";

export const getUserMe = () => async dispatch => {
  const res = await axios.get("/api/user");
  dispatch({ type: GET_USER_ME, me: res.data });
};

export const updateUserMe = ({ name, email }) => async dispatch => {
  try {
    await axios.put(`/api/user/info`, { name, email });
    const res = await axios.get(`/api/user`);
    dispatch({
      type: UPDATE_USER_ME_SUCCESS,
      me: res.data
    });
  } catch (err) {
    dispatch({ type: UPDATE_USER_ME_FAILURE, error: err.response.data.error });
  }
};

export const getAllUsers = () => async dispatch => {
  const res = await axios.get("/api/users");
  dispatch({ type: GET_ALL_USERS, users: res.data });
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
    dispatch({ type: ADD_USER_SUCCESS, user: res.data });
  } catch (err) {
    dispatch({ type: ADD_USER_FAILURE, error: err.response.data.error });
  }
};

export const deleteUser = (username, tableIdx) => async dispatch => {
  try {
    await axios.delete(`/api/user/${username}`);
    dispatch({ type: DELETE_USER_SUCCESS, tableIdx });
  } catch (err) {
    dispatch({ type: DELETE_USER_FAILURE, error: err.response.data.error });
  }
};

export const openEditForm = (editingUser, editingIndex) => dispatch => {
  dispatch({ type: OPEN_USER_EDIT_FORM, editingUser, editingIndex });
};

export const closeEditForm = () => dispatch => {
  dispatch({ type: CLOSE_USER_EDIT_FORM });
};

export const updateUser = ({
  username,
  name,
  level,
  email
}) => async dispatch => {
  try {
    await axios.put(`/api/user/info/${username}`, { name, level, email });
    const res = await axios.get(`/api/user/${username}`);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      user: res.data
    });
  } catch (err) {
    dispatch({ type: UPDATE_USER_FAILURE, error: err.response.data.error });
  }
};
