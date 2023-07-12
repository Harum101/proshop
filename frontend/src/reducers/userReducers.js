import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants.js";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }; // When the request is being made loading is true
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }; // When the request succeeds, payload(products data) is passed
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }; // If there is any error we pass error instead of products in the payload
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
