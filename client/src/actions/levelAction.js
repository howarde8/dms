import axios from "axios";
import {
  GET_ALL_LEVELS,
  ADD_LEVEL_SUCCESS,
  ADD_LEVEL_FAILURE,
  DELETE_LEVEL_SUCCESS,
  DELETE_LEVEL_FAILURE,
  OPEN_LEVEL_EDIT_FORM,
  CLOSE_LEVEL_EDIT_FORM,
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

export const openEditForm = (editingLevel, editingIndex) => dispatch => {
  dispatch({ type: OPEN_LEVEL_EDIT_FORM, editingLevel, editingIndex });
};

export const closeEditForm = () => dispatch => {
  dispatch({ type: CLOSE_LEVEL_EDIT_FORM });
};

export const updateLevel = (fromName, toName) => async dispatch => {
  try {
    await axios.put(`/api/level/${fromName}`, { name: toName });
    dispatch({
      type: UPDATE_LEVEL_SUCCESS,
      level: { name: toName }
    });
  } catch (err) {
    dispatch({ type: UPDATE_LEVEL_FAILURE, error: err.response.data.error });
  }
};
