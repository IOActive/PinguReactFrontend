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
    RETRIEVE_FUZZER_STATS,
    FUZZER_STATS_REQUEST,
    FUZZER_STATS_FAILURE,
  } from "actions/types";
  
  const initialState = [];
  
  function FuzzerStatsReducer(fuzzer_stats = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case FUZZER_STATS_REQUEST:
        return {
          isFetching: true,
        };
  
      case RETRIEVE_FUZZER_STATS:
        return {
          isFetching: false,
          payload,
        };
  
      case FUZZER_STATS_FAILURE:
        return {
          isFetching: false,
          errorMessage: payload.message,
        };
      default:
        return fuzzer_stats;
    }
  }
  
  export default FuzzerStatsReducer;
  