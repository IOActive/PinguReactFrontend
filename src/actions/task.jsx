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


import TaskDataService from "services/task_service";
import {action_request, action_recieved, action_error} from "./action"
import {
  CREATE_TASK,
  TASK_REQUEST,
  TASK_FAILURE,
  READ_TASKS,
  READ_ALL_TASKS,
} from "./types";

export const createTask = (payload) => (dispatch) => {
    dispatch(action_request(TASK_REQUEST, payload));
    return TaskDataService.create(payload).then(
      (response) => {
        dispatch(action_recieved(CREATE_TASK,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data; 
  
        dispatch(action_error(TASK_FAILURE, message));
 
        return Promise.reject();
      }
    );
  };


  export const readAllTasks = () => (dispatch) => {
    dispatch(action_request(TASK_REQUEST));
    return TaskDataService.readAllQueue().then(
      (response) => {
        dispatch(action_recieved(READ_ALL_TASKS,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data.message || error.response.data.msg;
  
        dispatch(action_error(TASK_FAILURE, message));
       }
    );
  };

  export const retrieveTaskByID = (id) => (dispatch) => {
    dispatch(action_request(TASK_REQUEST, id));
    return TaskDataService.findByID(id).then(
      (response) => {
        dispatch(action_recieved(READ_TASKS, response.data));
        return Promise.resolve(response.data);
      },
      (error) => {
        const message = error.response.data.message || error.response.data.msg; 
  
        dispatch(action_error(TASK_FAILURE, message));
  
        return Promise.reject();
      }
    );
  }

  export const retrieveTasks = (page_number) => (dispatch) => {
    dispatch(action_request(TASK_REQUEST));
    return TaskDataService.retrieveTasks(page_number).then(
      (response) => {
        dispatch(action_recieved(READ_ALL_TASKS,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data; 
  
        dispatch(action_error(TASK_FAILURE, message));
 
        return Promise.reject();
      }
    );
  }

  export const retrieveTasksByJobId = (page_number, job_id) => (dispatch) => {
    dispatch(action_request(TASK_REQUEST));
    return TaskDataService.retrieveTasksByJobId (page_number, job_id).then(
      (response) => {
        dispatch(action_recieved(READ_ALL_TASKS,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message = error.response.data; 
  
        dispatch(action_error(TASK_FAILURE, message));
 
        return Promise.reject();
      }
    );
  }