import {
  GET_USER_ME,
  GET_ALL_USERS,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  OPEN_USER_EDIT_FORM,
  CLOSE_USER_EDIT_FORM,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_ME_SUCCESS,
  UPDATE_USER_ME_FAILURE,
  UPDATE_USER_ME_PASSWORD_SUCCESS,
  UPDATE_USER_ME_PASSWORD_FAILURE
} from "../actions/types";
import { message } from "antd";

const initialState = {
  me: {},
  users: [],
  isEditing: false,
  editingUser: {},
  editingIndex: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ME:
      return { ...state, me: action.me };
    case UPDATE_USER_ME_SUCCESS:
      message.success("Update profile successful");
      return { ...state, me: action.me };
    case UPDATE_USER_ME_FAILURE:
      message.error(action.error);
      return state;
    case UPDATE_USER_ME_PASSWORD_SUCCESS:
      message.success("Update password successful");
      return state;
    case UPDATE_USER_ME_PASSWORD_FAILURE:
      message.error(action.error);
      return state;
    case GET_ALL_USERS:
      return { ...state, users: action.users };
    case ADD_USER_SUCCESS:
      message.success("Add user successful");
      return {
        ...state,
        users: [...state.users, action.user]
      };
    case ADD_USER_FAILURE:
      message.error(action.error);
      return state;
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: [
          ...state.users.slice(0, action.tableIdx),
          ...state.users.slice(action.tableIdx + 1)
        ]
      };
    case DELETE_USER_FAILURE:
      message.error(action.error);
      return {
        ...state
      };
    case OPEN_USER_EDIT_FORM:
      return {
        ...state,
        isEditing: true,
        editingUser: action.editingUser,
        editingIndex: action.editingIndex
      };
    case CLOSE_USER_EDIT_FORM:
      return {
        ...state,
        isEditing: false
      };
    case UPDATE_USER_SUCCESS:
      message.success("Edit user successful");
      return {
        ...state,
        users: [
          ...state.users.slice(0, state.editingIndex),
          action.user,
          ...state.users.slice(state.editingIndex + 1)
        ]
      };
    case UPDATE_USER_FAILURE:
      message.error(action.error);
      return state;
    default:
      return state;
  }
}
