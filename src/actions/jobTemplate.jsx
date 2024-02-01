
import JobTemplateDataService from "../services/jobTemplate_service";

import {
  CREATE_JOBTEMPLATE,
  RETRIEVE_JOBTEMPLATES,
  UPDATE_JOBTEMPLATE,
  DELETE_JOBTEMPLATE,
  JOBTEMPLATE_REQUEST,
  JOBTEMPLATE_FAILURE
} from "./types";

function jobTemplateRequest(payload) {
  return {
    type: JOBTEMPLATE_REQUEST,
    isFetching: true,
    payload,
  };
}

export function jobTemplateRecieved(type, data) {
  return {
    type: type,
    isFetching: false,
    payload: data
  };
}

function jobTemplateError(message) {
  return {
    type: JOBTEMPLATE_FAILURE,
    isFetching: false,
    payload: message,
  };
}

export const createJobTemplate = (payload) => (dispatch) => {
    dispatch(jobTemplateRequest(payload));
    return JobTemplateDataService.create(payload).then(
      (response) => {
        dispatch(jobTemplateRecieved(CREATE_JOBTEMPLATE,response.data));
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch(jobTemplateError(message));
 
        return Promise.reject();
      }
    );
  };

export const retrieveJobTemplates = (page_number) => async (dispatch) => {
  try {
    dispatch(jobTemplateRequest(page_number));
    const response = await JobTemplateDataService.getPage(page_number);

    dispatch(jobTemplateRecieved(RETRIEVE_JOBTEMPLATES, response.data));
    return Promise.resolve(response.data);
  } catch (err) {
    const message = err.response.data.message || err.message || err.toString();
    dispatch(jobTemplateError(message));
    return Promise.reject(err);
  }
};

export const getJobTemplate = (id) => (dispatch) => {
  dispatch(jobTemplateRequest(id));
  return JobTemplateDataService.findByID(id).then(
    (response) => {
      dispatch(jobTemplateRecieved(RETRIEVE_JOBTEMPLATES, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(jobTemplateError(message));

      return Promise.reject();
    }
  );
}

export const updateJobTemplate = (id, data) => (dispatch) => {
  dispatch(jobTemplateRequest(data));
  return JobTemplateDataService.update(id, data).then(
    (response) => {
      dispatch(jobTemplateRecieved(UPDATE_JOBTEMPLATE, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(jobTemplateError(message));
      return Promise.reject();
    }
  );
}

export const deleteJobTemplate = (id) => (dispatch) => {
  dispatch(jobTemplateRequest(id));
  return JobTemplateDataService.delete(id).then(
    (response) => {
      dispatch(jobTemplateRecieved(DELETE_JOBTEMPLATE, response.data));
      return Promise.resolve(response.data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(jobTemplateError(message));
      return Promise.reject();
    }
  );
}
