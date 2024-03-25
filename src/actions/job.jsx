
import JobDataService from "../services/job_service";

import {
  CREATE_JOB,
  RETRIEVE_JOBS,
  UPDATE_JOB,
  DELETE_JOB,
  JOB_REQUEST,
  JOB_FAILURE
} from "./types";

function jobRequest(payload) {
  return {
    type: JOB_REQUEST,
    isFetching: true,
    payload,
  };
}

export function jobRecieved(type, data) {
  return {
    type: type,
    isFetching: false,
    payload: data
  };
}

function jobError(message) {
  return {
    type: JOB_FAILURE,
    isFetching: false,
    payload: message,
  };
}

export const createJob = (payload) => (dispatch) => {
    dispatch(jobRequest(payload));
    return JobDataService.create(payload).then(
      (response) => {
        dispatch(jobRecieved(CREATE_JOB,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch(jobError(message));
 
        return Promise.reject();
      }
    );
  };

export const retrieveJobs = (page_number) => async (dispatch) => {
  try {
    dispatch(jobRequest(page_number));
    const response = await JobDataService.getPage(page_number);

    dispatch(jobRecieved(RETRIEVE_JOBS, response.data));
    return Promise.resolve(response.data);
  } catch (err) {
    const message = err.response.data.message || err.message || err.toString();
    dispatch(jobError(message));
    return Promise.reject(err);
  }
};

export const getJob = (id) => (dispatch) => {
  dispatch(jobRequest(id));
  return JobDataService.findByID(id).then(
    (response) => {
      dispatch(jobRecieved(RETRIEVE_JOBS, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(jobError(message));

      return Promise.reject();
    }
  );
}

export const updateJob = (id, data) => (dispatch) => {
  dispatch(jobRequest(data));
  return JobDataService.update(id, data).then(
    (response) => {
      dispatch(jobRecieved(UPDATE_JOB, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(jobError(message));
      return Promise.reject();
    }
  );
}

export const deleteJob = (id) => (dispatch) => {
  dispatch(jobRequest(id));
  return JobDataService.delete(id).then(
    (response) => {
      dispatch(jobRecieved(DELETE_JOB, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(jobError(message));
      return Promise.reject();
    }
  );
}

export const findJobsByName = (name) => (dispatch) => {
  dispatch(jobRequest(name));
  return JobDataService.findByName(name).then(
    (response) => {
      dispatch(jobRecieved(RETRIEVE_JOBS, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(jobError(message));

      return Promise.reject();
    }
  );
}