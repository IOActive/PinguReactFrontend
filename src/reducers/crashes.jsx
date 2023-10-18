import {
    RETRIEVE_CRASHES,
    CRASH_REQUEST,
    CRASH_FAILURE,
  } from "../actions/types";
  
  const initialState = [];
  
  function CrashReducer(crashes = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CRASH_REQUEST:
        return {
          isFetching: true,
        };
  
      case RETRIEVE_CRASHES:
        return {
          isFetching: false,
          payload,
        };
  
      case CRASH_FAILURE:
        return {
          isFetching: false,
          errorMessage: payload,
        };
      default:
        return crashes;
    }
  }
  
  export default CrashReducer;
  