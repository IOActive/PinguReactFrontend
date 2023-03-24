import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAILURE,
    SET_MESSAGE,
  } from "./types";
  
  import AuthService from "../services/auth.service";
  

  function requestLogin(creds) {
    return {
      type: LOGIN_REQUEST,
      isFetching: true,
      isAuthenticated: false,
      creds,
    };
  }

  export function receiveLogin(data) {
    return {
      type: LOGIN_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      id_token: data.access,
      user: data.user
    };
  }

  function loginError(message) {
    return {
      type: LOGIN_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      message,
    };
  }

  export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds));
    return AuthService.login(creds)
    .then(
      (data) => {
        dispatch(receiveLogin(data));
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        
        dispatch(loginError(message));

        return Promise.reject();
      }
    );
  };

  
  function requestRegistration(data) {
    return {
      type: REGISTER_REQUEST,
      isFetching: true,
      data,
    };
  }

  export function receiveRegistration(data) {
    return {
      type: REGISTER_SUCCESS,
      isFetching: false,
      id_token: data.access,
    };
  }

  function RegistrationError(message) {
    return {
      type: REGISTER_FAILURE,
      isFetching: false,
      message,
    };
  }

  export const register = (data) => (dispatch) => {
    dispatch(requestRegistration(data));
    return AuthService.register(data).then(
      (response) => {
        dispatch(receiveRegistration(response));
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch(RegistrationError(message));
        return Promise.reject();
      }
    );
  };
  

  

  function requestLogout() {
    return {
      type: LOGOUT_REQUEST,
      isFetching: true,
      isAuthenticated: true,
    };
  }

  export function receiveLogout() {
    return {
      type: LOGOUT_SUCCESS,
      isFetching: false,
      isAuthenticated: false,
    };
  }

  export function logoutUser() {
    return dispatch => {
      dispatch(requestLogout());
      AuthService.logout();
      dispatch(receiveLogout());
    };
  }