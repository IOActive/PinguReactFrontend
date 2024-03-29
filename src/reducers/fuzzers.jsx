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
    CREATE_FUZZER,
    RETRIEVE_FUZZERS,
    UPDATE_FUZZER,
    DELETE_FUZZER,
    FUZZER_REQUEST,
    FUZZER_FAILURE,
  } from "../actions/types";
  
  const initialState = [];
  
  function fuzzerReducer(fuzzers = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case FUZZER_REQUEST:
        return {
          isFetching: true,
        };
  
      case CREATE_FUZZER:
        return {
          isFetching: true,
          payload,
        };
  
      case RETRIEVE_FUZZERS:
        return {
          isFetching: false,
          payload,
        };
  
      case UPDATE_FUZZER:
        if (fuzzers.payload) {
          return fuzzers.map((fuzzer) => {
            if (fuzzer.id === payload.id) {
              return {
                ...fuzzer,
                ...payload,
              };
            } else {
              return fuzzer;
            }
          });
        }
        else {
          return fuzzers;
        }
  
      //case DELETE_FUZZER:
  
      case FUZZER_FAILURE:
        return {
          isFetching: false,
          errorMessage: payload,
        };
      default:
        return fuzzers;
    }
  }
  
  export default fuzzerReducer;
  