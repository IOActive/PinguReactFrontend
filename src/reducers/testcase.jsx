import {
    RETRIEVE_TESTCASES,
    TESTCASE_REQUEST,
    TESTCASE_FAILURE,
  } from "../actions/types";
  
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
          errorMessage: payload,
        };
      default:
        return testcases;
    }
  }
  
  export default TestCaseReducer;
  