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


import CustomBinaryDataService from "../services/custon_binary_service";

import {
  CREATE_CUSTOM_BINARY,
  CUSTOM_BINARY_REQUEST,
  CUSTOM_BINARY_FAILURE,
} from "./types";

function custom_binaryRequest(payload) {
  return {
    type: CUSTOM_BINARY_REQUEST,
    isFetching: true,
    payload,
  };
}

export function custom_binaryRecieved(type, data) {
  return {
    type: type,
    isFetching: false,
    payload: data
  };
}

function custom_binaryError(message) {
  return {
    type: CUSTOM_BINARY_FAILURE,
    isFetching: false,
    payload: message,
  };
}

export const upload_custom_binary = (payload) => (dispatch) => {
    dispatch(custom_binaryRequest(payload));
    return CustomBinaryDataService.create(payload).then(
      (response) => {
        dispatch(custom_binaryRecieved(CREATE_CUSTOM_BINARY,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data.message || error.response.data.msg | error.toString(); 
  
        dispatch(custom_binaryError(message));
 
        return Promise.reject();
      }
    );
  };