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
  