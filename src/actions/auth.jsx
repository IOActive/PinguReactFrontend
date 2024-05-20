/* Copyright 2024 IOActive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

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
      payload: message,
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
        const message = error.response.data.detail;
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
        const message = error.response.data.detail;        dispatch(RegistrationError(message));
        return Promise.reject();
      }
    );
  };
  

  

  export function requestLogout() {
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

  export function refreshToken(token) {
    return dispatch => {
      dispatch(requestLogin(token));
      AuthService.refreshToken(token)
      .then(
        (data) => {
          dispatch(receiveLogin(data));
          return Promise.resolve();
        },
        (error) => {          
          dispatch(loginError(error.response.detail));
          return Promise.reject();
        }
      );
    }
  }