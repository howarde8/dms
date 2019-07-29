import {
  GET_ALL_USERS,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
} from "../actions/types";
import { message } from "antd";

const initialState = {
  errMsg: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.payload };
    case ADD_USER_SUCCESS:
      message.success("Add user Successful");
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case ADD_USER_FAILURE:
      message.error("Add user fail");
      return { ...state };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: [
          ...state.users.slice(0, action.payload.tableIdx),
          ...state.users.slice(action.payload.tableIdx + 1)
        ]
      };
    case DELETE_USER_FAILURE:
      message.error("Delete user fail");
      return {
        ...state
      };
    default:
      return state;
  }
}
