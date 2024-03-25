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
  