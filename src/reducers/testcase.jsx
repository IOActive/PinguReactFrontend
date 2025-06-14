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
    RETRIEVE_TESTCASES,
    TESTCASE_REQUEST,
    TESTCASE_FAILURE,
  } from "actions/types";
  
  const initialState = [];
  
  function TestCaseReducer(testcases = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case TESTCASE_REQUEST:
        return {
          isFetching: true,
        };
  
      case RETRIEVE_TESTCASES:
        return {
          isFetching: false,
          payload,
        };
  
      case TESTCASE_FAILURE:
        return {
          isFetching: false,
          errorMessage: payload.message,
        };
      default:
        return testcases;
    }
  }
  
  export default TestCaseReducer;
  