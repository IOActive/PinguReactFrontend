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


import TaskDataService from "../services/task_service";

import {
  CREATE_TASK,
  TASK_REQUEST,
  TASK_FAILURE,
  READ_TASKS,
  READ_ALL_TASKS,
} from "./types";

function taskRequest(payload) {
  return {
    type: TASK_REQUEST,
    isFetching: true,
    payload,
  };
}

export function taskRecieved(type, data) {
  return {
    type: type,
    isFetching: false,
    payload: data
  };
}

function taskError(message) {
  return {
    type: TASK_FAILURE,
    isFetching: false,
    payload: message,
  };
}

export const createTask = (payload) => (dispatch) => {
    dispatch(taskRequest(payload));
    return TaskDataService.create(payload).then(
      (response) => {
        dispatch(taskRecieved(CREATE_TASK,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch(taskError(message));
 
        return Promise.reject();
      }
    );
  };


  export const readAllTasks = () => (dispatch) => {
    dispatch(taskRequest());
    return TaskDataService.readAll().then(
      (response) => {
        dispatch(taskRecieved(READ_ALL_TASKS,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch(taskError(message));
 
        return Promise.reject();
      }
    );
  };