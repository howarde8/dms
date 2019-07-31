import axios from "axios";
import {
  GET_ALL_LEVELS,
  ADD_LEVEL_SUCCESS,
  ADD_LEVEL_FAILURE,
  DELETE_LEVEL_SUCCESS,
  DELETE_LEVEL_FAILURE,
  UPDATE_LEVEL_SUCCESS,
  UPDATE_LEVEL_FAILURE
} from "./types";

export const getAllLevels = () => async dispatch => {
  const res = await axios.get("/api/levels");
  dispatch({ type: GET_ALL_LEVELS, payload: res.data });
};

export const addLevel = ({ name }) => async dispatch => {
  try {
    await axios.post("/api/level", { name });
    dispatch({ type: ADD_LEVEL_SUCCESS, payload: { name } });
  } catch (err) {
    dispatch({ type: ADD_LEVEL_FAILURE });
  }
};

export const deleteLevel = (name, tableIdx) => async dispatch => {
  try {
    await axios.delete(`/api/level/${name}`);
    dispatch({ type: DELETE_LEVEL_SUCCESS, payload: { tableIdx } });
  } catch (err) {
    dispatch({ type: DELETE_LEVEL_FAILURE });
  }
};

export const updateUser = (fromName, toName, tableIdx) => async dispatch => {
  try {
    await axios.put(`/api/level/${fromName}`, { name: toName });
    dispatch({
      type: UPDATE_LEVEL_SUCCESS,
      payload: { tableIdx }
    });
  } catch (err) {
    dispatch({ type: UPDATE_LEVEL_FAILURE });
  }
};
