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
} from "../actions/types";
import { message } from "antd";

const initialState = {
  levels: [],
  isEditing: false,
  editingLevel: {},
  editingIndex: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_LEVELS:
      return { ...state, levels: action.payload };
    case ADD_LEVEL_SUCCESS:
      message.success("Add level successful");
      return { ...state, levels: [...state.levels, action.payload] };
    case ADD_LEVEL_FAILURE:
      message.error(action.error);
      return state;
    case DELETE_LEVEL_SUCCESS:
      message.success("Delete level successful");
      return {
        ...state,
        levels: [
          ...state.levels.slice(0, action.payload.tableIdx),
          ...state.levels.slice(action.payload.tableIdx + 1)
        ]
      };
    case DELETE_LEVEL_FAILURE:
      message.error(action.error);
      return state;
    case OPEN_LEVEL_EDIT_FORM:
      return {
        ...state,
        isEditing: true,
        editingLevel: action.editingLevel,
        editingIndex: action.editingIndex
      };
    case CLOSE_LEVEL_EDIT_FORM:
      return {
        ...state,
        isEditing: false
      };
    case UPDATE_LEVEL_SUCCESS:
      message.success("Add level successful");
      return {
        ...state,
        levels: [
          ...state.levels.slice(0, state.editingIndex),
          action.level,
          ...state.levels.slice(state.editingIndex + 1)
        ]
      };
    case UPDATE_LEVEL_FAILURE:
      message.error(action.error);
      return state;
    default:
      return state;
  }
}
