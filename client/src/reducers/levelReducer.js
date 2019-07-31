import {
  GET_ALL_LEVELS,
  ADD_LEVEL_SUCCESS,
  ADD_LEVEL_FAILURE,
  DELETE_LEVEL_SUCCESS,
  DELETE_LEVEL_FAILURE,
  UPDATE_LEVEL_SUCCESS,
  UPDATE_LEVEL_FAILURE
} from "../actions/types";
import { message } from "antd";

const initialState = {
  errMsg: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_LEVELS:
      return { ...state, levels: action.payload };
    case ADD_LEVEL_SUCCESS:
      message.success("Add level Successful");
      return { ...state, levels: [...state.levels, action.payload] };
    case ADD_LEVEL_FAILURE:
      message.error("Add level fail");
      return state;
    case DELETE_LEVEL_SUCCESS:
      message.success("Delete level Successful");
      return {
        ...state,
        levels: [
          ...state.levels.slice(0, action.payload.tableIdx),
          ...state.levels.slice(action.payload.tableIdx + 1)
        ]
      };
    case DELETE_LEVEL_FAILURE:
      message.error("Delete level fail");
      return state;
    default:
      return state;
  }
}
