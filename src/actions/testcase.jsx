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


import TestCaseDataService from "services/testcase_service";
import {action_request, action_recieved, action_error} from "./action"
import {
    RETRIEVE_TESTCASES,
    TESTCASE_REQUEST,
    TESTCASE_FAILURE,
    CREATE_TESTCASE,
} from "./types";

export const retrieveTestCases = (page_number) => async (dispatch) => {
    try {
        dispatch(action_request(TESTCASE_REQUEST, page_number));
        const response = await TestCaseDataService.getPage(page_number);
        dispatch(action_recieved(RETRIEVE_TESTCASES, response.data));
        return Promise.resolve(response.data);
    } catch (error) {
      const message = error.response.data;         
      dispatch(action_error(TESTCASE_FAILURE, message));
      return Promise.reject(error);
    }
};

export const retrieveJobTestCases = (page_number, job_id) => async (dispatch) => {
    try {
        dispatch(action_request(TESTCASE_REQUEST, page_number));
        const response = await TestCaseDataService.getPageByJobID(job_id, page_number);
        dispatch(action_recieved(RETRIEVE_TESTCASES, response.data));
        return Promise.resolve(response.data);
    } catch (error) {
      const message = error.response.data;         
      dispatch(action_error(TESTCASE_FAILURE, message));
      return Promise.reject(error);
    }
};

export const retrieveTestCaseByID = (id) => (dispatch) => {
    dispatch(action_request(TESTCASE_REQUEST,id));
    return TestCaseDataService.findByID(id).then(
      (response) => {
        dispatch(action_recieved(RETRIEVE_TESTCASES, response.data));
        return Promise.resolve(response.data);
      },
      (error) => {
        const message = error.response.data; 
  
        dispatch(action_error(TESTCASE_FAILURE, message));
  
        return Promise.reject();
      }
    );
  }
  
  export const createTestcase = (payload) => (dispatch) => {
    dispatch(action_request(TESTCASE_REQUEST, payload));
    return TestCaseDataService.create(payload).then(
      (response) => {
        dispatch(action_recieved(CREATE_TESTCASE, response.data));
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data; 
  
        dispatch(action_error(TESTCASE_FAILURE, message));
  
        return Promise.reject();
      }
    );
  };
  