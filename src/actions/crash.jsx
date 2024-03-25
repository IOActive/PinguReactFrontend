import CrashDataService from "../services/crash_service";

import {
    RETRIEVE_CRASHES,
    CRASH_REQUEST,
    CRASH_FAILURE,

} from "./types";

function crashRequest(payload) {
    return {
        type: CRASH_REQUEST,
        isFetching: true,
        payload,
    };
}

function crashRecieved(type, data) {
    return {
        type: type,
        isFetching: false,
        payload: data
    };
}

function crashError(message) {
    return {
        type: CRASH_FAILURE,
        isFetching: false,
        payload: message,
    };
}

export const retrieveCrashes = (page_number) => async (dispatch) => {
    try {
        dispatch(crashRequest(page_number));
        const response = await CrashDataService.getPage(page_number);
        dispatch(crashRecieved(RETRIEVE_CRASHES, response.data));
        return Promise.resolve(response.data);
    } catch (err) {
        const message = err.response.data.message || err.message || err.toString();
        dispatch(crashError(message));
        return Promise.reject(err);
    }
};

export const retrieveTestCaseCrashes = (page_number, testcase_id) => async (dispatch) => {
    try {
        dispatch(crashRequest(page_number));
        const response = await CrashDataService.getPageByTestCaseID(testcase_id, page_number);
        dispatch(crashRecieved(RETRIEVE_CRASHES, response.data));
        return Promise.resolve(response.data);
    } catch (err) {
        const message = err.response.data.message || err.message || err.toString();
        dispatch(crashError(message));
        return Promise.reject(err);
    }
};

export const retrieveCrashByID = (id) => (dispatch) => {
    dispatch(crashRequest(id));
    return CrashDataService.findByID(id).then(
      (response) => {
        dispatch(crashRecieved(RETRIEVE_CRASHES, response.data));
        return Promise.resolve(response.data);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch(crashError(message));
  
        return Promise.reject();
      }
    );
  }