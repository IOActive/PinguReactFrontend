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

import CrashDataService from "services/crash_service";
import {action_request, action_recieved, action_error} from "./action"
import {
    RETRIEVE_CRASHES,
    CRASH_REQUEST,
    CRASH_FAILURE,

} from "./types";

export const retrieveCrashes = (page_number) => async (dispatch) => {
    try {
        dispatch(action_request(CRASH_REQUEST, page_number));
        const response = await CrashDataService.getPage(page_number);
        dispatch(action_recieved(RETRIEVE_CRASHES, response.data));
        return Promise.resolve(response.data);
    } catch (error) {
        const message = error.response.data;        
        dispatch(action_error(CRASH_FAILURE, message));
        return Promise.reject(error);
    }
};

export const retrieveTestCaseCrashes = (page_number, testcase_id) => async (dispatch) => {
    try {
        dispatch(action_request(CRASH_REQUEST, page_number));
        const response = await CrashDataService.getPageByTestCaseID(testcase_id, page_number);
        dispatch(action_recieved(RETRIEVE_CRASHES, response.data));
        return Promise.resolve(response.data);
    } catch (error) {
        const message = error.response.data;        
        dispatch(action_error(CRASH_FAILURE, message));
        return Promise.reject(error);
    }
};

export const retrieveCrashByID = (id) => (dispatch) => {
    dispatch(action_request(CRASH_REQUEST, id));
    return CrashDataService.findByID(id).then(
      (response) => {
        dispatch(action_recieved(RETRIEVE_CRASHES, response.data));
        return Promise.resolve(response.data);
      },
      (error) => {
        const message = error.response.data; 
        dispatch(action_error(CRASH_FAILURE, message));
  
        return Promise.reject();
      }
    );
  } 