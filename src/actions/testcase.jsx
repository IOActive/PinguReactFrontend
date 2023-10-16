
import TestCaseDataService from "../services/testcase_service";

import {
    RETRIEVE_TESTCASES,
    TESTCASE_REQUEST,
    TESTCASE_FAILURE,

} from "./types";

function testCaseRequest(payload) {
    return {
        type: TESTCASE_REQUEST,
        isFetching: true,
        payload,
    };
}

function testCaseRecieved(type, data) {
    return {
        type: type,
        isFetching: false,
        payload: data
    };
}

function testCaseError(message) {
    return {
        type: TESTCASE_FAILURE,
        isFetching: false,
        payload: message,
    };
}

export const retrieveTestCases = (page_number) => async (dispatch) => {
    try {
        dispatch(testCaseRequest(page_number));
        const response = await TestCaseDataService.getPage(page_number);
        dispatch(testCaseRecieved(RETRIEVE_TESTCASES, response.data));
        return Promise.resolve(response.data);
    } catch (err) {
        const message = err.response.data.message || err.message || err.toString();
        dispatch(testCaseError(message));
        return Promise.reject(err);
    }
};

export const retrieveJobTestCases = (page_number, job_id) => async (dispatch) => {
    try {
        dispatch(testCaseRequest(page_number));
        const response = await TestCaseDataService.getPageByJobID(job_id, page_number);
        dispatch(testCaseRecieved(RETRIEVE_TESTCASES, response.data));
        return Promise.resolve(response.data);
    } catch (err) {
        const message = err.response.data.message || err.message || err.toString();
        dispatch(testCaseError(message));
        return Promise.reject(err);
    }
};

export const retrieveTestCaseByID = (id) => (dispatch) => {
    dispatch(testCaseRequest(id));
    return TestCaseDataService.findByID(id).then(
      (response) => {
        dispatch(testCaseRecieved(RETRIEVE_TESTCASES, response.data));
        return Promise.resolve(response.data);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch(testCaseError(message));
  
        return Promise.reject();
      }
    );
  }