
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