
import FuzzerDataService from "../services/fuzzer_service";

import {
  CREATE_FUZZER,
  RETRIEVE_FUZZERS,
  UPDATE_FUZZER,
  DELETE_FUZZER,
  FUZZER_REQUEST,
  FUZZER_FAILURE
} from "./types";

function fuzzerRequest(payload) {
  return {
    type: FUZZER_REQUEST,
    isFetching: true,
    payload,
  };
}

export function fuzzerRecieved(type, data) {
  return {
    type: type,
    isFetching: false,
    payload: data
  };
}

function fuzzerError(message) {
  return {
    type: FUZZER_FAILURE,
    isFetching: false,
    payload: message,
  };
}

export const createFuzzer = (payload) => (dispatch) => {
  dispatch(fuzzerRequest(payload));
  return FuzzerDataService.create(payload).then(
    (response) => {
      dispatch(fuzzerRecieved(CREATE_FUZZER, response.data));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fuzzerError(message));

      return Promise.reject();
    }
  );
};


export const retrieveFuzzers = (page_number) => async (dispatch) => {
  try {
    const response = await FuzzerDataService.getPage(page_number);

    dispatch(fuzzerRecieved(RETRIEVE_FUZZERS, response.data));
    return Promise.resolve(response.data);
  } catch (err) {
    const message = err.response.data.message || err.message || err.toString();
    dispatch(fuzzerError(message));
    return Promise.reject(err);
  }
};

export const getFuzzer = (id) => (dispatch) => {
  dispatch(fuzzerRequest(id));
  return FuzzerDataService.findByID(id).then(
    (response) => {
      dispatch(fuzzerRecieved(RETRIEVE_FUZZERS, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fuzzerError(message));

      return Promise.reject();
    }
  );
}

export const updateFuzzer = (id, data) => (dispatch) => {
  dispatch(fuzzerRequest(data));
  return FuzzerDataService.update(id, data).then(
    (response) => {
      dispatch(fuzzerRecieved(UPDATE_FUZZER, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fuzzerError(message));
      return Promise.reject();
    }
  );
}

export const deleteFuzzer = (id) => (dispatch) => {
  dispatch(fuzzerRequest(id));
  return FuzzerDataService.delete(id).then(
    (response) => {
      dispatch(fuzzerRecieved(DELETE_FUZZER, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fuzzerError(message));
      return Promise.reject();
    }
  );
}

export const findFuzzersByName = (name) => (dispatch) => {
  dispatch(fuzzerRequest(name));
  return FuzzerDataService.findByName(name).then(
    (response) => {
      dispatch(fuzzerRecieved(RETRIEVE_FUZZERS, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fuzzerError(message));

      return Promise.reject();
    }
  );
}