# Copyright 2024 IOActive
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import {
    CREATE_TASK,
    TASK_REQUEST,
    TASK_FAILURE,
    READ_ALL_TASKS,
  } from "../actions/types";
  
  const initialState = [];
  
  function taskReducer(tasks = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case TASK_REQUEST:
        return {
          isFetching: true,
        };
  
      case CREATE_TASK:
        return {
          isFetching: true,
          payload,
        };
  
      case TASK_FAILURE:
        return {
          isFetching: false,
          errorMessage: payload,
        };

      case READ_ALL_TASKS:
        return {
          isFetching: false,
          payload,
        };
      default:
        return tasks;
    }
  }
  
  export default taskReducer;
  