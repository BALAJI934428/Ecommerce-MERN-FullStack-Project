import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    user: {},
    users: [],
    isUserUpdated: false,
    isUserDeleted: false,
  },
  reducers: {
    usersRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    usersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };
    },
    usersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    userRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    userSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    },
    userFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    deleteUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isUserDeleted: true,
      };
    },
    deleteUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateUserSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isUserUpdated: true,
      };
    },
    updateUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearUserDeleted(state, action) {
      return {
        ...state,
        isUserDeleted: false,
      };
    },
    clearUserUpdated(state, action) {
      return {
        ...state,
        isUserUpdated: false,
      };
    },
  },
});

const { actions, reducer } = usersSlice;

export const {
  userRequest,
  userSuccess,
  userFail,
  usersRequest,
  usersSuccess,
  usersFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  clearError,
  clearUserDeleted,
  clearUserUpdated,
} = actions;

export default reducer;
