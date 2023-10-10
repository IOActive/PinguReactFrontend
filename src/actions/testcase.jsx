
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