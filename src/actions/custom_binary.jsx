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


import CustomBinaryDataService from "services/custon_binary_service";
import {action_request, action_recieved, action_error} from "./action"
import {
  CREATE_CUSTOM_BINARY,
  CUSTOM_BINARY_REQUEST,
  CUSTOM_BINARY_FAILURE,
} from "./types";


export const upload_custom_binary = (payload) => (dispatch) => {

    const formData = new FormData();
    formData.append("custom_binary", payload.custom_binary);  // Attach file
    formData.append("job_id", payload.job_id);

    dispatch(action_request(CUSTOM_BINARY_REQUEST, payload));
    return CustomBinaryDataService.create(formData).then(
      (response) => {
        dispatch(action_recieved(CREATE_CUSTOM_BINARY,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data; 
  
        dispatch(action_error(CUSTOM_BINARY_FAILURE, message));
 
        return Promise.reject();
      }
    );
  };